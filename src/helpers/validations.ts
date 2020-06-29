import { TFieldItem, TValidationItem } from "../types";
import { TCreateSchemaField } from "./createSchema";

const required = (value: any) => (value ? false : "Required");

const minLen = (value: string | undefined, minLen: number) =>
    value && value.length >= minLen
        ? false
        : `Минимальная длина не меньше ${minLen}`;

const maxLen = (value: string | undefined, maxLen: number) =>
    value && value.length <= maxLen
        ? false
        : `Максимальная длина не больше ${maxLen}`;

const pattern = (value: string | undefined, pattern: RegExp) =>
    value && !!value.match(pattern)
        ? false
        : `Не соответствует паттерну ${pattern}`;

const minNum = (value: string | undefined, minValue: string) =>
    value && parseInt(value) >= parseInt(minValue)
        ? false
        : `Минимальное значение не меньше ${minValue}`;

const maxNum = (value: string | undefined, maxValue: string) =>
    value && parseInt(value) <= parseInt(maxValue)
        ? false
        : `Максимальное значение не больше ${maxValue}`;

const unique = (value: string, key: string, fields: Array<any>) => {
    return value &&
        key &&
        Array.isArray(fields) &&
        fields.filter((item) => item[key] === value).length === 1
        ? false
        : "Должно быть уникальным";
};

const allValidationsHandlers = {
    required: ({ value }, _) => required(value),
    minLen: ({ value }, minLenValue) => minLen(value, minLenValue),
    maxLen: ({ value }, maxLenValue) => maxLen(value, maxLenValue),
    pattern: ({ value }, patternValue) => pattern(value, patternValue),
    minNum: ({ value }, minNumValue) => minNum(value, minNumValue),
    maxNum: ({ value }, maxNumValue) => maxNum(value, maxNumValue),
    unique: ({ value, key, fields }, _) => unique(value, key, fields),
};

const generateValidation = (validations: TValidationItem) => {
    const validationHandlers = [];
    for (let rule in validations) {
        if (allValidationsHandlers[rule]) {
            validationHandlers.push((value) =>
                allValidationsHandlers[rule](value, validations[rule])
            );
        }
    }

    return validationHandlers;
};

export const validate = async (schema: Array<TFieldItem>, values: any) => {
    const errors = {};
    schema.forEach((field) => {
        const fieldValidation = generateValidation(field.validation);
        for (let validateFn of fieldValidation) {
            const result = validateFn({ value: values[field.key] });
            if (result) {
                errors[field.key] = result;
                break;
            }
        }
    });

    return errors;
};

export const validateCreateSchema = (
    fields: Array<TCreateSchemaField>,
    values: any,
    valuesArray?: Array<any> | undefined
) => {
    const errors = {};
    for (const field of fields) {
        if (field.validation) {
            const fieldValidation = generateValidation(field.validation);
            for (let validateFn of fieldValidation) {
                const result = validateFn({
                    value: values[field.key],
                    key: field.key,
                    fields: valuesArray,
                });
                if (result) {
                    errors[field.key] = result;
                    break;
                }
            }
        }
        if (field.fields && values[field.key]) {
            errors[field.key] = values[field.key].map((fieldSet) => {
                return validateCreateSchema(
                    field.fields,
                    fieldSet,
                    values[field.key]
                );
            });
        }
    }
    return errors;
};

export { required, generateValidation };
