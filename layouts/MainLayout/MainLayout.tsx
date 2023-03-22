import {FC, ReactNode, useEffect, useRef, useState} from "react";
import style from "./MainLayout.module.scss"
import Head from "next/head";
import {Header} from "../../components/A0_Header/Header";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import {Preloader} from "../../components/A3_Preloader/Preloader";
import {BurgerMenu} from "../../components/A1_BurgerMenu/BurgerMenu";
import {ICategory} from "../../types/category.type";
import { FooterNew } from "../../components/A2_2_FooterNew/FooterNew";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
    categories: ICategory[]
}

export const MainLayout: FC<IMainLayout> = observer(({
                                                         children,
                                                         headTitle = 'Demyanchul Art | Home page',
                                                         categories
                                                     }) => {
    const {
        pageYOffset,
        setPageYOffset,
        preloader,
        setBottom,
        setScrollDown,
        disableScroll
    } = useStore();

    const ref = useRef<HTMLDivElement>(null!);


    useEffect(() => {
        const onScroll = (e: Event) => {
            if (window.pageYOffset > pageYOffset) {
                setScrollDown(true)
            } else {
                setScrollDown(false)
            }
            setPageYOffset(window.pageYOffset);

            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setBottom(rect.bottom - window.innerHeight);
            }

        };
        window.addEventListener(
            "scroll",
            onScroll,
            {passive: true}
        );
    }, [pageYOffset]);



    return (
        <div className={clsx({
            [style.mainLayout]: true,
            [style.mainLayout_preloader]: preloader,
            //[style.mainLayout_disableScroll]: disableScroll,
        })}
             ref={ref}
             // style={{
             //     paddingBottom: getFooterHeight(isDesktop)
             // }}
        >
            <Head>
                {/*<meta name="keywords" content="next,js,nextjs,react"/>*/}
                {/*<meta name="description" content="this is demo site"/>*/}
                <meta charSet="utf-8"/>
                <title>
                    {headTitle}
                </title>
            </Head>

            <Preloader/>

            <Header categories={categories}/>
            <BurgerMenu categories={categories}/>

            <main className={style.main}>
                {children}
            </main>

            <FooterNew categories={categories}/>
        </div>
    )

})
