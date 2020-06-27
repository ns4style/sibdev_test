import { FC } from "react";
import { Layout, Menu } from "antd";
import { Container } from "../Container";
import styled from "styled-components";
import { LoginLogo } from "../../Login/LoginLogo";
import { useSelector } from "../../../redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/actions";

interface IProps {
    className: string;
}

const { Header } = Layout;

const Component: FC<IProps> = ({ className }) => {
    return (
        <Header className={className}>
            <Container>
                <MenuWrapper>
                    <LoginLogo
                        src={"/logo.svg"}
                        width={"48px"}
                        height={"48px"}
                    />
                    <CustomMenu />
                    <LogoutItem />
                </MenuWrapper>
            </Container>
        </Header>
    );
};

const ComponentMenu: FC<IProps> = ({ className }) => {
    const selectedKeys = useSelector((state) => state.menu.selectedKeys);
    return (
        <Menu
            className={className}
            theme="light"
            mode="horizontal"
            selectedKeys={selectedKeys}
        >
            <Menu.Item key="schemas">
                <Link href={"/schemas"} prefetch={false}>
                    <a>Мои схемы</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="create">
                <Link href={"/create"} prefetch={false}>
                    <a>Создать схему</a>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

const LogoutItemComponent: FC<IProps> = ({ className }) => {
    const dispatch = useDispatch();

    function onClickHandler() {
        dispatch(logout());
    }

    return (
        <Menu className={className} theme="light" mode="horizontal">
            <Menu.Item onClick={onClickHandler}>Выход</Menu.Item>
        </Menu>
    );
};

const LogoutItem = styled(LogoutItemComponent)`
    margin-left: auto;
    background-color: transparent;
    border: none;
`;

const CustomMenu = styled(ComponentMenu)`
    background-color: transparent;
    border: none;
`;

const CustomHeader = styled(Component)`
    width: 100%;
    position: fixed;
    z-index: 1;
    background-color: white;
`;

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export { CustomHeader };
