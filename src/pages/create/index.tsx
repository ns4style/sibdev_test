import { FC } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";
import { wrapper } from "../../redux";
import { initToken } from "../../redux/auth/actions";
import { menuInit } from "../../redux/menu/actions";

const SchemasPage: FC = () => {
    return <div>CREATE WILL BE HERE</div>;
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
