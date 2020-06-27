import { createReducer } from "typesafe-actions";
import { TSchemaItem } from "../../types";
import { loadSchemas } from "./actions";

type SchemasState = Array<TSchemaItem>;

const initialState: SchemasState = [];

const reducer = createReducer(initialState).handleAction(
    loadSchemas.success,
    (state, action) => {
        return [...action.payload];
    }
);

export { reducer as schemasReducer };
