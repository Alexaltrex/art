import style from "./AboutUs.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {useEffect, useRef, useState} from "react";
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

export const AboutUs = () => {
    const ref = useRef<HTMLDivElement>(null!);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                // console.log(rect.top)
                // console.log(window.innerHeight)
                // console.log("---")
                if (rect.top < window.innerHeight / 2) {
                    setDark(false);
                } else {
                    setDark(true);
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
                    <p className={style.text}>
                        For more than <span>3 years</span> our team has been making unique and reliable <span>crypto and fintech</span> products. <span>10+ people</span> in
                        the design team, <span>20+ person development team. And all this allows us to be one of the best in our niche</span>
                    </p>
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
