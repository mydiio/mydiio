import { useEffect, useState } from "react";
import { createClientOnlyFn } from "@tanstack/react-start";

const loadColomboMap = createClientOnlyFn(() => import("./ColomboMap.client"));

export function ColomboMap() {
  const [ClientColomboMap, setClientColomboMap] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    loadColomboMap()?.then((module) => {
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
