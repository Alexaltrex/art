import "../assets/style/global.scss";
import type {AppProps} from 'next/app'
import {store, Store} from "../store/store";
import {createContext, useEffect, useState} from "react";
//import {useRouter} from "next/router";
import "aos/dist/aos.css";
import AOS from "aos";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Script from 'next/script'
import {Router} from "next/router";

export const StoreContext = createContext<Store>({} as Store);

export default function App({Component, pageProps}: AppProps) {
    // const router = useRouter();
    // const [loading, setLoading] = useState(false);
    //
    // useEffect(() => {
    //     const handleStart = (url: string) => {
    //         console.log("start");
    //         setLoading(true);
    //     }
    //     const handleStop = () => {
    //         console.log("stop")
    //         setLoading(false);
    //     }
    //
    //     router.events.on('routeChangeStart', handleStart)
    //     router.events.on('routeChangeComplete', handleStop)
    //     router.events.on('routeChangeError', handleStop)
    //
    //     return () => {
    //         router.events.off('routeChangeStart', handleStart)
    //         router.events.off('routeChangeComplete', handleStop)
    //         router.events.off('routeChangeError', handleStop)
    //     }
    // }, [router]);

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: Infinity,
            },
            mutations: {
                retry: 1
            }
        }
    }))

    useEffect(() => {
        AOS.init({
            // easing: "ease-out-cubic",
            // once: true,
            // offset: 50,
        });
    }, []);

    useEffect(() => {
        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('990410175412384');
                ReactPixel.pageView();

                Router.events.on("routeChangeComplete", () => {
                    ReactPixel.pageView();
                });
            });
    });


    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-CDSSE96B38"/>
            <Script id="google-analytics">
                {
                    `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-CDSSE96B38');
                    `
                }
            </Script>
            <DndProvider backend={HTML5Backend}>
                <QueryClientProvider client={queryClient}>
                    <StoreContext.Provider value={store}>
                        <Component {...pageProps} />
                    </StoreContext.Provider>
                </QueryClientProvider>
            </DndProvider>
        </>

    )
}
