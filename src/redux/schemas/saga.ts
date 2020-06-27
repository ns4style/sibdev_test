import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { loadSchemas } from "./actions";
import axios, { AxiosResponse } from "axios";
import { apiUrls } from "../../helpers/apiUrls";
import {END} from "redux-saga";
import { RootState } from "../index";
import { TSchemaItem } from "../../types";
import { addError } from "../serverErrors/actions";

export function* schemasRequest() {
    yield takeEvery(loadSchemas.request, function* (action) {
        try {
            const state: RootState = yield select();
            const answer: AxiosResponse<Array<TSchemaItem>> = yield axios.get(
                apiUrls.schemasListUrl,
                {
                    headers: {
                        Authorization: `bearer ${state.auth.access_token}`,
                    },
                }
            );
            const data = answer.data;
            if (Array.isArray(data)) {
                yield put(loadSchemas.success(data));
            } else {
                yield put(loadSchemas.failure(Error()));
            }
        } catch (e) {
            yield put(loadSchemas.failure(e));
        }
        yield put(END);
    });
}

export function* schemasFailed() {
    yield takeEvery(loadSchemas.failure, function* (action) {
        yield put(
            addError({
                msg: action.payload.message || "Ошибка загрузки",
            })
        );
    });
}

export default function* schemasSaga() {
    yield all([fork(schemasRequest), fork(schemasFailed)]);
}
