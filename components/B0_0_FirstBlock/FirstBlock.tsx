import {format} from "date-fns";
import style from "./FirstBlock.module.scss";
import * as React from "react";
import ReactPlayer from "react-player";


const items = [
    {label: "Instagram", href: "#"},
    {label: "Dribbble", href: "#"},
    {label: "Twitter", href: "#"},
    {label: "Telegram", href: "#"},
    {label: "Telegram", href: "#"},
];


export const FirstBlock = () => {
    return (
        <div className={style.firstBlock}>

            <div className={style.videoWrapper}>
                <ReactPlayer url="video/first_block.mp4"
                             playsinline={true}
                             muted={true}
                             width="100%"
                             height="100%"
                             playing={true}
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
                            <p>Local Time → {format(new Date(), 'hh:mm aa')}</p>
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
