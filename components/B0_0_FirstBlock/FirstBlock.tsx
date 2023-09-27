import {format} from "date-fns";
import style from "./FirstBlock.module.scss";
import * as React from "react";
import {useEffect, useState} from "react";
import moment from 'moment-timezone';

const items = [
    {label: "Instagram", href: "#"},
    {label: "Dribbble", href: "#"},
    {label: "Twitter", href: "#"},
    {label: "Telegram", href: "#"},
    {label: "Telegram", href: "#"},
];


export const FirstBlock = () => {

    const [time, setTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment().tz("Europe/Kyiv").format("hh:mm A"))
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    return (
        <div className={style.firstBlock}>

            <div className={style.videoWrapper}>
                <video src="video/first_block.mp4"
                       playsInline={true}
                       muted={true}
                       width="100%"
                       height="100%"
                       autoPlay={true}
                       loop={true}
                />
            </div>

            <div className={style.inner}>

                <div className={style.titleBlock}>
                    <h1 className={style.title}>
                        Taking <span>crypto</span> and <span>fintech</span> products to the next level
                    </h1>

                    <div className={style.right}>
                        <div>
                            <p>Kiev, Ukrainian Local</p>
                            <p>Time → {
                                //format(new Date(), 'hh:mm aa')
                                time
                            }</p>
                        </div>
                        <div>
                            <p>{format(new Date(), 'cccc')}</p>
                            <p>{format(new Date(), 'LLLL d, yyyy')}</p>
                        </div>
                    </div>
                </div>

                <div className={style.items}>
                    {
                        items.map(({label, href}, key) => (
                            <a key={key}
                               className={style.item}
                               href={href}
                               target="_blank"
                               rel="noreferrer noopener"
                            >
                                {label}
                            </a>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}
