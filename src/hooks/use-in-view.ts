import { useCallback, useState } from "react";

export function useInView() {
  const [inView, setInView] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(node);
  }, []);

  return { ref, inView };
}
