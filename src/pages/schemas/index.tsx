import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";
import { SagaStore, wrapper } from "../../redux";
import { initToken } from "../../redux/auth/actions";
import { menuInit } from "../../redux/menu/actions";
import { SchemasContainer } from "../../containers/schemas/SchemasContainer";
import { loadSchemas } from "../../redux/schemas/actions";
import Head from "next/head";

const SchemasPage: FC = () => {
    return (
        <>
            <Head>
                <title>Список схем</title>
            </Head>
            <SchemasContainer />
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

            context.store.dispatch(loadSchemas.request());
            await (context.store as SagaStore).sagaTask.toPromise();
        }

        return {
            props: {},
        };
    }
);

export default SchemasPage;
