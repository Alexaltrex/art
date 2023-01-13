import {useEffect, useRef, useState} from "react";

export const useScroll = () => {
    const ref = useRef<HTMLDivElement>(null!);
    const [dark, setDark] = useState(true);
    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top < 0.5 * window.innerHeight) {
                    setDark(false);
                } else {
                    setDark(true);
                };
            };
        };
        window.addEventListener("scroll", onScroll, {passive: true});
    }, []);

    return {ref, dark}
}
