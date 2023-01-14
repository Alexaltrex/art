import "../assets/style/global.scss";
import type {AppProps} from 'next/app'
import {store, Store} from "../store/store";
import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import "aos/dist/aos.css";
import AOS from "aos";

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

    useEffect(() => {
        AOS.init({
            // easing: "ease-out-cubic",
            // once: true,
            // offset: 50,
        });
    }, []);

    return (
        <StoreContext.Provider value={store}>
                <Component {...pageProps} />
       </StoreContext.Provider>
    )
}
