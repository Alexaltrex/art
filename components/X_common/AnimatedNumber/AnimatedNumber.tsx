import {FC, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import useIntersectionObserver from '@react-hook/intersection-observer';

interface IAnimatedNumber {
    value: number
    className?: string
    time?: number
}


export const AnimatedNumber: FC<IAnimatedNumber> = ({
                                                        value,
                                                        className,
                                                        time = 250,
                                                    }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { isIntersecting } = useIntersectionObserver(
        ref,
        {
            threshold: 0.5
        }
    );
    const [isIntersected, setIsIntersected] = useState(false);
    useEffect(() => {
        if (isIntersecting) {
            setIsIntersected(true);
        }
    }, [isIntersecting]);

    const delta = time / value
    const [currentValue, setCurrentValue] = useState(1);

    useEffect(() => {
        if (isIntersected && currentValue < value) {
            setTimeout(() => {
                if (currentValue + 2 <= value) {
                    setCurrentValue(currentValue + 2)
                }
                if (currentValue + 2 > value) {
                    setCurrentValue(value)
                }

            }, delta)
        }

    }, [isIntersected, currentValue])

    return (
        <p className={clsx(Boolean(className) && className)}
           ref={ref}
        >
            {currentValue}
        </p>
    )
}
