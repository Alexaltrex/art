import style from "./OtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {useState} from "react";
import clsx from "clsx";
import {buttons, socialIcons, works} from "./constant";
import {svgIcons} from "../../assets/svgIcons";

export const OtherWorks = () => {
    const [selected, setSelected] = useState("All work");

    return (
        <div className={style.otherWorks}>
            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="01" label="Other works"/>

                    <div className={style.buttons}>
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
                        <div key={key}
                             className={style.work}
                        >
                            <div className={style.inner}>
                                <div className={style.left}>
                                    <p className={style.year}>{year}</p>
                                    <p className={style.name}>{name}</p>
                                    <p className={style.label}>{label}</p>
                                </div>

                                {svgIcons.arrow_up_right}
                            </div>

                        </div>
                    ))
                }
            </div>


            <div className={style.bottom}>
                <div className={style.inner}>
                    <button className={style.allWorksBtn}>
                        All work
                    </button>

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