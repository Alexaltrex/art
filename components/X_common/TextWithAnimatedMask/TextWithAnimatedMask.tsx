import clsx from "clsx";
import {FC, useEffect, useRef, useState} from "react";
import style from "./TextWithAnimatedMask.module.scss";

interface ITextWithAnimatedMask {
    row: JSX.Element
    showMask: boolean
}

export const TextWithAnimatedMask: FC<ITextWithAnimatedMask> = ({
                                                                    row,
                                                                    showMask
}) => {
    const [hideMask, setHideMask] = useState(false);
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top < 0.5 * window.innerHeight) {
                    setHideMask(true);
                } else {
                    setHideMask(false);
                }
            }

        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);

    return (
        <div ref={ref}
             className={clsx({
                 [style.textWithAnimatedMask]: true,
                 [style.textWithAnimatedMask_showMask]: showMask,
                 [style.textWithAnimatedMask_hideMask]: hideMask,
             })}
        >
            {row}
        </div>
    )
}
