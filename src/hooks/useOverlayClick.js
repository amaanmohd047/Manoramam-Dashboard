import { useEffect, useRef } from "react";

export function useOverlayClick(action, listenCaptureing = true) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    }
    document.addEventListener("click", handleClick, listenCaptureing);
    return () =>
      document.removeEventListener("click", handleClick, listenCaptureing);
  }, [action, listenCaptureing]);

  return ref;
}
