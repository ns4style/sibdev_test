import { createReducer } from "typesafe-actions";
import { TServerError } from "../../types";
import { addError, resetErrors } from "./actions";

type State = Array<TServerError>;

const initialState: State = [];

const reducer = createReducer(initialState)
    .handleAction(addError, (state, action) => {
        return [...state, action.payload];
    })
    .handleAction(resetErrors, (state) => {
        return [];
    });

export { reducer as serverErrorsReducer };
