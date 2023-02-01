import style from "./OtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {useState} from "react";
import clsx from "clsx";
import {buttons, socialIcons, works} from "./constant";
import {svgIcons} from "../../assets/svgIcons";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {useScroll} from "../../hooks/useScroll";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";

export const OtherWorks = () => {
    const [selected, setSelected] = useState("All work");

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
                            buttons.map(({label}, key) => (
                                <button key={key}
                                        className={clsx({
                                            [style.btn]: true,
                                            [style.btn_selected]: label === selected,
                                        })}
                                        onClick={() => setSelected(label)}

                                >
                                    {label}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={style.works}>
                {
                    works.map(({year, name, label}, key) => (
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
                                        <p className={style.label}>{label}</p>
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
