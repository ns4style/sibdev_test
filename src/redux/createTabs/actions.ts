import { createAction } from "typesafe-actions";
import * as tabsConstant from "./constants";

export const setTabs = createAction(tabsConstant.SET)<Array<string>>();
export const resetTabs = createAction(tabsConstant.RESET)();
export const toggleTab = createAction(tabsConstant.TOGGLE)<string>();
export const removeTab = createAction(tabsConstant.REMOVE)<string>();
