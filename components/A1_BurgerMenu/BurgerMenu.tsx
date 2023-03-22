import style from "./BurgerMenu.module.scss"
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import Link from "next/link";
import {ICategory} from "../../types/category.type";
import {FC} from "react";

interface IBurgerMenu {
    categories: ICategory[]
}

export const BurgerMenu: FC<IBurgerMenu> = observer(({categories}) => {
    const {burgerMenu} = useStore();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_hide]: !burgerMenu,
        })}>
            <nav className={style.links}>
                {
                    categories.map(({id, name}, index) => (
                        <Link key={index}
                              href={`/branding/${id}`} className={style.link}
                        >
                            {name}
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
