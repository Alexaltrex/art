import style from "./Header.module.scss"
import {svgIcons} from "../../assets/svgIcons";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import {useState} from "react";
import clsx from "clsx";
import {AnimatedLink} from "../X_common/AnimatedLink/AnimatedLink";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";

export const links = [
    {href: "behance", label: "Behance"},
    {href: "dribbble", label: "Dribbble"},
    {href: "instagrma", label: "Instagrma"},
    {href: "Twitter", label: "Twitter"},
]

export const Header = observer(() => {
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

    return (
        <header className={clsx({
            [style.header]: true,
            [style.header_hide]: scrollDown && pageYOffset > 200 && !burgerMenu,
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

                    <button className={style.burgerBtn}
                            onClick={onBurgerHandler}
                    >
                        {burgerMenu ? svgIcons.close : svgIcons.burger}
                    </button>

                    <button className={style.stopBtn}>
                        {svgIcons.ukraina}
                        <p>Stop war</p>
                    </button>
                </div>
            </div>

        </header>
    )
})
