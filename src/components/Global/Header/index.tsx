import { FC } from "react";
import { Layout, Menu } from "antd";
import { Container } from "../Container";
import styled from "styled-components";
import { LoginLogo } from "../../Login/LoginLogo";
import {useSelector} from "react-redux";

interface IProps {
    className: string;
}

const { Header } = Layout;

const Component: FC<IProps> = ({ className }) => {
    return (
        <Header className={className}>
            <Container>
                <MenuWrapper>
                    <LoginLogo src={"/logo.svg"} width={"48px"} height={"48px"} />
                    <CustomMenu/>
                </MenuWrapper>
            </Container>
        </Header>
    );
};

const ComponentMenu: FC<IProps> = ({ className }) => {
    //@ts-ignore
    const selectedKeys = useSelector(state => state.menu.selectedKeys)
    console.log(selectedKeys);
    return (
        <Menu className={className} theme="light" mode="horizontal" selectedKeys={["1"]}>
            <Menu.Item key="1">Мои схемы</Menu.Item>
            <Menu.Item key="2">Создать схему</Menu.Item>
        </Menu>
    );
};

const CustomMenu = styled(ComponentMenu)`
    background-color : transparent;
`;

const CustomHeader = styled(Component)`
    width: 100%;
    position : fixed;
    z-index: 1;
    background-color: white;
`;

const MenuWrapper = styled.div`
    display : flex;
    align-items: center;
    maxHeight : 100%;
`;

export { CustomHeader };
