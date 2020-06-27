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

interface IProps {
    fields: Array<TFieldItem>;
}

const generateField = (type: string) => {
    switch (type) {
        case "0": {
            return NumberInput;
        }
        case "1": {
            return TextInput;
        }
        case "2": {
            return PasswordInput;
        }
        case "4": {
            return CheckboxInput;
        }
        case "5": {
            return SelectInput;
        }
        default: {
            return "input";
        }
    }
};

const generateFieldType = (type: string) => {
    if (type === "4") {
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
                            component={generateField(field.type)}
                            props={{
                                options: field.options,
                            }}
                        />
                    </FieldItem>
                );
            })}
        </div>
    );
};

export { FieldsGenerator };
