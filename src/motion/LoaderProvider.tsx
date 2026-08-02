// src/motion/LoaderProvider.tsx
// Coordinates the intro loader with the rest of the app.
//
//  - Any component can hold the loader open by registering a "gate" while it
//    loads (a 3D scene, a critical image). The loader lifts once every gate is
//    released, fonts are ready, and a minimum time has passed.
//  - When the loader lifts it broadcasts "revealed", so the hero can start its
//    intro at the exact moment the page is uncovered.
//
// This owns coordination only. The visuals live in Loader.tsx.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type GateListener = (pending: number) => void;
type RevealListener = () => void;

type LoaderContextValue = {
  registerGate: (id: string) => () => void;
  getPending: () => number;
  subscribeGates: (fn: GateListener) => () => void;
  markRevealed: () => void;
  onReveal: (fn: RevealListener) => () => void;
  isRevealed: () => boolean;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const gates = useRef(new Set<string>());
  const gateSubs = useRef(new Set<GateListener>());
  const revealSubs = useRef(new Set<RevealListener>());
  const revealed = useRef(false);

  const notifyGates = useCallback(() => {
    const n = gates.current.size;
    gateSubs.current.forEach((fn) => fn(n));
  }, []);

  const registerGate = useCallback(
    (id: string) => {
      gates.current.add(id);
      notifyGates();
      let released = false;
      return () => {
        if (released) return;
        released = true;
        gates.current.delete(id);
        notifyGates();
      };
    },
    [notifyGates],
  );

  const value = useMemo<LoaderContextValue>(
    () => ({
      registerGate,
      getPending: () => gates.current.size,
      subscribeGates: (fn) => {
        gateSubs.current.add(fn);
        fn(gates.current.size);
        return () => {
          gateSubs.current.delete(fn);
        };
      },
      markRevealed: () => {
        if (revealed.current) return;
        revealed.current = true;
        revealSubs.current.forEach((fn) => fn());
      },
      onReveal: (fn) => {
        if (revealed.current) {
          fn();
          return () => {};
        }
        revealSubs.current.add(fn);
        return () => {
          revealSubs.current.delete(fn);
        };
      },
      isRevealed: () => revealed.current,
    }),
    [registerGate],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

function useLoaderContext(): LoaderContextValue {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("Loader hooks must be used inside <LoaderProvider>");
  return ctx;
}

/**
 * Hold the loader open while `pending` is true. Use it in any component that
 * must finish loading before the site is revealed.
 *
 *   const [loaded, setLoaded] = useState(false);
 *   useLoaderGate("hero-corridor", !loaded);
 */
export function useLoaderGate(id: string, pending: boolean): void {
  const { registerGate } = useLoaderContext();
  useEffect(() => {
    if (!pending) return;
    return registerGate(id);
  }, [id, pending, registerGate]);
}

/** Run a callback the moment the loader lifts (start the hero intro here). */
export function useOnReveal(cb: () => void): void {
  const { onReveal } = useLoaderContext();
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => onReveal(() => ref.current()), [onReveal]);
}

/** Low-level access for the Loader component itself. */
export function useLoaderControls(): LoaderContextValue {
  return useLoaderContext();
}
