import style from "./OurServices.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import {items} from "./items";
import {useState} from "react";
import {Collapse} from "@mui/material";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {svgIcons} from "../../assets/svgIcons";

export const OurServices = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const matchesDesktop = useMediaQuery('(min-width:1400px)');

    return (
        <div className={style.ourServices}>

            <div className={style.header}>
                <div className={style.inner}>
                    <TitleWrapper step="01" label="OurServices" black={false}/>
                    <p className={style.title} data-aos="fade-up">
                        The <span>services</span> we provide to our customers
                    </p>
                </div>
            </div>

            <div className={style.list}>
                {
                    items.map(({title, text, chip}, index) => (
                        <div key={index}
                             className={clsx({
                                 [style.item]: true,
                                 [style.item_selected]: index === selectedIndex,
                             })}
                             onClick={() => setSelectedIndex(index)}
                        >
                            <div className={style.inner}>
                                <div className={style.top}>
                                    <p className={style.title}
                                       data-aos="fade-right"
                                    >
                                        {title}
                                    </p>
                                    <div className={style.chip}
                                         data-aos="fade-left"
                                    >
                                        {
                                            matchesDesktop ? <p>{chip}</p> : svgIcons.dollar
                                        }
                                    </div>
                                </div>
                                <Collapse in={index === selectedIndex}>
                                    <div className={style.text}>{text}</div>
                                </Collapse>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
