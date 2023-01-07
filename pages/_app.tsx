import "../assets/style/global.scss";
import type {AppProps} from 'next/app'
import {store, Store} from "../store/store";
import {createContext} from "react";
import {theme} from "../theme/theme";
import {ThemeProvider} from "@mui/material";

export const StoreContext = createContext<Store>({} as Store);

export default function App({Component, pageProps}: AppProps) {
    return (
        <StoreContext.Provider value={store}>
            {/*<ThemeProvider theme={theme}>*/}
                <Component {...pageProps} />
            {/*</ThemeProvider>*/}
       </StoreContext.Provider>
    )
}
