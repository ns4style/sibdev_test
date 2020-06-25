import { all, takeEvery, put, fork } from "redux-saga/effects";
import {initToken, loginAsync} from "./actions";
import axios, { AxiosResponse } from "axios";
import { apiUrls } from "../../helpers/apiUrls";
import {
    notificationError,
    notificationSuccess,
} from "../../helpers/notifications";
import Cookies from "js-cookie";
import Router from "next/router";

type SuccessDataType = {
    access_token: string;
};

type FailedDataType = {
    error: string;
};

type LoginDataType = SuccessDataType & FailedDataType;

const COOKIE_NAME = "access_token";

export function* loginRequest() {
    yield takeEvery(loginAsync.request, function* (action) {
        try {
            const payload = action.payload;
            const answer: AxiosResponse<LoginDataType> = yield axios.post(
                apiUrls.loginUrl,
                payload
            );
            const data = answer.data;
            if (data.access_token) {
                yield put(
                    loginAsync.success({
                        access_token: data.access_token,
                        username: payload.username,
                    })
                );
            } else {
                yield put(loginAsync.failure(Error(data.error)));
            }
        } catch (e) {
            yield put(loginAsync.failure(e));
        }
    });
}

export function* loginSuccess() {
    yield takeEvery(loginAsync.success, function* (action) {
        const payload = action.payload;

        notificationSuccess(`Привет, ${payload.username.toString()}!`);

        yield put(initToken(payload.access_token))

        Cookies.set(COOKIE_NAME, payload.access_token);

        Router.push('/schemas');
    });
}

export function* loginFailed() {
    yield takeEvery(loginAsync.failure, function* (action) {
        notificationError(action.payload.toString());
    });
}

export default function* authSaga() {
    yield all([fork(loginRequest), fork(loginFailed), fork(loginSuccess)]);
}
