import { Button } from "antd";
import { FC } from "react";
import styled from "styled-components";

const StyledButtonWrapper = styled.div`
    width: 180px;
`;

const ButtonContainer: FC = () => {
    return (
        <StyledButtonWrapper>
            <Button htmlType="submit" type="primary" block={true} size="large">
                Войти
            </Button>
        </StyledButtonWrapper>
    );
};

export { ButtonContainer };
