import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper"
import style from "./OurPortfolio.module.scss"
import clsx from "clsx";
import {FC} from "react";
import {IPortfolio} from "../../types/portfolio.type";
import {sortOrderedItemByOrder} from "../../helpers/helpers";

interface IOurPortfolio {
    portfolios: IPortfolio[]
}

export const OurPortfolio: FC<IOurPortfolio> = ({
                                                    portfolios
                                                }) => {
    const portfoliosSorted = [...portfolios].sort(sortOrderedItemByOrder);

    return (
        <div className={style.ourPortfolio}>
            <div className={style.inner}>
                <TitleWrapper step="04" label="Our Portfolio" black={false}/>
                <p className={style.title} data-aos="fade-up">
                    More than <span>50+ completed</span> projects
                </p>

                <div className={style.items}>

                    <div className={style.itemsMobile}>
                        {
                            [...portfoliosSorted]
                                .sort(sortOrderedItemByOrder)
                                .slice(0, 6)
                                .map(({year, name, img}, key) => (
                                    <a key={key}
                                       className={style.item}
                                       href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                       target="_blank"
                                       rel="noopener nofollow noreferrer"
                                    >
                                        <img src={img} alt=""/>
                                        <div className={style.info}>
                                            <p>{name}</p>
                                            <p>{year}</p>
                                        </div>
                                    </a>
                                ))
                        }
                    </div>

                    <div className={style.itemsDesktop}>
                        {
                            [
                                {
                                    big: portfoliosSorted[0],
                                    square: [
                                        portfoliosSorted[1],
                                        portfoliosSorted[2],
                                        portfoliosSorted[3],
                                        portfoliosSorted[4],
                                    ]
                                },
                                {
                                    big: portfoliosSorted[5],
                                    square: [
                                        portfoliosSorted[6],
                                        portfoliosSorted[7],
                                        portfoliosSorted[8],
                                        portfoliosSorted[9],
                                    ]
                                },
                                {
                                    big: portfoliosSorted[10],
                                    square: [
                                        portfoliosSorted[11],
                                        portfoliosSorted[12],
                                        portfoliosSorted[13],
                                        portfoliosSorted[14],
                                    ]
                                },
                            ].map(({big: {name, year, img}, square}, key) => (
                                <div key={key}
                                     className={clsx({
                                         [style.itemWrapper]: true,
                                         [style.itemWrapper_2n]: (key + 1) % 2 === 0,
                                     })}
                                >
                                    <a className={style.bigItem}
                                       href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                       target="_blank"
                                       rel="noopener nofollow noreferrer"
                                    >
                                        <img src={img} alt=""/>
                                        <div className={style.info}>
                                            <p>{name}</p>
                                            <p>{year}</p>
                                        </div>
                                    </a>

                                    <div className={style.square}>
                                        {
                                            square.map(({year, name, img}, key) => (
                                                <a className={style.smallItem}
                                                   key={key}
                                                   href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                                   target="_blank"
                                                   rel="noopener nofollow noreferrer"
                                                >
                                                    <img src={img} alt=""/>
                                                    <div className={style.info}>
                                                        <p>{name}</p>
                                                        <p>{year}</p>
                                                    </div>
                                                </a>
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
