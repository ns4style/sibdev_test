import { FunctionComponent } from "react";
import Head from "next/head";
import { LoginLayout } from "../../components/Login";
import { LoginContainer } from "../../containers/login/LoginContainer";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";

interface IProps {}

const LoginPage: FunctionComponent<IProps> = ({}) => (
    <>
        <Head>
            <title>Login</title>
        </Head>
        <LoginLayout>
            <LoginContainer />
        </LoginLayout>
    </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { access_token } = nextCookies(context);
    if (access_token && context.res){
        context.res.writeHead(302, { location: "/schemas" });
        context.res.end();
    }

    return {
        props: {},
    };
};

export default LoginPage;
