import { createAsyncAction } from "typesafe-actions";
import * as schemaConstants from "./constants";
import { TSchemaItem } from "../../types";

export const loadSchema = createAsyncAction(
    schemaConstants.LOAD_REQUEST,
    schemaConstants.LOAD_SUCCESS,
    schemaConstants.LOAD_FAILED
)<string, TSchemaItem, Error>();

export const downloadSchema = createAsyncAction(
    schemaConstants.DOWNLOAD_REQUEST,
    schemaConstants.DOWNLOAD_SUCCESS,
    schemaConstants.DOWNLOAD_FAILED
)<any, any, Error>();

export const deleteSchema = createAsyncAction(
    schemaConstants.DELETE_REQUEST,
    schemaConstants.DELETE_SUCCESS,
    schemaConstants.DELETE_FAILED
)<string, any, Error>();
