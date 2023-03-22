import style from "./WhatWeWorkWith.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import clsx from "clsx";
import {svgIcons} from "../../assets/svgIcons";
import {useScroll} from "../../hooks/useScroll";
import {row} from "./row";
import {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

const imgs = [
    `/png/stones0.png`,
    `/png/stones1.png`,
    `/png/stones2.png`,
    `/png/stones3.png`,
    `/png/stones4.png`,
    `/png/stones5.png`,
    `/png/stones10.png`,
    `/png/stones6.png`,
    `/png/stones7.png`,
    `/png/stones8.png`,
    `/png/stones9.png`,
];

export const WhatWeWorkWith = observer(() => {
    const {ref, dark} = useScroll();

    const {setDisableScroll} = useStore();

    const refStones = useRef<HTMLDivElement>(null!);
    const [boom, setBoom] = useState(false);

    // useEffect(() => {
    //     if (ref && ref.current) {
    //         ref.current.addEventListener(
    //             "wheel",
    //             (e) => {
    //                 if (inCenter) {
    //                     e.preventDefault();
    //                     console.log("preventDefault")
    //                 }
    //             },
    //             {passive: false}
    //         )
    //     }
    // }, [inCenter])

    useEffect(() => {
        const onScroll = () => {
            if (refStones && refStones.current) {
                const rect = refStones.current.getBoundingClientRect();
                if (
                    rect.top + 0.5 * rect.height < 0.6 * window.innerHeight
                ) {
                    setBoom(true);
                    setDisableScroll(true);
                } else {
                    setBoom(false);
                }
            }
        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);

    return (
        <div className={clsx({
            [style.whatWeWorkWith]: true,
            [style.whatWeWorkWith_dark]: !dark,
        })}
             ref={ref}
        >
            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="03" label="What we work with" black={dark}/>
                    <p className={style.title} data-aos="fade-up">
                        We work with many blockchains
                    </p>
                </div>
            </div>

            <div className={style.center} ref={refStones}>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
                        <img key={index}
                             src={imgs[index]}
                             alt=""
                             className={clsx({
                                 [style.stones]: true,
                                 [style.stones_centered]: boom,
                             },
                             )}
                             style={{
                                 transitionDelay: `${index * 100}ms`
                             }}
                        />
                    ))
                }


                {
                    [1, 2].map(index => (
                        <div className={clsx(
                            style.row,
                            style[`row_${index}`],
                            `rotated-line-${index}`
                        )}
                             key={index}
                        >
                            {
                                row.map((el, key) => (
                                    <div key={key}
                                         className={style.item}
                                    >
                                        <p className={clsx({
                                            [style.text]: true,
                                            [style.text_2n]: (key + 1) % 2 === 0,
                                        })}
                                        >
                                            {el}
                                        </p>
                                        {
                                            (key !== row.length - 1) && (
                                                <div className={style.icon}>
                                                    {svgIcons.greenRombs}
                                                </div>
                                            )
                                        }

                                    </div>

                                ))
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
})
