import { wrapper } from "../redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles";
import "antd/dist/antd.min.css";
import { notification } from "antd";
import { ConnectedRouter } from "connected-next-router";
import { FC } from "react";
import { AppProps } from "next/app";
import {GlobalLayout} from "../components/Global";

notification.config({
    placement: "topRight",
    duration: 10,
});

const theme = {};

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
    if (router.pathname.startsWith("/login")) {
        return (
            <ConnectedRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ConnectedRouter>
        );
    }

    return (
        <ConnectedRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <GlobalLayout>
                    <Component {...pageProps} />
                </GlobalLayout>
            </ThemeProvider>
        </ConnectedRouter>
    );
};

export default wrapper.withRedux(App);
