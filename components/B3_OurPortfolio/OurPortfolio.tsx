import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper"
import style from "./OurPortfolio.module.scss"
import {portfolios} from "./portfolios";
import clsx from "clsx";

export const OurPortfolio = () => {
    return (
        <div className={style.ourPortfolio}>
            <div className={style.inner}>
                <TitleWrapper step="03" label="Our Portfolio" black={false}/>
                <p className={style.title} data-aos="fade-up">
                    More than <span>50+ completed</span> projects
                </p>

                <div className={style.items}>

                    <div className={style.itemsMobile}>
                        {
                            [...portfolios]
                                .slice(0, 6)
                                .map(({year, name}, key) => (
                                    <a key={key}
                                       className={style.item}
                                       href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                       target="_blank"
                                       rel="noopener nofollow noreferrer"
                                    >
                                        <img src="/png/ourPortfolio_0.png" alt=""/>
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
                                    <a className={style.bigItem}
                                       href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                       target="_blank"
                                       rel="noopener nofollow noreferrer"
                                    >
                                        <img src="/png/ourPortfolio_1.png" alt=""/>
                                        <div className={style.info}>
                                            <p>{name}</p>
                                            <p>{year}</p>
                                        </div>
                                    </a>

                                    <div className={style.square}>
                                        {
                                            square.map(({year, name}, key) => (
                                                <a className={style.smallItem}
                                                     key={key}
                                                     href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                                                     target="_blank"
                                                     rel="noopener nofollow noreferrer"
                                                >
                                                    <img src="/png/ourPortfolio_0.png" alt=""/>
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
