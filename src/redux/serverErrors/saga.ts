import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { resetErrors, showErrors } from "./actions";
import { notificationError } from "../../helpers/notifications";
import { RootState } from "../index";
import { TServerError } from "../../types";

export function* showErrorsFn() {
    yield takeEvery(showErrors, function* (action) {
        const serverErrors: Array<TServerError> = yield select(
            (state: RootState) => state.serverErrors
        );
        if (serverErrors.length) {
            serverErrors.forEach((item) => {
                notificationError(item.msg);
            });
            yield put(resetErrors());
        }
    });
}

export default function* errorsSaga() {
    yield all([fork(showErrorsFn)]);
}
