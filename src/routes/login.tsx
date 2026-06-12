import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { eagleEyeSupabase } from "@/lib/eagleEyeClient";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — mydiio" },
      { name: "description", content: "Sign in to your mydiio account." },
      { property: "og:url", content: "https://mydiio.com/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/login" }],
  }),

  component: LoginPage,
});

const PORTAL = "https://mydiiocommand.mydiiomedia.workers.dev";

type Tab = "advertiser" | "driver";
type AdvView = "signin" | "signup";

function mapAuthError(msg: string | undefined): string {
  if (!msg) return "Something went wrong. Please try again.";
  if (msg.includes("Invalid login credentials")) return "Email or password is incorrect.";
  if (msg.includes("Email not confirmed")) return "Your account is not yet active. Please wait for approval.";
  return "Something went wrong. Please try again.";
}

function passwordStrength(pw: string): { label: string; color: string } | null {
  if (pw.length < 8) return null;
  let types = 0;
  if (/[a-z]/.test(pw)) types++;
  if (/[A-Z]/.test(pw)) types++;
  if (/[0-9]/.test(pw)) types++;
  if (/[^A-Za-z0-9]/.test(pw)) types++;
  if (types <= 1) return { label: "Weak", color: "#D14343" };
  if (types === 2) return { label: "Fair", color: "#F5A623" };
  return { label: "Strong", color: "#2E8B57" };
}

function redirectToPortal(path: string) {
  if (typeof window !== "undefined") window.location.replace(`${PORTAL}${path}`);
}

function redirectToCallback(accessToken: string, refreshToken: string) {
  if (typeof window !== "undefined") {
    window.location.replace(
      `${PORTAL}/auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}&token_type=bearer`,
    );
  }
}

