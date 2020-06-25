import { FC } from "react";
import styled from "styled-components";

interface IProps {
    inputId: string;
    label?: string;
}

const StyledLabel = styled.label`
    font-size: 1.6rem;
    line-height: 1.375;
    color: rgba(23, 23, 25, 0.3);
`;

const LoginField: FC<IProps> = ({ inputId, label, children }) => {
    return (
        <>
            <StyledLabel htmlFor={inputId}>{label}</StyledLabel>
            {children}
        </>
    );
};

export { LoginField };
