import style from "./Reviews.module.scss"
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import SwiperClass from 'swiper/types/swiper-class';
import {FC, useLayoutEffect, useRef, useState} from "react";
import * as React from "react";
import {svgIcons} from "../../assets/svgIcons";
import {Zoom} from "@mui/material";
import clsx from "clsx";
import {PrimaryButton} from "../X_common/ButtonPrimary/PrimaryButton";
import gsap from "gsap";


const items = [
    {
        el: <p>1 I have been working with Anatoly and his team for over 3 years. <span>Implemented 3 projects</span>.
            Anatoly and his team were always in touch, made all the changes...</p>,
        id: 0,
    },
    {
        el: <p>2 I have been working with Anatoly and his team for over 3 years. <span>Implemented 3 projects</span>.
            Anatoly and his team were always in touch, made all the changes...</p>,
        id: 1,
    },
    {
        el: <p>3 I have been working with Anatoly and his team for over 3 years. <span>Implemented 3 projects</span>.
            Anatoly and his team were always in touch, made all the changes...</p>,
        id: 2,
    },
];

const makeArray = (n: number): number[] => {
    const result = [] as number[];
    for (let i = 0; i < n; i++) {
        result.push(i)
    }
    return result;
}

export const Reviews = () => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [index, setIndex] = useState(1);

    const onMouseMoveHandler = (e: any) => {
        setX(e.clientX);
        setY(e.clientY);
    }

    const [enter, setEnter] = useState(false);
    const [click, setClick] = useState(false);

    const appRef = useRef<HTMLDivElement>(null!);
    const duration = 16;

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            gsap.timeline({repeat: -1})
                .to(".row-to-left1", {xPercent: -100, duration, ease: "none"})
                .set(".row-to-left1", {xPercent: 100})
                .to(".row-to-left1", {xPercent: 0, duration, ease: "none"})

            gsap.timeline({repeat: -1})
                .set(".row-to-left2", {xPercent: 100})
                .to(".row-to-left2", {xPercent: -100, duration: 2 * duration, ease: "none"})

            gsap.timeline({repeat: -1})
                .to(".row-to-left3", {xPercent: 100, duration, ease: "none"})
                .set(".row-to-left3", {xPercent: -100})
                .to(".row-to-left3", {xPercent: 0, duration, ease: "none"})

            gsap.timeline({repeat: -1})
                .set(".row-to-left4", {xPercent: -100})
                .to(".row-to-left4", {xPercent: 100, duration: 2 * duration, ease: "none"})


        }, appRef)

        return () => ctx.revert();
    }, [])


    return (
        <div className={style.reviews}
             ref={appRef}
        >

            <div className={style.popup}
                 style={{
                     left: `calc(${x}px - ${60 / 14}vw)`,
                     top: `calc(${y}px - ${60 / 14}vw)`,
                 }}
            >
                <Zoom in={enter && !click}>
                    <div className={style.popupInner}>
                        {svgIcons.arrow_left}
                        <p>Next</p>
                        {svgIcons.arrow_left}
                    </div>
                </Zoom>
            </div>

            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="08" label="Reviews" black={false}/>
                </div>
            </div>

            <div className={style.swiperWrapper}
                 onMouseMove={onMouseMoveHandler}
                 onMouseEnter={() => setEnter(true)}
                 onMouseLeave={() => setEnter(false)}

            >
                <Swiper className={style.swiper}
                        slidesPerView={1}
                        spaceBetween={0}
                        onSwiper={(swiper) => {
                            setSwiper(swiper);
                        }}
                        onSlideChange={(swiper) => {
                            setIndex(swiper.realIndex)
                        }}
                        onTouchStart={() => setClick(true)}
                >
                    {
                        items.map(({el, id}) => (
                            <SwiperSlide key={id}
                                         className={style.slide}
                            >
                                <div className={style.inner}>
                                    {el}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


            <div className={style.bottom}>
                <div className={style.inner}>

                    <div className={style.texts}>
                        <p>Cofounder - Jigen Hiperbest</p>
                        <p>Anatoliy Demiacnhuk</p>
                    </div>

                    <div className={style.control}>

                        <PrimaryButton label="Watch work"
                                       className={style.workBtn}
                        />

                        <div className={style.navigate}>
                            <button onClick={() => swiper?.slidePrev()}
                                    className={style.prevBtn}
                                    disabled={index === 1}
                            >
                                {svgIcons.arrow_left}
                            </button>
                            <button onClick={() => swiper?.slideNext()}
                                    className={style.nextBtn}
                                    disabled={index === items.length - 1}
                            >
                                {svgIcons.arrow_left}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className={style.blocks}>
                <div className={style.rowWrapper}>
                    <RowAnimated className="row-to-left1"/>
                    <RowAnimated className="row-to-left2"/>
                </div>

                <div className={style.rowWrapper}>
                    <RowAnimated className="row-to-left3"/>
                    <RowAnimated className="row-to-left4"/>
                </div>
            </div>
        </div>
    )
}

//========= ROW ANIMATED =========//
const RowAnimated: FC<{ className: string }> = ({className}) => {
    return (
        <div className={clsx(style.rowAnimated, className)}>
            {
                makeArray(9).map((el, index) => (
                    <div className={style[`block${index % 4}`]}
                         key={index}
                    >
                        <img src={`/png/logo${index % 9}.png`} alt=""/>
                    </div>
                ))
            }
        </div>
    )
}

