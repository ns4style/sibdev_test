import { FC } from "react";
import { Typography, Button } from "antd";
import {
    Field,
    FieldArray,
    InjectedFormProps,
    reduxForm,
    SubmissionError,
} from "redux-form";
import { FieldItem } from "../../components/SchemaItem/FieldItem";
import { TextInput } from "../../components/Inputs/TextInput";
import { FieldContainer } from "./FieldContainer";
import styled from "styled-components";
import { validateCreateSchema } from "../../helpers/validations";
import { CREATE_SCHEMA_VALIDATION } from "../../helpers/createSchema";
import { useDispatch } from "react-redux";
import { checkResult } from "../../helpers/checkResult";
import { downloadSchema } from "../../redux/schema/actions";

const { Title } = Typography;

const Component: FC<InjectedFormProps & {}> = ({ array, handleSubmit }) => {
    const dispatch = useDispatch();

    function addField() {
        array.push("fields", {});
    }

    async function onSubmit(values) {
        const result = await validateCreateSchema(
            CREATE_SCHEMA_VALIDATION,
            values
        );
        if (checkResult(result)) {
            throw new SubmissionError(result);
        } else {
            dispatch(downloadSchema.request(values));
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title level={2} style={{ marginBottom: "40px" }}>
                Новая схема
            </Title>

            <FieldItem name={"Название"} required={true} short={true}>
                <Field
                    name={"name"}
                    type={"input"}
                    component={TextInput}
                    placeholder={"Введите название"}
                />
            </FieldItem>
            <hr />
            <Title
                level={2}
                style={{ marginTop: "40px", marginBottom: "20px" }}
            >
                Свойства схемы
            </Title>
            <Title level={4} style={{ marginBottom: "20px" }}>
                Схема должна содержать хотя бы одно свойство
            </Title>
            <FieldArray name={"fields"} component={FieldContainer} />
            <ButtonsWrapper>
                <Button type={"primary"} onClick={addField}>
                    Добавить новое свойство
                </Button>
                <Button type={"primary"} htmlType={"submit"}>
                    Сохранить схему
                </Button>
            </ButtonsWrapper>
        </form>
    );
};

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
`;

const CreateContainer = reduxForm({
    form: "createForm",
})(Component as any);

export { CreateContainer };
