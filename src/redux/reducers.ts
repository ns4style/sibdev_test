import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { menuReducer } from "./menu/reducer";
import { schemasReducer } from "./schemas/reducer";
import { schemaReducer } from "./schema/reducer";
import { serverErrorsReducer } from "./serverErrors/reducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "connected-next-router";

export const combinedReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    router: routerReducer,
    menu: menuReducer,
    schemas: schemasReducer,
    serverErrors: serverErrorsReducer,
    schema: schemaReducer,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (typeof window !== "undefined" && state?.router) {
            nextState.router = state.router;
        }
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export { reducer };
