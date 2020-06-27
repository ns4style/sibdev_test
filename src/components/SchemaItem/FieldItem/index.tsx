import { FC } from "react";
import styled from "styled-components";
import { Label } from "../../Global/Label";

interface IProps {
    name: string;
    required?: boolean;
}

const FieldItem: FC<IProps> = ({ children, name, required }) => {
    return (
        <FieldWrapper>
            <Label required={required}>{name}</Label>
            <div>{children}</div>
        </FieldWrapper>
    );
};

const FieldWrapper = styled.div`
    margin-bottom: 30px;
`;

export { FieldItem };
