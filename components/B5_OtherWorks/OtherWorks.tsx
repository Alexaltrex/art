import style from "./OtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {FC, useRef, useState} from "react";
import clsx from "clsx";
import {buttons, socialIcons, works} from "./constant";
import {svgIcons} from "../../assets/svgIcons";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {useScroll} from "../../hooks/useScroll";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {IPortfolio} from "../../types/portfolio.type";
import {ICategory} from "../../types/category.type";
import {sortOrderedItemByOrder} from "../../helpers/helpers";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Collapse, Grow} from "@mui/material";

interface IOtherWorks {
    portfolios: IPortfolio[]
    categories: ICategory[]
}

export const OtherWorks: FC<IOtherWorks> = ({
                                                portfolios,
                                                categories,
                                            }) => {
    const otherWorks = [...portfolios].slice(6);
    console.log(otherWorks)

    const [selectedCategoryId, setSelectedCategoryId] = useState(""); // "" === all work

    //const {ref, dark} = useScroll();

    const matchesDesktop = useMediaQuery('(min-width:1400px)');
    const [showMore, setShowMore] = useState(false);
    const worksRef = useRef<HTMLDivElement>(null!);
    const onShowHandler = () => {
        if (showMore) {
            worksRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
        setShowMore(!showMore);
    };

    return (
        <div className={clsx({
            [style.otherWorks]: true,
            [style.otherWorks_dark]: true,
        })}
             ref={worksRef}
        >
            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="06" label="Other works"/>

                    <div className={style.buttons}
                         data-aos="fade-up"
                    >
                        {
                            [
                                {id: "", name: "All works"},
                                ...categories
                            ].map(({id, name}, key) => (
                                <button key={key}
                                        className={clsx({
                                            [style.btn]: true,
                                            [style.btn_selected]: id === selectedCategoryId,
                                        })}
                                        onClick={() => setSelectedCategoryId(id)}

                                >
                                    {name}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={style.works}>
                {
                    [...otherWorks]
                        .sort(sortOrderedItemByOrder)
                        .filter(portfolio => selectedCategoryId === ""
                            ? true
                            : portfolio.category.id === selectedCategoryId)
                        .slice(0, matchesDesktop ? 10 : 7)
                        .map(item => (
                            <WorkItem key={item.id} {...item} />
                        ))
                }

                <Collapse in={showMore}>
                    {
                        [...otherWorks]
                            .sort(sortOrderedItemByOrder)
                            .filter(portfolio => selectedCategoryId === ""
                                ? true
                                : portfolio.category.id === selectedCategoryId)
                            .slice(matchesDesktop ? 10 : 7)
                            .map(item => (
                                <WorkItem key={item.id} {...item} />
                            ))
                    }
                </Collapse>
            </div>

            <div className={style.bottom}>
                <div className={style.inner}>

                    <PrimaryButton label={showMore ? "Show less" : "Show more"}
                                   white={false}
                                   className={style.allWorksBtn}
                                   onClick={onShowHandler}
                    />

                    <div className={style.socialIcons}>
                        {
                            socialIcons.map(({icon, href}, key) => (
                                <a href={href}
                                   key={key}
                                   className={style.socialLink}
                                >
                                    {icon}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

//========= WORK ITEM =========//
const WorkItem: FC<IPortfolio> = ({url, year, name, tag}) => {
    return (
        <AnimatedLink className={style.animatedLink}>
            <a className={style.work}
               href={url}
               target="_blank"
               rel="noopener nofollow noreferrer"
            >
                <div className={style.inner} data-aos="fade-up">
                    <div className={style.left}>
                        <p className={style.year}>{year}</p>
                        <p className={style.name}>{name}</p>
                        <p className={style.label}>{tag}</p>
                    </div>
                    <div className={style.arrowWrapper}>
                        {svgIcons.arrow_up_right}
                    </div>
                </div>
            </a>
        </AnimatedLink>
    )
}
