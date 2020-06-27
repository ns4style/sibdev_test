import styled from "styled-components";
import { FC } from "react";
import { TSchemaItem } from "../../../types";
import { Button } from "antd";

interface IProps {
    data: TSchemaItem;
}

const SchemaItem: FC<IProps> = ({ data }) => {
    return (
        <SchemaItemWrapper>
            <span style={{lineHeight : 1}}>{data.schema.name}</span>
            <ButtonsWrapper>
                <Button type="link">Просмотреть</Button>
            </ButtonsWrapper>
        </SchemaItemWrapper>
    );
};

const ButtonsWrapper = styled.div`
    opacity : 0;
    transition : opacity .3s ease;
`;

const SchemaItemWrapper = styled.div`
    width: 100%;
    padding: 14px 20px;
    background-color: white;
    cursor: pointer;
    border: 1px solid rgba(23, 23, 25, 0.2);
    display: flex;
    justify-content: space-between;
    align-items : center;
    &:not(:first-child) {
        border-top: none;
    }
    &:first-child {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    &:last-child {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    
    &:hover {
        ${ButtonsWrapper} {
            opacity : 1
        }
    }
`;

export { SchemaItem };
