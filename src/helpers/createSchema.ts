const CREATE_SCHEMA_VALIDATION: Array<TCreateSchemaField> = [
    {
        key: "name",
        validation: {
            required: true,
        },
    },
    {
        key: "fields",
        fields: [
            {
                key: "key",
                validation: {
                    required: true,
                    unique: true,
                },
            },
            {
                key: "label",
                validation: {
                    required: true,
                },
            },
            {
                key: "type",
                validation: {
                    required: true,
                },
            },
            {
                key: "options",
                fields: [
                    {
                        key: "key",
                        validation: {
                            required: true,
                            unique: true,
                        },
                    },
                    {
                        key: "value",
                        validation: {
                            required: true,
                        },
                    },
                ],
            },
        ],
    },
];

export type TCreateSchemaField = {
    key: string;
    validation?: any;
    fields?: Array<TCreateSchemaField>;
};

export { CREATE_SCHEMA_VALIDATION };
