import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";

interface IProps {}

const IndexPage: FunctionComponent<IProps> = ({}) => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.res) {
        context.res.writeHead(302, { location: "/login" });
        context.res.end();
    }

    return {
        props: {},
    };
};

export default IndexPage;
