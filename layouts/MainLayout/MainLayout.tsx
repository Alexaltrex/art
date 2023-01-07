import {FC, ReactNode} from "react";
import style from "./MainLayout.module.scss"
import Head from "next/head";
import {Header} from "../../components/A0_Header/Header";

import {ThemeProvider} from "@mui/material";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
}

export const MainLayout: FC<IMainLayout> = ({
                                                children,
                                                headTitle = 'Demyanchul Art | Home page',
                                            }) => {
    return (
            <div className={style.mainLayout}>
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

}
