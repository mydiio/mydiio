import { useEffect, useState } from "react";
import { createClientOnlyFn } from "@tanstack/react-start";

const loadNetworkLive = createClientOnlyFn(() => import("./NetworkLive.client"));

export function NetworkLive() {
  const [ClientNetworkLive, setClientNetworkLive] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    loadNetworkLive()?.then((module) => {
      if (mounted) setClientNetworkLive(() => module.NetworkLive);
    });
    return () => { mounted = false; };
  }, []);

  if (!ClientNetworkLive) {
    return <section style={{ background: "var(--bg)", minHeight: 720 }} aria-hidden="true" />;
  }

  return <ClientNetworkLive />;
}

export default NetworkLive;
