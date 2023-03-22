import style from "./OurServices.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import {items} from "./items";
import {useEffect, useRef, useState} from "react";
import {Collapse} from "@mui/material";
import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {svgIcons} from "../../assets/svgIcons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const OurServices = observer(() => {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const matchesDesktop = useMediaQuery('(min-width:1400px)');

    const {
        setModelShift,
        setBlock2Height
    } = useStore();

    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                //console.log(window.innerHeight);
                //console.log(rect.height)
                //console.log("---")

                if (rect.bottom < window.innerHeight) {
                    // начинаем поднимать блок с моделью на window.innerHeight - rect.bottom
                    setModelShift(true);
                } else {
                    // у блока с моделью нет трансформации сдвига
                    setModelShift(false);
                }
            }
        };
        window.addEventListener("scroll", onScroll, {passive: true});
    }, []);

    useEffect(() => {
        if (ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setBlock2Height(rect.height)
        }
    }, [ref])

    return (
        <div className={style.ourServices}
             ref={ref}
        >

            <div className={style.header}>
                <div className={style.inner}>
                    <TitleWrapper step="01" label="Our Services" black={false}/>
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
                             //onClick={() => setSelectedIndex(index)}
                        >
                            <div className={style.borderTop}
                                 data-aos="zoom-in-left"
                                 data-aos-offset="200"
                                 data-aos-duration="1000"
                            />

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
})
