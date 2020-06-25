import { FC } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";

const SchemasPage: FC = () => {
    return <div>SCHEMAS WILL BE HERE</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { access_token } = nextCookies(context);
    if (!access_token && context.res) {
        context.res.writeHead(302, { location: "/login" });
        context.res.end();
    }

    return {
        props: {},
    };
};

export default SchemasPage;
