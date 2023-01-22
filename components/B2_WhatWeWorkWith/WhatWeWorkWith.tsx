import style from "./WhatWeWorkWith.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import clsx from "clsx";
import {svgIcons} from "../../assets/svgIcons";
import {useScroll} from "../../hooks/useScroll";
import {row} from "./row";
import {useEffect, useRef, useState} from "react";

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

export const WhatWeWorkWith = () => {
    const {ref, dark} = useScroll();

    const refStones = useRef<HTMLDivElement>(null!);
    const [inCenter, setInCenter] = useState(false);
    const [centered, setCentered] = useState(false);
    useEffect(() => {
        if (inCenter) {
            setCentered(true)
        }
    }, [inCenter]);

    const [tik, setTik] = useState(0);

    //console.log(tik)

    useEffect(() => {
        if (centered && tik < 10) {
            setTimeout(() => {
                setTik(tik + 1)
            }, 100)
        }
    }, [centered, tik])


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
                // console.log(rect.top + 0.5 * rect.height);
                // console.log(0.5 * window.innerHeight);
                // console.log("---");
                if (
                    rect.top + 0.5 * rect.height > 0.5 * window.innerHeight - 25 &&
                    rect.top + 0.5 * rect.height < 0.5 * window.innerHeight + 25
                ) {
                    //console.log("in center");
                    setInCenter(true);
                } else {
                    setInCenter(false);
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
                    <TitleWrapper step="02" label="What we work with" black={dark}/>
                    <p className={style.title} data-aos="fade-up">
                        We work with many blockchains
                    </p>
                </div>
            </div>

            <div className={style.center} ref={refStones}>
                {/*<img src="/png/whatWeWorkWith.png" alt="" className={style.ball}/>*/}


                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
                        <img key={index}
                             src={imgs[index]}
                             alt=""
                             className={clsx({
                                 [style.stones0]: true,
                                 [style.stones0_centered]: centered && tik > index,
                             })}
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
}