function LoginPage() {
  const [tab, setTab] = useState<Tab>("advertiser");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await eagleEyeSupabase.auth.getSession();
      const session = data.session;
      if (!session) {
        setChecking(false);
        return;
      }
      const uid = session.user.id;
      const { data: adv } = await eagleEyeSupabase
        .from("advertisers")
        .select("status")
        .eq("user_id", uid)
        .maybeSingle();
      if (adv) {
        if (adv.status === "active") return redirectToPortal("/advertiser-portal");
        if (adv.status === "pending") return redirectToPortal("/pending");
      }
      const { data: drv } = await eagleEyeSupabase
        .from("drivers")
        .select("id")
        .eq("user_id", uid)
        .maybeSingle();
      if (drv) return redirectToPortal("/driver-portal");
      await eagleEyeSupabase.auth.signOut();
      setChecking(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDFAF3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.01em",
              color: "#1A1A18",
            }}
          >
            <span>my</span>
            <span style={{ color: "#F5A623" }}>di</span>
            <span>io</span>
          </span>
        </div>

        {checking ? (
          <div style={{ textAlign: "center", padding: 32, color: "#666" }}>Loading…</div>
        ) : (
          <>
            <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: 24 }}>
              {(["advertiser", "driver"] as Tab[]).map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      padding: "12px 0",
                      fontFamily: "inherit",
                      fontSize: 15,
                      fontWeight: active ? 500 : 400,
                      color: active ? "#1A1A18" : "#888",
                      borderBottom: active ? "2px solid #F5A623" : "2px solid transparent",
                      cursor: "pointer",
                      marginBottom: -1,
                    }}
                  >
                    {t === "advertiser" ? "Advertiser" : "Driver"}
                  </button>
                );
              })}
            </div>

            {tab === "advertiser" ? <AdvertiserPane /> : <DriverPane />}
          </>
        )}
      </div>

      <Link
        to="/"
        style={{
          marginTop: 24,
          fontSize: 14,
          color: "#666",
          textDecoration: "none",
        }}
      >
        ← Back to mydiio.com
      </Link>

      <style>{`
        .login-card {
          width: 100%;
          max-width: 480px;
          background: #fff;
          border: 1px solid rgba(30,26,21,0.08);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        @media (min-width: 600px) {
          .login-card { padding: 40px; }
        }
        .login-field {
          width: 100%;
          padding: 11px 12px;
          font-family: inherit;
          font-size: 15px;
          border: 1px solid rgba(30,26,21,0.18);
          border-radius: 8px;
          background: #fff;
          color: #1A1A18;
          box-sizing: border-box;
        }
        .login-field:focus {
          outline: none;
          border-color: #F5A623;
        }
        .login-label {
          display: block;
          font-size: 13px;
          color: #555;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .login-btn {
          width: 100%;
          height: 44px;
          background: #F5A623;
          color: #1A1A18;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .login-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .login-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(26,26,24,0.3);
          border-top-color: #1A1A18;
          border-radius: 50%;
          animation: login-spin 0.7s linear infinite;
        }
        @keyframes login-spin {
          to { transform: rotate(360deg); }
        }
        .login-error {
          margin-top: 12px;
          padding: 10px 12px;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #991B1B;
          font-size: 14px;
          border-radius: 6px;
        }
        .login-info {
          margin-top: 12px;
          padding: 10px 12px;
          background: #FFFBEB;
          border: 1px solid #FCD34D;
          color: #92400E;
          font-size: 14px;
          border-radius: 6px;
        }
        .login-link-btn {
          background: none;
          border: none;
          color: #1A1A18;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </div>
  );
}

function AdvertiserPane() {
  const [view, setView] = useState<AdvView>("signin");
  return (
    <div>
      {view === "signin" ? (
        <AdvertiserSignIn />
      ) : (
        <AdvertiserSignUp onSwitchToSignIn={() => setView("signin")} />
      )}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        {view === "signin" ? (
          <button
            className="login-link-btn"
            onClick={() => setView("signup")}
            type="button"
          >
            Don't have an account? Create one
          </button>
        ) : (
          <button
            className="login-link-btn"
            onClick={() => setView("signin")}
            type="button"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
    </div>
  );
}

function AdvertiserSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const { data, error: signInErr } = await eagleEyeSupabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInErr) {
      setError(mapAuthError(signInErr.message));
      setLoading(false);
      return;
    }
    const session = data.session;
    if (!session) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    const { data: adv } = await eagleEyeSupabase
      .from("advertisers")
      .select("status")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (!adv) {
      setError("No advertiser account found for this email.");
      await eagleEyeSupabase.auth.signOut();
      setLoading(false);
      return;
    }
    if (adv.status === "active") {
      redirectToCallback(session.access_token, session.refresh_token);
      return;
    }
    setInfo(
      "Your account is not yet active. Please wait for our team to review your application.",
    );
    await eagleEyeSupabase.auth.signOut();
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: 16 }}>
        <label className="login-label" htmlFor="adv-email">Email</label>
        <input
          id="adv-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="login-field"
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label className="login-label" htmlFor="adv-pw">Password</label>
        <input
          id="adv-pw"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="login-field"
        />
      </div>
      <button className="login-btn" type="submit" disabled={loading}>
        {loading && <span className="login-spinner" />}
        Sign in
      </button>
      {error && <div className="login-error">{error}</div>}
      {info && <div className="login-info">{info}</div>}
    </form>
  );
}

const BUSINESS_TYPES = [
  "Retail",
  "Food & Beverage",
  "Healthcare",
  "Finance",
  "Education",
  "Entertainment",
  "Other",
];

function AdvertiserSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignInLink, setShowSignInLink] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = passwordStrength(password);
  const allFilled =
    fullName && businessName && businessType && businessAddress &&
    email && password && confirmPassword;
  const canSubmit = !!allFilled && terms && privacy && !loading;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setShowSignInLink(false);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_EAGLE_EYE_SUPABASE_URL}/functions/v1/advertiser-self-register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_EAGLE_EYE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email,
            password,
            full_name: fullName,
            business_name: businessName,
            business_type: businessType,
            business_address: businessAddress,
            terms_accepted: true,
            privacy_accepted: true,
          }),
        },
      );
      if (res.status === 201) {
        setSuccess(true);
        return;
      }
      if (res.status === 409) {
        setError("An account with this email already exists.");
        setShowSignInLink(true);
      } else if (res.status === 400) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || body.message || "Invalid request.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#F5A623",
            color: "#1A1A18",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A18", margin: "0 0 12px" }}>
          You're on the list.
        </h2>
        <p style={{ color: "#555", fontSize: 15, lineHeight: 1.5, margin: "0 0 24px" }}>
          We'll review your details and activate your account within 24 hours. Keep an eye on your email.
        </p>
        <Link to="/" style={{ color: "#1A1A18", fontSize: 14, textDecoration: "underline", textUnderlineOffset: 3 }}>
          Back to mydiio.com
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Field label="Full name">
        <input type="text" autoComplete="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={loading} className="login-field" />
      </Field>
      <Field label="Business name">
        <input type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} disabled={loading} className="login-field" />
      </Field>
      <Field label="Business type">
        <select required value={businessType} onChange={(e) => setBusinessType(e.target.value)} disabled={loading} className="login-field">
          <option value="">Select…</option>
          {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Business address">
        <input type="text" required value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} disabled={loading} className="login-field" />
      </Field>
      <Field label="Email">
        <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="login-field" />
      </Field>
      <Field label="Password">
        <input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="login-field" />
        {strength && (
          <div style={{ fontSize: 12, marginTop: 6, color: strength.color, fontWeight: 500 }}>
            {strength.label}
          </div>
        )}
      </Field>
      <Field label="Confirm password">
        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} className="login-field" />
      </Field>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, fontSize: 14, color: "#333" }}>
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} disabled={loading} style={{ marginTop: 3 }} />
        <span>
          I agree to the{" "}
          <a href="/terms" target="_blank" rel="noreferrer" style={{ color: "#1A1A18", textDecoration: "underline" }}>Terms and Conditions</a>
        </span>
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20, fontSize: 14, color: "#333" }}>
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} disabled={loading} style={{ marginTop: 3 }} />
        <span>
          I agree to the{" "}
          <a href="/privacy" target="_blank" rel="noreferrer" style={{ color: "#1A1A18", textDecoration: "underline" }}>Privacy Policy</a>
        </span>
      </label>
      <button className="login-btn" type="submit" disabled={!canSubmit}>
        {loading && <span className="login-spinner" />}
        Create account
      </button>
      {error && (
        <div className="login-error">
          {error}
          {showSignInLink && (
            <>
              {" "}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                style={{ color: "#991B1B", background: "none", border: "none", padding: 0, textDecoration: "underline", cursor: "pointer", fontSize: 14 }}
              >
                Sign in instead
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="login-label">{label}</label>
      {children}
    </div>
  );
}

function DriverPane() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: signInErr } = await eagleEyeSupabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInErr) {
      setError(mapAuthError(signInErr.message));
      setLoading(false);
      return;
    }
    const session = data.session;
    if (!session) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    redirectToCallback(session.access_token, session.refresh_token);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label className="login-label" htmlFor="drv-email">Email</label>
          <input
            id="drv-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="login-field"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="login-label" htmlFor="drv-pw">Password</label>
          <input
            id="drv-pw"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="login-field"
          />
        </div>
        <button className="login-btn" type="submit" disabled={loading}>
          {loading && <span className="login-spinner" />}
          Sign in
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
      <p style={{ marginTop: 18, fontSize: 13, color: "#777", lineHeight: 1.5, textAlign: "center" }}>
        Driver accounts are set up by the mydiio team. If you haven't received your login details, contact us at{" "}
        <a href="mailto:mydiiomedia@gmail.com" style={{ color: "#555" }}>mydiiomedia@gmail.com</a>
      </p>
    </div>
  );
}
