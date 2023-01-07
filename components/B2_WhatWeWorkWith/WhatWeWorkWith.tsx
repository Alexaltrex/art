import style from "./WhatWeWorkWith.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import clsx from "clsx";
import {svgIcons} from "../../assets/svgIcons";

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
]

export const WhatWeWorkWith = () => {


    return (
        <div className={style.whatWeWorkWith}>

             <div className={style.top}>
                 <div className={style.inner}>
                     <TitleWrapper step="02" label="What we work with" black={false}/>
                     <p className={style.title}>
                         We work with many blockchains
                     </p>
                 </div>
             </div>

            <div className={style.center}>
                <img src="/png/whatWeWorkWith.png" alt="" className={style.ball}/>

                {
                    [1, 2].map(index => (
                        <div className={clsx(style.row, style[`row_${index}`])} key={index}>
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
