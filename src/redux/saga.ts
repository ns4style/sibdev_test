import { all } from "@redux-saga/core/effects";
import authSaga from "./auth/saga";

export default function* rootSaga(getState) {
    yield all([authSaga()]);
}

export { rootSaga };
