import { useEffect, useState } from "react";

type NetworkLiveComponent = typeof import("./NetworkLive.client").NetworkLive;

export function NetworkLive() {
  const [ClientNetworkLive, setClientNetworkLive] = useState<NetworkLiveComponent | null>(null);

  useEffect(() => {
    let mounted = true;
    import("./NetworkLive.client").then((module) => {
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
