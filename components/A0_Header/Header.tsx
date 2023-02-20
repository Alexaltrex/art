import style from "./Header.module.scss"
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import {FC, useRef, useState} from "react";
import clsx from "clsx";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {ICategory} from "../../types/category.type";
import * as React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {ssr: false});

export const links = [
    {href: "behance", label: "Behance"},
    {href: "dribbble", label: "Dribbble"},
    {href: "instagrma", label: "Instagrma"},
    {href: "Twitter", label: "Twitter"},
]

interface IHeader {
    categories: ICategory[]
}

export const Header: FC<IHeader> = observer(({categories}) => {
    const {
        scrollDown,
        pageYOffset,
        burgerMenu,
        setBurgerMenu,
    } = useStore();

    const onSoundHandler = async () => {
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

    const onBurgerHandler = () => {
        setBurgerMenu(!burgerMenu);
    }

    const reactPlayerRef = useRef(null!);
    const [playing, setPlaying] = useState(true);
    //console.log(reactPlayerRef.current)

    const onPlay = () => {
        setPlaying(!playing);
    }

    return (
        <header className={clsx({
            [style.header]: true,
            [style.header_hide]: scrollDown && pageYOffset > 200 && !burgerMenu,
        })}>

            <div className={style.inner}>

                {/*<ReactPlayer ref={reactPlayerRef}*/}
                {/*             playing={true}*/}
                {/*             url={"/video/sound.mp4"}*/}
                {/*               url={"https://www.youtube.com/watch?v=ZzIwhiPAW6A"}*/}
                {/*             controls={true}*/}
                {/*             loop={true}*/}
                {/*             volume={1}*/}
                {/*             config={{*/}
                {/*                 file: {*/}
                {/*                     attributes: {*/}
                {/*                         autoPlay: true,*/}
                {/*                         //muted: true*/}
                {/*                     }*/}
                {/*                 }*/}
                {/*             }}*/}
                {/*             style={{*/}
                {/*                 //display: "none"*/}
                {/*             }}*/}
                {/*/>*/}

                <ReactAudioPlayer
                    ref={el => setPlayerRef(el)}
                    src="/mp3/music.mp3"
                    //autoPlay
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
                                <AnimatedLink className={style.linkWrapper} key={key}>
                                    <Link href={href}
                                          className={style.link}
                                    >
                                        {label}
                                    </Link>
                                </AnimatedLink>

                            ))
                        }
                    </nav>

                    <nav className={style.links2}>
                        {
                            categories.map(({id, name}) => (
                                <Link key={id}
                                      href={`/branding/${id}`}
                                      className={style.link}
                                >
                                    {name}
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
                            //onClick={onPlay}
                    >
                        {play ? svgIcons.pause : svgIcons.play}
                    </button>

                    <button className={style.burgerBtn}
                            onClick={onBurgerHandler}
                    >
                        {burgerMenu ? svgIcons.close : svgIcons.burger}
                    </button>

                    <a className={style.stopBtn}
                       href="https://savelife.in.ua"
                       target="_blank"
                       rel="noopener nofollow noreferrer"
                    >
                        {svgIcons.ukraina}
                        <p>Stop war</p>
                    </a>
                </div>
            </div>

        </header>
    )
})
