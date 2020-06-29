import React, { FC } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";
import { wrapper } from "../../redux";
import { initToken } from "../../redux/auth/actions";
import { menuInit } from "../../redux/menu/actions";
import { CreateContainer } from "../../containers/create/CreateContainer";
import Head from "next/head";

const SchemasPage: FC = () => {
    return (
        <>
            <Head>
                <title>Создание схемы</title>
            </Head>
            <CreateContainer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        const { access_token } = nextCookies(context);
        if (!access_token && context.res) {
            context.res.writeHead(302, { location: "/login" });
            context.res.end();
        } else {
            context.store.dispatch(initToken(access_token));
            const url = context.req.url;
            if (url) {
                context.store.dispatch(menuInit(url));
            }
        }
        return {
            props: {},
        };
    }
);

export default SchemasPage;
