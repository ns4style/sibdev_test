import { FC } from "react";
import styled from "styled-components";
import { TSchemaItem } from "../../../types";
import { SchemaItem } from "../SchemaItem";

interface IProps {
    schemas: Array<TSchemaItem>;
}

const SchemaList: FC<IProps> = ({ schemas }) => {
    return (
        <List>
            {schemas.map((item) => {
                return <SchemaItem key={item.id} data={item} />;
            })}
        </List>
    );
};

const List = styled.div``;

export { SchemaList };
