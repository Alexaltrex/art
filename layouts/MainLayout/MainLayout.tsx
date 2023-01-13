import {FC, ReactNode} from "react";
import style from "./MainLayout.module.scss"
import Head from "next/head";
import {Header} from "../../components/A0_Header/Header";

import {ThemeProvider} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
}

export const MainLayout: FC<IMainLayout> = observer(({
                                                children,
                                                headTitle = 'Demyanchul Art | Home page',
                                            }) => {
    const {preloader} = useStore();

    return (
            <div className={clsx({
                [style.mainLayout]: true,
                [style.mainLayout_preloader]: preloader,
            })}>
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

                <main>
                    {children}
                </main>

                {/*<Footer/>*/}
            </div>
    )

})
