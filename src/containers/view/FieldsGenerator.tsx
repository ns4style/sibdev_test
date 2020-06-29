import { FC } from "react";
import { TFieldItem } from "../../types";
import { FieldItem } from "../../components/SchemaItem/FieldItem";
import { Field } from "redux-form";
import { generateValidation } from "../../helpers/validations";
import { TextInput } from "../../components/Inputs/TextInput";
import { PasswordInput } from "../../components/Inputs/PasswordInput";
import { NumberInput } from "../../components/Inputs/NumberInput";
import { CheckboxInput } from "../../components/Inputs/CheckboxInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { FIELD_TYPES } from "../../helpers/constants";

interface IProps {
    fields: Array<TFieldItem>;
}

const generateField = (type: string) => {
    switch (type) {
        case FIELD_TYPES.NUMERIC_TYPE: {
            return NumberInput;
        }
        case FIELD_TYPES.TEXT_TYPE: {
            return TextInput;
        }
        case FIELD_TYPES.PASSWORD_TYPE: {
            return PasswordInput;
        }
        case FIELD_TYPES.PHONE_TYPE: {
            return TextInput;
        }
        case FIELD_TYPES.CHECKBOX_TYPE: {
            return CheckboxInput;
        }
        case FIELD_TYPES.SELECT_TYPE: {
            return SelectInput;
        }
        default: {
            return "input";
        }
    }
};

const generateFieldType = (type: string) => {
    if (type === FIELD_TYPES.CHECKBOX_TYPE) {
        return "checkbox";
    }
    return "input";
};

const FieldsGenerator: FC<IProps> = ({ fields }) => {
    return (
        <div>
            {fields.map((field) => {
                return (
                    <FieldItem
                        key={field.key}
                        name={field.label}
                        required={field.validation.required}
                    >
                        <Field
                            name={field.key}
                            type={generateFieldType(field.type)}
                            placeholder={`Введите ${field.label.toLowerCase()}`}
                            component={generateField(field.type)}
                            options={field.options}
                        />
                    </FieldItem>
                );
            })}
        </div>
    );
};

export { FieldsGenerator };
