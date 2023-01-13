import {FC, ReactNode, useEffect, useRef, useState} from "react";
import style from "./MainLayout.module.scss"
import Head from "next/head";
import {Header} from "../../components/A0_Header/Header";

import {ThemeProvider} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import {Footer} from "../../components/A2_Footer/Footer";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
}

export const MainLayout: FC<IMainLayout> = observer(({
                                                         children,
                                                         headTitle = 'Demyanchul Art | Home page',
                                                     }) => {
    const {preloader, setBottom} = useStore();

    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const onScroll = (e: any) => {

            if (ref && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                // console.log(rect.bottom);
                // console.log(window.innerHeight)
                //console.log(" ")
                setBottom(rect.bottom - window.innerHeight);
            }
        };
        window.addEventListener(
            "scroll",
            onScroll,
            {passive: true}
        );
    }, []);

    // useEffect(() => {
    //     if (ref && ref.current) {
    //         ref.current.addEventListener(
    //             "wheel",
    //             (e) => {
    //                 e.preventDefault()
    //             },
    //             {passive: false}
    //         )
    //     }
    // }, [])


    return (
        <div className={clsx({
            [style.mainLayout]: true,
            [style.mainLayout_preloader]: preloader,
        })}
             ref={ref}
        >
            <Head>
                {/*<meta name="keywords" content="next,js,nextjs,react"/>*/}
                {/*<meta name="description" content="this is demo site"/>*/}
                <meta charSet="utf-8"/>
                <title>
                    {headTitle}
                </title>
            </Head>

            <Header/>
            {/*<BurgerMenu/>*/}

            <main className={style.main}>
                {children}
            </main>

            <Footer/>
        </div>
    )

})
