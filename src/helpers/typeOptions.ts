import { FIELD_TYPES } from "./constants";

type TypeOption = {
    key: string;
    value: string;
};

const typeOptions: Array<TypeOption> = [
    {
        key: FIELD_TYPES.NUMERIC_TYPE,
        value: "Числовое поле",
    },
    {
        key: FIELD_TYPES.TEXT_TYPE,
        value: "Текстовое поле",
    },
    {
        key: FIELD_TYPES.PASSWORD_TYPE,
        value: "Пароль",
    },
    {
        key: FIELD_TYPES.PHONE_TYPE,
        value: "Телефон",
    },
    {
        key: FIELD_TYPES.CHECKBOX_TYPE,
        value: "Чекбокс",
    },
    {
        key: FIELD_TYPES.SELECT_TYPE,
        value: "Выпадающий список",
    },
];

export { typeOptions };
