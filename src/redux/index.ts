import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { combinedReducer, reducer } from "./reducers";
import { rootSaga } from "./saga";
import {
    createRouterMiddleware,
    initialRouterState,
} from "connected-next-router";
import { AppContext } from "next/app";
import Router from "next/router";

import { format } from "url";
import {
    TypedUseSelectorHook,
    useSelector as useReduxSelector,
} from "react-redux";

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore: MakeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware();
    const routerMiddleware = createRouterMiddleware();
    const { asPath, pathname, query } =
        (context as AppContext).ctx || Router.router || {};
    let initialState = {};
    if (asPath) {
        const url = format({ pathname, query });
        initialState = {
            router: initialRouterState(url, asPath),
        };
    }
    const store = createStore(
        reducer,
        initialState,
        bindMiddleware([sagaMiddleware, routerMiddleware])
    );
    (store as any).sagaTask = sagaMiddleware.run(rootSaga, {});

    return store;
};

export type RootState = ReturnType<typeof combinedReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const wrapper = createWrapper(makeStore, { debug: true });
