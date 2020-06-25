import { FC } from "react";
import { LoginForm } from "../../components/Login/LoginForm";
import { LoginLogo } from "../../components/Login/LoginLogo";
import styled from "styled-components";
import { Typography } from "antd";
import { LoginInput } from "./LoginInput";
import { PasswordInput } from "./PasswordInput";
import { ButtonContainer } from "./ButtonContainer";
import { reduxForm, InjectedFormProps } from "redux-form";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/auth/actions";

const { Title } = Typography;

interface IProps {}

const LogoWrapper = styled.div`
    margin-bottom: 3.2rem;
`;

const MBWrapper = styled.div`
    margin-bottom: 2rem;
`;

const LoginInputFieldWrapper = styled.div`
    width: 100%;
    margin-bottom: 2rem;
`;

const PasswordInputFieldWrapper = styled.div`
    width: 100%;
    margin-bottom: 4rem;
`;

const Component: FC<IProps & InjectedFormProps> = ({
    handleSubmit,
    submitting,
}) => {
    const dispatch = useDispatch();

    function onSubmit(data) {
        dispatch(loginAsync.request(data));
    }

    return (
        <>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <LogoWrapper>
                    <LoginLogo src={"/logo.svg"} />
                </LogoWrapper>
                <MBWrapper>
                    <Title level={4}>Вход</Title>
                </MBWrapper>
                <LoginInputFieldWrapper>
                    <LoginInput />
                </LoginInputFieldWrapper>
                <PasswordInputFieldWrapper>
                    <PasswordInput />
                </PasswordInputFieldWrapper>
                <ButtonContainer></ButtonContainer>
            </LoginForm>
        </>
    );
};

const LoginContainer = reduxForm({
    form: "login",
})(Component);

export { LoginContainer };
