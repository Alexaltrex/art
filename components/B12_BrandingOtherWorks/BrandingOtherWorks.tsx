import style from "./BrandingOtherWorks.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import * as React from "react";
import {TextWithAnimatedMask} from "../X_common/TextWithAnimatedMask/TextWithAnimatedMask";
import {useEffect, useRef, useState} from "react";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import {Zoom} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const BrandingOtherWorks = observer(() => {
    const {showPopup, setShowPopup, setPopupForm} = useStore();

    const ref = useRef<HTMLDivElement>(null!);
    const [showMask, setShowMask] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top < 0.5 * window.innerHeight) {
                    setShowMask(true);
                } else {
                    setShowMask(false);
                }

            }
        };
        window.addEventListener("scroll", onScroll, {passive: true})
    }, []);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const onMouseMoveHandler = (e: any) => {
        setX(e.clientX);
        setY(e.clientY);
    }
    const [enter, setEnter] = useState(false);

    const onClickHandler = () => {
        setPopupForm(true)
        setShowPopup(false);
    }

    return (
        <div className={style.brandingOtherWorks}
             ref={ref}
        >
            <div className={style.inner}>

                <TitleWrapper step="01" label="Other works" black={true}/>

                <div className={style.textMobile}>
                    {
                        [
                            {item: <p>Brand identity</p>},
                            {item: <p>allows you to tell</p>},
                            {item: <p>your brand story</p>},
                            {item: <p>in the broadest</p>},
                            {item: <p>possible way</p>},
                            {item: <p>without</p>},
                            {item: <p>incurring</p>},
                            {item: <p>additional</p>},
                            {item: <p>advertising</p>},
                            {item: <p>costs. Spread</p>},
                            {item: <p>your style on all</p>},
                            {item: <p>possible media:</p>},
                            {item: <p>employee</p>},
                            {item: <p>clothing,</p>},
                            {item: <p>reception desks,</p>},
                            {item: <p>souvenir caps,</p>},
                            {item: <p>mugs and</p>},
                            {item: <p>ballpoint pens.</p>},
                        ].map(({item}, key) => (
                            <TextWithAnimatedMask key={key} row={item} showMask={showMask}/>
                        ))
                    }
                </div>

                <div className={style.wrapper}>

                    <div className={style.popup}
                         style={{
                             left: `calc(${x}px - ${80/14}vw)`,
                             top: `calc(${y}px - ${80/14}vw)`,
                         }}
                    >
                        <Zoom in={enter && showPopup}>
                            <div className={style.popupInner}>
                                <p>Let’s talk</p>
                            </div>
                        </Zoom>
                    </div>

                    <div className={style.textDesktop}
                         onMouseMove={onMouseMoveHandler}
                         onMouseEnter={() => setEnter(true)}
                         onMouseLeave={() => setEnter(false)}
                         onClick={onClickHandler}
                    >
                        {
                            [
                                {item: <p>Brand identity allows you</p>},
                                {item: <p>to tell your brand story in</p>},
                                {item: <p>the broadest possible way</p>},
                                {item: <p>without incurring</p>},
                                {item: <p>additional advertising</p>},
                                {item: <p>costs. Spread your style</p>},
                                {item: <p>on all possible media:</p>},
                                {item: <p>employee clothing,</p>},
                                {item: <p>reception desks, souvenir</p>},
                                {item: <p>caps, mugs and ballpoint</p>},
                                {item: <p> pens.</p>},
                            ].map(({item}, key) => (
                                <TextWithAnimatedMask key={key} row={item} showMask={showMask}/>
                            ))
                        }
                    </div>
                </div>


                <div className={style.info}>
                    <p className={style.label}>Art director branding</p>
                    <p className={style.name}>Marina Zakharova</p>
                    <img src="/png/sign.png" alt="" className={style.sign}/>
                </div>

                <PrimaryButton white={false}
                               label="Let’s talk"
                               className={style.btn}
                               onClick={() => setPopupForm(true)}
                />


            </div>
        </div>
    )
})
