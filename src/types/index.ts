export type TSchemaItem = {
    id: number;
    schema: {
        id: number;
        name: string;
        fields: Array<TFieldItem>;
    };
};

export type TFieldItem = {
    key: string;
    label: string;
    type: string;
    options: Array<TOptionsItem>;
    validation: Array<TValidationItem>;
};

export type TOptionsItem = {
    key: string;
    value: string;
};

export type TValidationItem = {
    required?: boolean;
    minNum?: string;
    maxNum?: string;
    maxLen?: string;
    minLen?: string;
    pattern?: string;
};

export type TServerError = {
    msg : string
}
