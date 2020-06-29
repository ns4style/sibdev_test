import React, { FC } from "react";
import { Typography, Row, Col, Button } from "antd";
import { useSelector } from "../../redux";
import { TSchemaItem } from "../../types";
import styled from "styled-components";
import { FieldsGenerator } from "./FieldsGenerator";
import { InjectedFormProps, reduxForm, SubmissionError } from "redux-form";
import { validate } from "../../helpers/validations";
import { ResultItem } from "../../components/SchemaItem/ResultItem";

const { Title } = Typography;

const Component: FC<InjectedFormProps> = ({
    handleSubmit,
    submitFailed,
    submitSucceeded,
}) => {
    let data = useSelector(
        (state) => (state.schema.schema as TSchemaItem).schema
    );
    if (!data) {
        return null;
    }

    async function onSubmit(values) {
        const result = await validate(data.fields, values);
        if (!!Object.keys(result).length) {
            throw new SubmissionError(result);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title
                level={2}
                style={{ marginBottom: "40px", paddingLeft: "36px" }}
            >
                {data.name}
            </Title>
            <Row>
                <Col span={12}>
                    <div style={{ paddingLeft: "36px" }}>
                        <FieldsGenerator fields={data.fields} />
                        <Button
                            htmlType="submit"
                            type="primary"
                            block={true}
                            size={"large"}
                        >
                            Валидация
                        </Button>
                        <ResultItem
                            submitFailed={submitFailed}
                            submitSucceeded={submitSucceeded}
                        />
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

const Form = styled.form`
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(23, 23, 25, 0.2);
    padding: 36px 0;
`;

const ViewContainer = reduxForm({
    form: "viewForm",
})(Component);

export { ViewContainer };
