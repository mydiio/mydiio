export const PUBLIC_SITE_MODE: "waitlist" | "full" = import.meta.env.VITE_PREVIEW_FULL_SITE === "true" ? "full" : "waitlist";

export const isPublicWaitlistMode = PUBLIC_SITE_MODE === "waitlist";
