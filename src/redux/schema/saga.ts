import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { deleteSchema, downloadSchema, loadSchema } from "./actions";
import axios, { AxiosResponse } from "axios";
import { apiUrls } from "../../helpers/apiUrls";
import { RootState } from "../index";
import { TSchemaItem } from "../../types";
import { addError } from "../serverErrors/actions";
import {
    notificationError,
    notificationSuccess,
} from "../../helpers/notifications";
import { loadSchemas } from "../schemas/actions";
import {END} from "redux-saga";

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

        if (typeof window === "undefined") {
            yield put(END);
        }
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
            const data = answer.data;
            if (data) {
                yield put(downloadSchema.success(data));
            } else {
                yield put(downloadSchema.failure(Error()));
            }
        } catch (e) {
            yield put(downloadSchema.failure(e));
        }
    });
}

export function* schemaDelete() {
    yield takeEvery(deleteSchema.request, function* (action) {
        try {
            const state: RootState = yield select();
            const answer: AxiosResponse<TSchemaItem> = yield axios.delete(
                apiUrls.schemaUrlById(action.payload),
                {
                    headers: {
                        Authorization: `bearer ${state.auth.access_token}`,
                    },
                }
            );
            const data = answer.data;
            if (data) {
                yield put(deleteSchema.success(data));
            } else {
                yield put(deleteSchema.failure(Error()));
            }
        } catch (e) {
            yield put(deleteSchema.failure(e));
        }
    });
}

export function* downloadSchemaFailed() {
    yield takeEvery(downloadSchema.failure, function* (action) {
        notificationError(action.payload.message || "Ошибка загрузки");
    });
}

export function* downloadSchemaSuccess() {
    yield takeEvery(downloadSchema.success, function* (action) {
        notificationSuccess("Схема создана успешно");
    });
}

export function* deleteSchemaFailed() {
    yield takeEvery(deleteSchema.failure, function* (action) {
        notificationError(action.payload.message || "Ошибка удаления");
    });
}

export function* deleteSchemaSuccess() {
    yield takeEvery(deleteSchema.success, function* (action) {
        notificationSuccess("Схема удалена успешно");
        yield put(loadSchemas.request());
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
    yield all([
        fork(schemaRequest),
        fork(schemaFailed),
        fork(schemaRequestDownload),
        fork(downloadSchemaFailed),
        fork(downloadSchemaSuccess),
        fork(deleteSchemaFailed),
        fork(deleteSchemaSuccess),
        fork(schemaDelete),
    ]);
}
