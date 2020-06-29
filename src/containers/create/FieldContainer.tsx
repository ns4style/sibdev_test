import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
    Field,
    FieldArray,
    WrappedFieldArrayProps,
    FormSection,
    formValueSelector,
} from "redux-form";
import { Collapse, Row, Col, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { TextInput } from "../../components/Inputs/TextInput";
import { FieldItem } from "../../components/SchemaItem/FieldItem";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { typeOptions } from "../../helpers/typeOptions";
import { CheckboxInput } from "../../components/Inputs/CheckboxInput";
import { useDispatch, useSelector } from "react-redux";
import { TFieldItem, TSchemaItem } from "../../types";
import { FIELD_TYPES } from "../../helpers/constants";
import { DeleteOutlined } from "@ant-design/icons";
import { removeTab, setTabs, toggleTab } from "../../redux/createTabs/actions";
import { RootState } from "../../redux";
import { PanelHeader } from "../../components/PanelHeader";

interface IProps {
    className?: string;
}

const { Panel } = Collapse;

const OptionsRender: FC<IProps & WrappedFieldArrayProps> = ({
    fields,
    className,
}) => {
    useEffect(() => {
        fields.push({});
        return () => {
            fields.removeAll();
        };
    }, []);

    function addOption() {
        fields.push({});
    }

    function removeOption(index) {
        fields.remove(index);
    }

    return (
        <div>
            {fields.map((member, index) => {
                return (
                    <div key={index} className={"optionBlock"}>
                        <hr />
                        <FieldItem
                            name={"Ключ опции"}
                            required={true}
                            short={true}
                        >
                            <Field
                                name={`${member}.key`}
                                type={"input"}
                                component={TextInput}
                                placeholder={"Введите ключ опции"}
                            />
                        </FieldItem>
                        <FieldItem
                            name={"Название опции"}
                            required={true}
                            short={true}
                        >
                            <Field
                                name={`${member}.value`}
                                type={"input"}
                                component={TextInput}
                                placeholder={"Введите название опции"}
                            />
                        </FieldItem>
                        {fields.length > 1 && (
                            <Button
                                type="primary"
                                onClick={() => removeOption(index)}
                                danger={true}
                                className={"removeButton"}
                                icon={<DeleteOutlined />}
                            />
                        )}
                    </div>
                );
            })}
            <Button type={"primary"} onClick={addOption}>
                Добавить опцию
            </Button>
        </div>
    );
};

const Component: FC<IProps & WrappedFieldArrayProps> = ({
    fields,
    className,
}) => {
    const activeKeys = useSelector((state: RootState) => state.createTabs);
    const dispatch = useDispatch();

    function onClickPanelHeader(index: string) {
        dispatch(toggleTab(index));
    }

    function removeField(index: number) {
        fields.remove(index);
        dispatch(removeTab(index.toString()));
    }

    const selector = formValueSelector("createForm");
    const fieldsValues: Array<TFieldItem> = useSelector((state) =>
        selector(state, "fields")
    );

    useEffect(() => {
        fields.push({ validation: {} });
        return () => {};
    }, []);

    return (
        <Collapse
            activeKey={activeKeys}
            bordered={false}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className={className}
        >
            {fields.length &&
                fields.map((member, index) => {
                    const isActive = !!activeKeys.find(
                        (key) => key === index.toString()
                    );
                    const isNumericType =
                        fieldsValues &&
                        fieldsValues[index].type === FIELD_TYPES.NUMERIC_TYPE;
                    const isSelectType =
                        fieldsValues &&
                        fieldsValues[index].type === FIELD_TYPES.SELECT_TYPE;
                    const isTextType =
                        (fieldsValues &&
                            fieldsValues[index].type ===
                                FIELD_TYPES.TEXT_TYPE) ||
                        fieldsValues[index].type === FIELD_TYPES.PASSWORD_TYPE;
                    const header = (
                        <PanelHeader
                            type={fieldsValues[index].type}
                            fieldKey={fieldsValues[index].key}
                            onClickHandler={() =>
                                onClickPanelHeader(index.toString())
                            }
                            isActive={isActive}
                            title={`Свойство ${index + 1}:`}
                        />
                    );
                    return (
                        <Panel
                            key={index}
                            header={header}
                            extra={
                                fields.length > 1 && (
                                    <DeleteOutlined
                                        style={{ fontSize: "2.4rem" }}
                                        onClick={() => removeField(index)}
                                    />
                                )
                            }
                        >
                            <Row>
                                <Col span={12}>
                                    <FieldItem
                                        name={"Ключ свойства"}
                                        required={true}
                                        short={true}
                                    >
                                        <Field
                                            name={`${member}.key`}
                                            type={"input"}
                                            component={TextInput}
                                            placeholder={
                                                "Введите ключ свойства"
                                            }
                                        />
                                    </FieldItem>
                                    <FieldItem
                                        name={"Название свойства"}
                                        required={true}
                                        short={true}
                                    >
                                        <Field
                                            name={`${member}.label`}
                                            type={"input"}
                                            component={TextInput}
                                            placeholder={
                                                "Введите название свойства"
                                            }
                                        />
                                    </FieldItem>
                                    <FieldItem
                                        name={"Поле для отображения"}
                                        required={true}
                                        short={true}
                                    >
                                        <Field
                                            name={`${member}.type`}
                                            type={"input"}
                                            component={SelectInput}
                                            placeholder={
                                                "Выберите поле для отображения"
                                            }
                                            options={typeOptions}
                                        />
                                    </FieldItem>
                                    {isSelectType && (
                                        <FieldArray
                                            name={`${member}.options`}
                                            component={OptionsRender}
                                            props={{}}
                                        />
                                    )}
                                </Col>
                                <Col span={12}>
                                    <FormSection name={`${member}.validation`}>
                                        <FieldItem
                                            name={"Обязательно для заполнения"}
                                        >
                                            <Field
                                                name={`required`}
                                                type={"checkbox"}
                                                component={CheckboxInput}
                                            />
                                        </FieldItem>
                                        {isNumericType && (
                                            <>
                                                <FieldItem
                                                    name={
                                                        "Минимальное значение"
                                                    }
                                                    short={true}
                                                >
                                                    <Field
                                                        name={`minNum`}
                                                        type={"input"}
                                                        component={TextInput}
                                                        placeholder={
                                                            "Введите минимальное значение"
                                                        }
                                                    />
                                                </FieldItem>
                                                <FieldItem
                                                    name={
                                                        "Максимальное значение"
                                                    }
                                                    short={true}
                                                >
                                                    <Field
                                                        name={`maxNum`}
                                                        type={"input"}
                                                        component={TextInput}
                                                        placeholder={
                                                            "Введите максимальное значение"
                                                        }
                                                    />
                                                </FieldItem>
                                            </>
                                        )}
                                        {isTextType && (
                                            <>
                                                <FieldItem
                                                    name={"Минимальная длина"}
                                                    short={true}
                                                >
                                                    <Field
                                                        name={`minLen`}
                                                        type={"input"}
                                                        component={TextInput}
                                                        placeholder={
                                                            "Введите минимальную длину"
                                                        }
                                                    />
                                                </FieldItem>
                                                <FieldItem
                                                    name={"Максимальная длина"}
                                                    short={true}
                                                >
                                                    <Field
                                                        name={`maxLen`}
                                                        type={"input"}
                                                        component={TextInput}
                                                        placeholder={
                                                            "Введите максимальную длину"
                                                        }
                                                    />
                                                </FieldItem>
                                                <FieldItem
                                                    name={"Паттерн"}
                                                    short={true}
                                                >
                                                    <Field
                                                        name={`pattern`}
                                                        type={"input"}
                                                        component={TextInput}
                                                        placeholder={
                                                            "Введите паттерн"
                                                        }
                                                    />
                                                </FieldItem>
                                            </>
                                        )}
                                    </FormSection>
                                </Col>
                            </Row>
                        </Panel>
                    );
                })}
        </Collapse>
    );
};

const FieldContainer = styled(Component)`
    background-color: transparent;
    margin-bottom: 20px;
    position: relative;

    .ant-collapse-item {
        background-color: transparent;
        border: none;
        transition: background-color 0.3s 0.3s ease;
    }

    .ant-collapse-item-active {
        background-color: white;
        border-radius: 5px;
        border: 1px solid rgba(23, 23, 25, 0.2);
    }

    .optionBlock {
        position: relative;
    }

    .removeButton {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

export { FieldContainer };
