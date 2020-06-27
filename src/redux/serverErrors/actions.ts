import { createAction, createAsyncAction } from "typesafe-actions";
import * as errorsConstants from "./constants";
import { TServerError } from "../../types";

export const addError = createAction(errorsConstants.ADD_ERROR)<TServerError>();

export const resetErrors = createAction(errorsConstants.RESET)();

export const showErrors = createAction(errorsConstants.SHOW_ERRORS)();
