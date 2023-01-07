import { TitleWrapper } from "../X_common/TitleWrapper/TitleWrapper"
import style from "./OurPortfolio.module.scss"
import {portfolios} from "./portfolios";
import clsx from "clsx";

export const OurPortfolio = () => {
    return (
        <div className={style.ourPortfolio}>
            <div className={style.inner}>
                <TitleWrapper step="03" label="Our Portfolio" black={false}/>
                <p className={style.title}>
                    More than <span>50+ completed</span> projects
                </p>

                <div className={style.items}>

                    <div className={style.itemsMobile}>
                        {
                            [...portfolios]
                                .slice(0, 6)
                                .map(({year, name}, key) => (
                                    <div key={key}
                                         className={style.item}
                                    >
                                        <img src="/png/ourPortfolio_0.png" alt=""/>
                                        <div className={style.info}>
                                            <p>{name}</p>
                                            <p>{year}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>

                    <div className={style.itemsDesktop}>
                        {
                            [
                                {
                                    big: portfolios[0],
                                    square: [
                                        portfolios[1],
                                        portfolios[2],
                                        portfolios[3],
                                        portfolios[4],
                                    ]
                                },
                                {
                                    big: portfolios[5],
                                    square: [
                                        portfolios[6],
                                        portfolios[7],
                                        portfolios[8],
                                        portfolios[9],
                                    ]
                                },
                                {
                                    big: portfolios[10],
                                    square: [
                                        portfolios[11],
                                        portfolios[12],
                                        portfolios[13],
                                        portfolios[14],
                                    ]
                                },
                            ].map(({big: {name, year}, square}, key) => (
                                    <div key={key}
                                         className={clsx({
                                             [style.itemWrapper]: true,
                                             [style.itemWrapper_2n]: (key + 1) % 2 === 0,
                                         })}
                                    >
                                        <div className={style.bigItem}>
                                            <img src="/png/ourPortfolio_1.png" alt=""/>
                                            <div className={style.info}>
                                                <p>{name}</p>
                                                <p>{year}</p>
                                            </div>
                                        </div>

                                        <div className={style.square}>
                                            {
                                                square.map(({year, name}, key) => (
                                                    <div className={style.smallItem} key={key}>
                                                        <img src="/png/ourPortfolio_0.png" alt=""/>
                                                        <div className={style.info}>
                                                            <p>{name}</p>
                                                            <p>{year}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>


                                    </div>
                                ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
