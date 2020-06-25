import { createReducer } from "typesafe-actions";
import { getSelectedKeys } from "../../helpers/menu";
import { changeLocation } from "./actions";

type State = {
    selectedKeys: Array<string>;
};

const initialState: State = {
    selectedKeys: [],
};

const reducer = createReducer<State>(initialState).handleAction(
    changeLocation,
    (state, action) => {
        return {
            state,
            selectedKeys: getSelectedKeys(action.payload.location.pathname),
        };
    }
);

export { reducer as menuReducer };
