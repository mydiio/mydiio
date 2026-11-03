// Executes the actual Edge Function handlers with stubbed storage/email; no external submissions.
const fs = require("node:fs"),
  vm = require("node:vm"),
  assert = require("node:assert/strict"),
  ts = require("typescript");
const base = "backend-update/supabase/functions/";
function loadHandler(name) {
  let handler,
    rows = [],
    emails = [];
  const ctx = {
    Response,
    Request,
    console,
    Date,
    Deno: { env: { get: () => "test" } },
    serve: (f) => (handler = f),
    checkRateLimit: async () => ({ allowed: true }),
    getClientIp: () => "test",
    rateLimitResponse: () => new Response("", { status: 429 }),
    sendAcknowledgement: async (x) => emails.push(x),
    createClient: () => ({
      from: (table) => ({
        insert: (row) => {
          rows.push({ table, row });
          return {
            then: (resolve) => resolve({ error: null }),
            select: () => ({ single: async () => ({ data: { id: "test-id" }, error: null }) }),
          };
        },
      }),
    }),
  };
  vm.createContext(ctx);
  let helper = fs.readFileSync(base + "_shared/publicIntake.ts", "utf8").replaceAll("export ", "");
  let code = fs.readFileSync(base + name + "/index.ts", "utf8").replace(/^import\s[\s\S]*?;\r?\n/gm, "");
  vm.runInContext(
    ts.transpileModule(helper + "\n" + code, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
    }).outputText,
    ctx,
  );
  return {
    rows,
    emails,
    send: async (body) =>
      handler(
        new Request("https://example.test", {
          method: "POST",
          body: typeof body === "string" ? body : JSON.stringify(body),
        }),
      ),
  };
}
(async () => {
  const h = loadHandler("submit-application");
  const ad = {
    application_type: "advertiser",
    business_name: "Example",
    contact_name: "Tester",
    elapsed_ms: 2000,
    attribution: { utm_source: "test", unknown: "ignore" },
  };
  assert.equal((await h.send({ ...ad, email: "test@example.com" })).status, 201);
  assert.equal(h.rows.at(-1).row.phone, null);
  assert.equal(h.emails.length, 1);
  assert.equal((await h.send({ ...ad, phone: "+94770000000" })).status, 201);
  assert.equal(h.rows.at(-1).row.email, null);
  assert.equal(h.emails.length, 1);
  assert.match(h.rows.at(-1).row.message, /utm_source: test/);
  assert.ok(!h.rows.at(-1).row.message.includes("unknown"));
  for (const b of [
    { ...ad },
    { ...ad, email: "bad" },
    { ...ad, email: "test@example.com", website_url: "bot" },
    { ...ad, email: "test@example.com", elapsed_ms: 30 },
    "not json",
  ])
    assert.equal((await h.send(b)).status, 400);
  const driver = {
    application_type: "driver",
    intake_version: "2026-10",
    full_name: "Tester",
    phone: "+94770000000",
    manufacture_year: 2000,
    vehicle_registration: "TEST-1",
    vehicle_model: "Sample",
    route_details: "Colombo",
    safety_confirmed: true,
    preferred_language: "ta",
    vehicle_ownership: "owner",
    driving_days: "Monday",
    daily_hours: 8,
  };
  assert.equal((await h.send(driver)).status, 400);
  assert.equal(
    (
      await h.send({
        ...driver,
        condition_history: "Maintained; inspection requested",
        vehicle_age: "1",
      })
    ).status,
    201,
  );
  assert.equal(h.rows.at(-1).row.vehicle_age, String(new Date().getUTCFullYear() - 2000));
  assert.match(h.rows.at(-1).row.message, /OLDER VEHICLE/);
  assert.equal(h.rows.at(-1).row.nic_number, null);
  assert.equal(h.rows.at(-1).row.preferred_language, "ta");
  const c = loadHandler("submit-enquiry");
  const contact = {
    source: "website",
    sender_type: "prospect",
    sender_name: "Tester",
    sender_contact: "+94770000000",
    subject: "Privacy enquiry",
    message: "A question",
    elapsed_ms: 2000,
  };
  assert.equal((await c.send(contact)).status, 200);
  assert.equal(c.emails.length, 0);
  assert.equal((await c.send({ ...contact, sender_contact: "invalid" })).status, 400);
  assert.equal((await c.send({ ...contact, sender_contact: "test@example.com" })).status, 200);
  assert.equal(c.emails.length, 1);
  assert.equal((await c.send("bad json")).status, 400);
  console.log(
    "PASS: actual intake handlers: email/phone-only, acknowledgements, validation, spam guard, attribution, older-vehicle flag, server-calculated age, language and staged identity.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
