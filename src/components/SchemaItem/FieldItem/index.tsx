import { FC } from "react";
import styled from "styled-components";
import { Label } from "../../Global/Label";

interface IProps {
    name: string;
    required?: boolean;
    short?: boolean;
}

const FieldItem: FC<IProps> = ({ children, name, required, short }) => {
    return (
        <FieldWrapper short={short}>
            <Label required={required}>{name}</Label>
            <div>{children}</div>
        </FieldWrapper>
    );
};

const FieldWrapper = styled.div`
    margin-bottom: 30px;
    width: ${(props) => (!props.short ? "100%" : "422px")};
`;

export { FieldItem };
