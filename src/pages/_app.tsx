import { RootState, useSelector, wrapper } from "../redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles";
import "antd/dist/antd.min.css";
import { notification } from "antd";
import { ConnectedRouter } from "connected-next-router";
import { FC, useEffect } from "react";
import { AppProps } from "next/app";
import { GlobalLayout } from "../components/Global";
import { useDispatch } from "react-redux";
import { showErrors } from "../redux/serverErrors/actions";

notification.config({
    placement: "topRight",
    duration: 10,
});

const theme = {};
const CustomApp: FC<AppProps> = ({ Component, pageProps, router }) => {
    const dispatch = useDispatch();
    const serverErrors = useSelector((state: RootState) => state.serverErrors);
    useEffect(() => {
        dispatch(showErrors());
        return () => {};
    }, [serverErrors]);

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

export default wrapper.withRedux(CustomApp);
