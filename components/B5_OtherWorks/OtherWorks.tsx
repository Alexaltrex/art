import style from "./OtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {FC, useState} from "react";
import clsx from "clsx";
import {buttons, socialIcons, works} from "./constant";
import {svgIcons} from "../../assets/svgIcons";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {useScroll} from "../../hooks/useScroll";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {IPortfolio} from "../../types/portfolio.type";
import {ICategory} from "../../types/category.type";
import {sortOrderedItemByOrder} from "../../helpers/helpers";

interface IOtherWorks {
    portfolios: IPortfolio[]
    categories: ICategory[]
}

export const OtherWorks: FC<IOtherWorks> = ({
                                                portfolios,
                                                categories,
                                            }) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(""); // "" === all work

    //const {ref, dark} = useScroll();

    return (
        <div className={clsx({
            [style.otherWorks]: true,
            [style.otherWorks_dark]: true,
        })}
             //ref={ref}
        >
            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="01" label="Other works"/>

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
                    [...portfolios]
                        .sort(sortOrderedItemByOrder)
                        .filter(portfolio => selectedCategoryId === ""
                            ? true
                            : portfolio.category.id === selectedCategoryId)
                        .map(({year, name, tag}, key) => (
                        <AnimatedLink key={key} className={style.animatedLink}>
                            <a className={style.work}
                               href="https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse"
                               target="_blank"
                               rel="noopener nofollow noreferrer"
                            >
                                <div className={style.borderTop}
                                     data-aos="zoom-in-left"
                                     data-aos-offset="100"
                                     data-aos-duration="1000"
                                />


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

                    ))
                }
            </div>

            <div className={style.bottom}>
                <div className={style.inner}>

                    <PrimaryButton label="All work"
                                   white={false}
                                   className={style.allWorksBtn}
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
