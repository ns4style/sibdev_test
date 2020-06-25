import {createAction} from "typesafe-actions";
import {LOCATION_CHANGE, LocationChangeAction} from "connected-next-router/actions";
import {RouterState} from "connected-next-router/types";

export const changeLocation = createAction(LOCATION_CHANGE)<RouterState>()
