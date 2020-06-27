import { TFieldItem, TValidationItem } from "../types";

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

const allValidationsHandlers = {
    required: (value, _) => required(value),
    minLen: minLen,
    maxLen: maxLen,
    pattern: pattern,
    minNum: minNum,
    maxNum: maxNum,
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
            const result = validateFn(values[field.key]);
            if (result) {
                errors[field.key] = result;
                break;
            }
        }
    });

    return errors;
};

export { required, generateValidation };
