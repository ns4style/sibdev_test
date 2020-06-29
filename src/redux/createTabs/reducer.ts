import { createReducer } from "typesafe-actions";
import { removeTab, resetTabs, setTabs, toggleTab } from "./actions";

type AuthState = Array<string>;

const initialState: AuthState = ["0"];

const reducer = createReducer(initialState)
    .handleAction(setTabs, (state, action) => [...action.payload])
    .handleAction(resetTabs, () => [...initialState])
    .handleAction(toggleTab, (state, action) => {
        const index = action.payload;
        const find = state.indexOf(index);
        if (~find) {
            return [
                ...state.slice(0, find),
                ...state.slice(find + 1, state.length),
            ];
        }
        return [...state, action.payload];
    })
    .handleAction(removeTab, (state, action) => {
        return [
            ...state
                .filter((item) => item !== action.payload)
                .map((item) => {
                    const parsed = parseInt(item);
                    const removedTab = parseInt(action.payload);
                    if (parsed > removedTab) {
                        return (parsed - 1).toString();
                    }
                    return item;
                }),
        ];
    });
export { reducer as createTabsReducer };
