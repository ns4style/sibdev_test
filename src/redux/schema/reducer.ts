import { createReducer } from "typesafe-actions";
import { TSchemaItem } from "../../types";
import { loadSchema } from "./actions";

type SchemaState = {
    schema: TSchemaItem | {};
};

const initialState: SchemaState = {
    schema: {},
};

const reducer = createReducer(initialState).handleAction(
    loadSchema.success,
    (state, action) => {
        return {
            ...state,
            schema: action.payload,
        };
    }
);

export { reducer as schemaReducer };
