import style from "./OtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {FC, useLayoutEffect, useRef, useState} from "react";
import clsx from "clsx";
import {socialIcons} from "./constant";
import {svgIcons} from "../../assets/svgIcons";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {IPortfolio} from "../../types/portfolio.type";
import {ICategory} from "../../types/category.type";
import {sortOrderedItemByOrder} from "../../helpers/helpers";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Collapse} from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TweenTarget = gsap.TweenTarget;

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface IOtherWorks {
    portfolios: IPortfolio[]
    categories: ICategory[]
}

export const OtherWorks: FC<IOtherWorks> = ({
                                                portfolios,
                                                categories,
                                            }) => {
    const otherWorks = [...portfolios].slice(6);
    //console.log(otherWorks)

    const [selectedCategoryId, setSelectedCategoryId] = useState(""); // "" === all work

    const matchesDesktop = useMediaQuery('(min-width:1400px)');
    const [showMore, setShowMore] = useState(false);
    const appRef = useRef<HTMLDivElement>(null!);
    const onShowHandler = () => {
        if (showMore) {
            appRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
        setShowMore(!showMore);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".category-buttons",
                    //markers: true,
                    start: "top bottom-=20%",
                    end: "top bottom-=20%",
                    toggleActions: "play none reverse none"
                }
            });

            // @ts-ignore
            const btns = self.selector(".category-button") as TweenTarget[];

            //console.log(btns)

            btns.forEach((btn, index) => {
                tl.fromTo(btn, {
                    opacity: 0,
                    yPercent: 100,
                }, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.3,
                    //ease: "power3.out",
                },  index === 0 ? "<" : "<0.1")
            })

            // gsap.from(".category-button", {
            //     duration: 0.2,
            //     opacity: 0,
            //     yPercent: 100,
            //     //y: 200,
            //     stagger: 0.25,
            //     scrollTrigger: {
            //         trigger: ".category-buttons",
            //         markers: true,
            //         start: "top bottom-=200px",
            //         end: "top bottom-=200px",
            //         toggleActions: "play none reverse none"
            //     }
            // })

        }, appRef);

        return () => ctx.revert();
    }, [])

    return (
        <div className={clsx({
            [style.otherWorks]: true,
            [style.otherWorks_dark]: true,
        })}
             ref={appRef}
        >
            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="06" label="Other works"/>

                    <div className={clsx(style.buttons, "category-buttons")}>
                        {
                            [
                                {id: "", name: "All works"},
                                ...categories
                            ].map((
                                    {id, name},
                                    key
                                ) => (
                                <button key={key}
                                        className={clsx({
                                            "category-button": true,
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
