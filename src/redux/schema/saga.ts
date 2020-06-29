import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { downloadSchema, loadSchema } from "./actions";
import axios, { AxiosResponse } from "axios";
import { apiUrls } from "../../helpers/apiUrls";
import { END } from "redux-saga";
import { RootState } from "../index";
import { TSchemaItem } from "../../types";
import { addError } from "../serverErrors/actions";
import {
    notificationError,
    notificationSuccess,
} from "../../helpers/notifications";

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

export function* schemaRequestDownload() {
    yield takeEvery(downloadSchema.request, function* (action) {
        try {
            const state: RootState = yield select();
            const answer: AxiosResponse<any> = yield axios.post(
                apiUrls.schemasListUrl,
                { schema: action.payload },
                {
                    headers: {
                        Authorization: `bearer ${state.auth.access_token}`,
                    },
                }
            );
            console.log(answer);
            const data = answer.data;
            if (data) {
                yield put(downloadSchema.success(data));
            } else {
                yield put(downloadSchema.failure(Error()));
            }
        } catch (e) {
            yield put(downloadSchema.failure(e));
        }
        yield put(END);
    });
}

export function* downloadSchemaFailed() {
    yield takeEvery(downloadSchema.failure, function* (action) {
        notificationError(action.payload.message || "Ошибка загрузки");
    });
}

export function* downloadSchemaSuccess() {
    yield takeEvery(downloadSchema.success, function* (action) {
        console.log("success");
        notificationSuccess("Схема создана успешно");
    });
}

export function* schemaFailed() {
    yield takeEvery(downloadSchema.failure, function* (action) {
        yield put(
            addError({
                msg: action.payload.message || "Ошибка загрузки",
            })
        );
    });
}

export default function* schemaSaga() {
    yield all([
        fork(schemaRequest),
        fork(schemaFailed),
        fork(schemaRequestDownload),
        fork(downloadSchemaFailed),
        fork(downloadSchemaSuccess),
    ]);
}
