import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";
import { wrapper } from "../../redux";
import { initToken } from "../../redux/auth/actions";
import { menuInit } from "../../redux/menu/actions";
import { SchemasContainer } from "../../containers/schemas/SchemasContainer";
import { loadSchemas } from "../../redux/schemas/actions";
import { useDispatch } from "react-redux";
import {END} from 'redux-saga';

const SchemasPage: FC = () => {
    return <SchemasContainer />;
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
            //@ts-ignore
            await context.store.sagaTask.toPromise();
        }

        return {
            props: {},
        };
    }
);

export default SchemasPage;
