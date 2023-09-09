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
                    {
                        [...portfoliosSorted]
                            .sort(sortOrderedItemByOrder)
                            .slice(0, 6)
                            .map(({id, year, name, img, url}, key) => (
                                <a key={id}
                                   className={style.item}
                                   href={url}
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
        </div>
    )
}
