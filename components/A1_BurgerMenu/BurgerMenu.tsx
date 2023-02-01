import style from "./BurgerMenu.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import {links} from "../A0_Header/Header";
import Link from "next/link";

export const BurgerMenu = observer(() => {
    const {burgerMenu} = useStore();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_hide]: !burgerMenu,
        })}>
            <nav className={style.links}>
                {
                    links.map(({href, label}, index) => (
                        <Link href={href}
                              key={index}
                              className={style.link}
                        >
                            {label}
                        </Link>
                    ))
                }
            </nav>

            <div className={style.btns}>
                <button className={style.talkBtn}>
                    Let’s talk
                </button>
                <a className={style.stopBtn}
                   href="https://savelife.in.ua"
                   target="_blank"
                   rel="noopener nofollow noreferrer"
                >
                    <div className={style.ukraina}/>
                    Stop war
                </a>
            </div>
        </div>
    )
})
