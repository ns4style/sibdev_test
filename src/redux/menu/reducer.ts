import { createReducer } from "typesafe-actions";
import { getSelectedKeys } from "../../helpers/menu";
import { changeLocation, menuInit } from "./actions";

type MenuState = {
    selectedKeys: Array<string>;
};

const initialState: MenuState = {
    selectedKeys: [],
};

const reducer = createReducer(initialState)
    .handleAction(changeLocation, (state, action) => {
        return {
            ...state,
            selectedKeys: getSelectedKeys(action.payload.location.pathname),
        };
    })
    .handleAction(menuInit, (state, action) => {
        return {
            ...state,
            selectedKeys: getSelectedKeys(action.payload),
        };
    });

export { reducer as menuReducer };
