import {FC, useEffect, useState} from "react";
import * as React from "react";
import style from "./AnimatedLink.module.scss";
import clsx from "clsx";

interface IAnimatedLink {
    children: React.ReactNode
    className?: string
}

export const AnimatedLink:FC<IAnimatedLink> = ({
                                                   children,
                                                   className,
                                               }) => {
    const [hover, setHover] = useState(false);
    const [enter, setEnter] = useState(false);
    const [leave, setLeave] = useState(false);
    const [mouseEvent, setMouseEvent] = useState(false)

    useEffect(() => {
      if (hover) {
          setEnter(true);
          setLeave(false);
      } else {
          setEnter(false);
          setLeave(true);
      }
    }, [hover])

    return (
        <div className={clsx(
            style.animatedLink,
            Boolean(className) && className,
            enter && mouseEvent && "mouseEnter",
            leave && mouseEvent && "mouseLeave"
        )}
             onMouseEnter={() => {
                 setHover(true);
                 setMouseEvent(true);
             }}
             onMouseLeave={() => {
                 setHover(false);
                 setMouseEvent(true);
             }}
        >
            {children}
        </div>
    )
}
