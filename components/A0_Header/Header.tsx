import style from "./Header.module.scss"
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";

export const links = [
    {href: "behance", label: "Behance"},
    {href: "dribbble", label: "Dribbble"},
    {href: "instagrma", label: "Instagrma"},
    {href: "Twitter", label: "Twitter"},
]

export const Header = () => {

    const onSoundHandler = async () => {
        console.log("onSoundHandler")
        if (playerRef && playerRef.audioEl && playerRef.audioEl.current) {
            if (play) {
                setPlay(false);
                playerRef.audioEl.current.pause();
            } else {
                setPlay(true);
                await playerRef.audioEl.current.play();
            }

        }
    }

    const [play, setPlay] = useState(false);
    const [playerRef, setPlayerRef] = useState<ReactAudioPlayer | null>(null);

    // useEffect(() => {
    //     if (buttonRef && buttonRef.current) {
    //         // rap.audioEl.current.play()
    //         // setPlay(true);
    //         // setTimeout(() => {
    //         //     setPlay(true);
    //         //     // @ts-ignore
    //         //     playerRef.audioEl.current.play()
    //         // }, 1000)
    //         console.log("start")
    //         buttonRef.current.click();
    //     }
    // }, [buttonRef])


    return (
        <header className={style.header}>
            <div className={style.inner}>

                <ReactAudioPlayer
                    ref={el => setPlayerRef(el)}
                    src="/mp3/music.mp3"
                    autoPlay
                    //controls
                    volume={1}
                />

                <div className={style.leftBlock}>
                    <Link href="/">
                        <div className={style.logo}>
                            {svgIcons.logo}
                        </div>
                    </Link>

                    <nav className={style.links}>
                        {
                            links.map(({href, label}, key) => (
                                <Link key={key}
                                      href={href}
                                      className={style.link}
                                >
                                    {label}
                                </Link>
                            ))
                        }
                    </nav>

                </div>

                <div className={style.rightBlock}>
                    <button className={style.talkBtn}>
                        Let’s talk
                    </button>

                    <button className={clsx(style.soundBtn, play && "soundBtn")}
                            onClick={onSoundHandler}
                    >
                        {svgIcons.audio}
                    </button>

                    <button className={style.burgerBtn}>
                        {svgIcons.burger}
                    </button>

                    <button className={style.stopBtn}>
                        {svgIcons.ukraina}
                        <p>Stop war</p>
                    </button>
                </div>
            </div>

        </header>
    )
}
