import style from "./AboutUs.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {FC, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {AnimatedNumber} from "../X_common/AnimatedNumber/AnimatedNumber";
import {TextWithAnimatedMask} from "../X_common/TextWithAnimatedMask/TextWithAnimatedMask";

const items = [
    {
        value: 40,
        text: "Cool and ambitious professionals on our team"
    },
    {
        value: 3,
        text: "Years of uninterrupted growth and development in fintech and web3"
    },
    {
        value: 50,
        text: "Successfully completed projects and satisfied customers"
    },
]

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
                if (rect.top < 0.5 * window.innerHeight - 150) {
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
                                {item: <p>For more than <span>3</span></p>},
                                {item: <p><span>years</span> our team has</p>},
                                {item: <p>been making unique</p>},
                                {item: <p>and reliable <span>crypto</span></p>},
                                {item: <p><span>and fintech</span></p>},
                                {item: <p>products. <span>10+ people</span></p>},
                                {item: <p>in the design team,</p>},
                                {item: <p>20+ person</p>},
                                {item: <p>development team.</p>},
                                {item: <p>And all this allows us</p>},
                                {item: <p>to be one of the best</p>},
                                {item: <p>in our niche</p>}
                            ].map(({item}, key) => (
                                // <RowAnimated key={key} row={item} showMask={showMask}/>
                                <TextWithAnimatedMask key={key} row={item} showMask={showMask}/>
                            ))
                        }
                    </div>

                    <div className={style.textDesktop}>
                        {
                            [
                                {item: <p>For more than <span>3 years</span> our</p>},
                                {item: <p>team has been making unique</p>},
                                {item: <p>and reliable <span>crypto and fintech</span></p>},
                                {item: <p>products. <span>10+ people</span> in the</p>},
                                {item: <p>design team, 20+ person</p>},
                                {item: <p>development team. And all</p>},
                                {item: <p>this allows us to be one of the</p>},
                                {item: <p>best in our niche</p>},
                            ].map(({item}, key) => (
                                // <RowAnimated key={key} row={item} showMask={showMask}/>
                                <TextWithAnimatedMask key={key} row={item} showMask={showMask}/>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={style.second}>
                <div className={style.inner}>
                    {
                        items.map(({value, text}, key) => (
                            <div key={key}
                                 className={style.item}
                            >
                                <div className={style.borderMobile}
                                     data-aos="zoom-in-left"
                                     data-aos-offset="200"
                                     data-aos-duration="1000"
                                />

                                <div className={style.borderTopDesktop}>
                                    <div className={style.borderTopDesktopInner}
                                         data-aos="zoom-in-left"
                                         data-aos-offset="200"
                                         data-aos-duration="1000"
                                    />
                                </div>

                                {
                                    key !== 0 &&
                                    <div className={style.borderVerticalDesktop}>
                                        <div className={style.borderVerticalInner}
                                             data-aos="zoom-in-up"
                                             data-aos-offset="200"
                                             data-aos-duration="1000"
                                        />
                                    </div>
                                }

                                <div className={style.numberWrapper}>
                                    <AnimatedNumber value={value}
                                                    className={style.value}
                                    />
                                    <span className={style.value}>+</span>
                                </div>

                                <p className={style.text}
                                   data-aos="fade-up"
                                >
                                    {text}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
