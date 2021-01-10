import { useCallback, useEffect, useState } from "react";
import { toEl } from "./useOnClickOutside";

export const useBoundingBox = (ref) => {
    const [boundingBox, setBoundingBox] = useState(null);

    useEffect(() => {
        const el = toEl(ref);

        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setBoundingBox(entry.target.getBoundingClientRect());
            });
        });

        if (el) {
            observer.observe(el);
        }

        return () => el && observer.unobserve(el)
    }, [ref]);

    const recalculate = useCallback(() => {
        const el = toEl(ref);

        setBoundingBox(el.getBoundingClientRect());
    }, [ref]);
  
    return [boundingBox, recalculate];
  };
  