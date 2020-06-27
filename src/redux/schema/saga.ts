import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { loadSchema } from "./actions";
import axios, { AxiosResponse } from "axios";
import { apiUrls } from "../../helpers/apiUrls";
import { END } from "redux-saga";
import { RootState } from "../index";
import { TSchemaItem } from "../../types";
import { addError } from "../serverErrors/actions";

export function* schemaRequest() {
    yield takeEvery(loadSchema.request, function* (action) {
        try {
            const state: RootState = yield select();
            const answer: AxiosResponse<TSchemaItem> = yield axios.get(
                apiUrls.schemaUrlById(action.payload),
                {
                    headers: {
                        Authorization: `bearer ${state.auth.access_token}`,
                    },
                }
            );
            const data = answer.data;
            if (data) {
                yield put(loadSchema.success(data));
            } else {
                yield put(loadSchema.failure(Error()));
            }
        } catch (e) {
            yield put(loadSchema.failure(e));
        }
        yield put(END);
    });
}

export function* schemaFailed() {
    yield takeEvery(loadSchema.failure, function* (action) {
        yield put(
            addError({
                msg: action.payload.message || "Ошибка загрузки",
            })
        );
    });
}

export default function* schemaSaga() {
    yield all([fork(schemaRequest), fork(schemaFailed)]);
}
