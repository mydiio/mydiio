import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { name: "description", content: "mydiio puts your ad on a screen inside Colombo tuk-tuks. From LKR 25,000/month with 7 days free. 10 Pioneer spots available. Join the waitlist today." },
      { name: "author", content: "mydiio" },
      { property: "og:title", content: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { property: "og:description", content: "mydiio puts your ad on a screen inside Colombo tuk-tuks. From LKR 25,000/month with 7 days free. 10 Pioneer spots available. Join the waitlist today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { name: "twitter:description", content: "mydiio puts your ad on a screen inside Colombo tuk-tuks. From LKR 25,000/month with 7 days free. 10 Pioneer spots available. Join the waitlist today." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9a28c7aa-be3d-4216-b0c6-2481ea12a19e" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9a28c7aa-be3d-4216-b0c6-2481ea12a19e" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=DM+Serif+Display:ital@0;1&family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=DM+Serif+Display:ital@0;1&family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap",
      },
      { rel: "alternate", hrefLang: "en", href: "https://mydiio.com/?lang=en" },
      { rel: "alternate", hrefLang: "si", href: "https://mydiio.com/?lang=si" },
      { rel: "alternate", hrefLang: "ta", href: "https://mydiio.com/?lang=ta" },
      { rel: "alternate", hrefLang: "x-default", href: "https://mydiio.com/" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const run = () => {
      document.querySelectorAll(".reveal-up:not(.visible), .reveal:not(.in)").forEach((el) => observer.observe(el));
    };
    run();
    const t = setTimeout(run, 100);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
      </I18nProvider>
    </QueryClientProvider>
  );
}
