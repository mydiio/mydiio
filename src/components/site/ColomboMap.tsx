import { useEffect, useState } from "react";

type ColomboMapComponent = typeof import("./ColomboMap.client").ColomboMap;

export function ColomboMap() {
  const [ClientColomboMap, setClientColomboMap] = useState<ColomboMapComponent | null>(null);

  useEffect(() => {
    let mounted = true;
    import("./ColomboMap.client").then((module) => {
      if (mounted) setClientColomboMap(() => module.ColomboMap);
    });
    return () => { mounted = false; };
  }, []);

  if (!ClientColomboMap) {
    return <div style={{ minHeight: 560 }} aria-hidden="true" />;
  }

  return <ClientColomboMap />;
}

export default ColomboMap;
