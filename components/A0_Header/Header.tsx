import style from "./Header.module.scss"
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import {FC, useEffect, useState} from "react";
import clsx from "clsx";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {ICategory} from "../../types/category.type";
import * as React from "react";
import {Equalizer} from "./Equalizer/Equalizer";

interface IHeader {
    categories: ICategory[]
}

export const Header: FC<IHeader> = observer(({categories}) => {
    const {
        scrollDown,
        pageYOffset,
        burgerMenu,
        setBurgerMenu,
        setPopupForm
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

    const onBurgerHandler = () => {
        setBurgerMenu(!burgerMenu);
    }

    const onLetsTalkClick = () => setPopupForm(true);

    const [hided, setHided] = useState(false);
    useEffect(() => {
        if (scrollDown) {
            setHided(true);
        }
    }, [scrollDown])

    return (
        <header className={clsx({
            [style.header]: true,
            [style.header_hide]: hided && pageYOffset > 200 && !burgerMenu,
        })}>

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

                    {/*<nav className={style.links}>*/}
                    {/*    {*/}
                    {/*        categories.map(({id, name}, key) => (*/}
                    {/*            <AnimatedLink className={style.linkWrapper} key={key}>*/}
                    {/*                <Link href={`/branding/${id}`}*/}
                    {/*                      className={style.link}*/}
                    {/*                >*/}
                    {/*                    {name}*/}
                    {/*                </Link>*/}
                    {/*            </AnimatedLink>*/}

                    {/*        ))*/}
                    {/*    }*/}
                    {/*</nav>*/}

                </div>

                <div className={style.rightBlock}>
                    <button className={style.talkBtn}
                            onClick={onLetsTalkClick}
                    >
                        Let’s talk
                    </button>

                    <button className={clsx(style.soundBtn, play && "soundBtn")}
                            onClick={onSoundHandler}
                    >
                        {/*{!play ? svgIcons.pause : svgIcons.play}*/}
                        <Equalizer play={play}/>
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
