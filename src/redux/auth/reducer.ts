import { createReducer } from "typesafe-actions";
import { initToken, resetToken } from "./actions";

type AuthState = {
    access_token: string | null;
};

const initialState: AuthState = {
    access_token: null,
};

const reducer = createReducer(initialState)
    .handleAction(initToken, (state, action) => ({
        ...state,
        access_token: action.payload,
    }))
    .handleAction(resetToken, (state) => ({
        ...state,
        access_token: null,
    }));

export { reducer as authReducer };
