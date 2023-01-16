import style from "./WhatWeWorkWith.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import clsx from "clsx";
import {svgIcons} from "../../assets/svgIcons";
import {useScroll} from "../../hooks/useScroll";

const row = [
    "Solana",
    "Solana",
    "Bitcoin",
    "Matic",
    "BNB",
    "Polkadot",
    "Avalanche",
    "Cosmos",
    "Cardano",
    //
    "Solana",
    "Solana",
    "Bitcoin",
    "Matic",
    "BNB",
    "Polkadot",
    "Avalanche",
    "Cosmos",
    "Cardano",
    //
    "Solana",
    "Solana",
    "Bitcoin",
    "Matic",
    "BNB",
    "Polkadot",
    "Avalanche",
    "Cosmos",
    "Cardano",
    //
    "Solana",
    "Solana",
    "Bitcoin",
    "Matic",
    "BNB",
    "Polkadot",
    "Avalanche",
    "Cosmos",
    "Cardano",
]

export const WhatWeWorkWith = () => {
    const {ref, dark} = useScroll();

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

            <div className={style.center}>
                <img src="/png/whatWeWorkWith.png" alt="" className={style.ball}/>

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
