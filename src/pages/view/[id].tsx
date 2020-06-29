import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import nextCookies from "next-cookies";
import { RootState, SagaStore, wrapper } from "../../redux";
import { initToken } from "../../redux/auth/actions";
import { loadSchema } from "../../redux/schema/actions";
import ErrorPage from "next/error";
import { ParsedUrlQuery } from "querystring";
import { ViewContainer } from "../../containers/view/ViewContainer";
import Head from "next/head";

interface IProps {
    isError?: boolean | undefined;
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

const SchemaPage: FC<IProps> = ({ isError }) => {
    if (isError) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <>
            <Head>
                <title>Просмотр схемы</title>
            </Head>
            <ViewContainer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<
    any,
    IParams
> = wrapper.getServerSideProps(async (context) => {
    const { access_token } = nextCookies(context);
    if (!access_token && context.res) {
        context.res.writeHead(302, { location: "/login" });
        context.res.end();
    } else {
        context.store.dispatch(initToken(access_token));
        context.store.dispatch(loadSchema.request(context.params.id as string));
        await (context.store as SagaStore).sagaTask.toPromise();
        const errors = (context.store.getState() as RootState).serverErrors;
        if (errors.length) {
            context.res.statusCode = 404;
        }

        return {
            props: {
                isError: !!errors.length,
            },
        };
    }

    return {
        props: {},
    };
});

export default SchemaPage;
