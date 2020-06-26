import { FC } from "react";
import { Layout } from "antd";
import { Container, CustomHeader } from "../";
import { CustomContent } from "../CustomContent";

const { Content } = Layout;

const GlobalLayout: FC = ({ children }) => {
    return (
        <Layout style={{ backgroundColor: "transparent" }}>
            <CustomHeader />
            <Content>
                <CustomContent>
                    <Container>{children}</Container>
                </CustomContent>
            </Content>
        </Layout>
    );
};

export { GlobalLayout };
