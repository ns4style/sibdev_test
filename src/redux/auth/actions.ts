import { createAsyncAction, createAction  } from "typesafe-actions";
import * as authConstants from "./constants";

type LoginData = {
    username: string;
    password: string;
};

type SuccessLoginPayloadType = {
    access_token: string;
    username: string;
};

export const loginAsync = createAsyncAction(
    authConstants.REQUEST,
    authConstants.SUCCESS,
    authConstants.FAILED
)<LoginData, SuccessLoginPayloadType, Error>();

export const initToken = createAction(authConstants.INIT_TOKEN)<string>()

export const resetToken = createAction(authConstants.RESET_TOKEN)();
