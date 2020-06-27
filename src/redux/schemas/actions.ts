import { createAsyncAction } from "typesafe-actions";
import * as schemasConstants from "./constants";
import { TSchemaItem } from "../../types";

export const loadSchemas = createAsyncAction(
    schemasConstants.REQUEST,
    schemasConstants.SUCCESS,
    schemasConstants.FAILED
)<void, Array<TSchemaItem>, Error>();
