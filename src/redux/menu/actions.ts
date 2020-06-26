import { createAction } from "typesafe-actions";
import {
    LOCATION_CHANGE,
    LocationChangeAction,
} from "connected-next-router/actions";
import { RouterState } from "connected-next-router/types";
import { INIT } from "./constants";

export const changeLocation = createAction(LOCATION_CHANGE)<RouterState>();
export const menuInit = createAction(INIT)<string>();
