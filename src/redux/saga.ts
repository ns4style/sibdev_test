import { all } from "@redux-saga/core/effects";
import authSaga from "./auth/saga";
import schemasSaga from "./schemas/saga";
import errorsSaga from './serverErrors/saga';

export default function* rootSaga(getState) {
    yield all([authSaga(), schemasSaga(), errorsSaga()]);
}

export { rootSaga };
