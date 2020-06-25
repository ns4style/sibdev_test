import { FC } from "react";
import { Layout } from "antd";
import { Container, CustomHeader } from "../";

const { Content } = Layout;

const GlobalLayout: FC = ({ children }) => {
    return (
        <Layout>
            <CustomHeader />
            <Content>
                <Container>{children}</Container>
            </Content>
        </Layout>
    );
};

export { GlobalLayout };
