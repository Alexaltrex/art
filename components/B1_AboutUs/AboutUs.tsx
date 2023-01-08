import style from "./AboutUs.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {FC, useEffect, useRef, useState} from "react";
import clsx from "clsx";

const items = [
    {
        value: 403,
        text: "Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante."
    },
    {
        value: 403,
        text: "Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante."
    },
    {
        value: 403,
        text: "Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante."
    },
]

//========= ANIMATED ROW =========//
interface IRowAnimated {
    row: JSX.Element
    showMask: boolean
}

const RowAnimated: FC<IRowAnimated> = ({row, showMask}) => {
    const [hideMask, setHideMask] = useState(false);
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top < 0.5 * window.innerHeight) {
                    setHideMask(true);
                } else {
                    setHideMask(false);
                }
            }

        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);

    return (
        <div ref={ref}
             className={clsx({
                 [style.row]: true,
                 [style.row_showMask]: showMask,
                 [style.row_hideMask]: hideMask,
             })}
        >
            {row}
        </div>
    )
}

//========= ABOUT US =========//
export const AboutUs = () => {
    const ref = useRef<HTMLDivElement>(null!);
    const [dark, setDark] = useState(true);
    const [showMask, setShowMask] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                // console.log("---")
                if (rect.top < 0.6 * window.innerHeight) {
                    setDark(false);
                } else {
                    setDark(true);
                }
                // showMask
                if (rect.top < 0.5 * window.innerHeight - 200) {
                    setShowMask(true);
                } else {
                    setShowMask(false);
                }

            }

        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);

    return (
        <div className={clsx({
            [style.aboutUs]: true,
            [style.aboutUs_dark]: dark,
        })}
             ref={ref}
        >

            <div className={style.first}>
                <div className={style.inner}>
                    <TitleWrapper step="01" label="About us" black={!dark}/>

                    <div className={style.textMobile}>
                        {
                            [
                                <p>For more than <span>3</span></p>,
                                <p><span>years</span> our team has</p>,
                                <p>been making unique</p>,
                                <p>and reliable <span>crypto</span></p>,
                                <p><span>and fintech</span></p>,
                                <p>products. <span>10+ people</span></p>,
                                <p>in the design team,</p>,
                                <p>20+ person</p>,
                                <p>development team.</p>,
                                <p>And all this allows us</p>,
                                <p>to be one of the best</p>,
                                <p>in our niche</p>
                            ].map((row, key) => (
                                <RowAnimated key={key} row={row} showMask={showMask}/>
                            ))
                        }
                    </div>



                    <div className={style.textDesktop}>
                        {
                            [
                                <p>For more than <span>3 years</span> our</p>,
                                <p>team has been making unique</p>,
                                <p>and reliable <span>crypto and fintech</span></p>,
                                <p>products. <span>10+ people</span> in the</p>,
                                <p>design team, 20+ person</p>,
                                <p>development team. And all</p>,
                                <p>this allows us to be one of the</p>,
                                <p>best in our niche</p>,
                            ].map((row, key) => (
                                <RowAnimated key={key} row={row} showMask={showMask}/>
                            ))
                        }
                    </div>

                    {/*<div className={style.text}>*/}
                    {/*    For more than <span>3 years</span> our team has been making unique and reliable <span>crypto and fintech</span> products. <span>10+ people</span> in*/}
                    {/*    the design team, <span>20+ person development team. And all this allows us to be one of the best in our niche</span>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className={style.second}>
                <div className={style.inner}>
                    {
                        items.map(({value, text}, key) => (
                            <div className={style.item} key={key}>
                                <p className={style.value}>{value}</p>
                                <p className={style.text}>{text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
