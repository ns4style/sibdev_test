import { FC } from "react";
import { Typography } from "antd";
import { SchemaList } from "../../components/SchemaList/SchemaList";
import { useSelector } from "../../redux";

const { Title } = Typography;

const SchemasContainer: FC = () => {
    const schemasList = useSelector((state) => state.schemas);
    return (
        <div>
            <Title level={2} style={{ marginBottom: "40px" }}>
                Мои схемы
            </Title>
            <SchemaList schemas={schemasList} />
        </div>
    );
};

export { SchemasContainer };
