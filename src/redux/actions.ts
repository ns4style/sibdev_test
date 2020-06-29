import * as authActions from "./auth/actions";
import * as menuActions from "./menu/actions";
import * as serverErrorsActions from "./serverErrors/actions";
import * as schemasActions from "./schemas/actions";
import * as schemaActions from "./schema/actions";
import * as tabsActions from "./createTabs/actions";
import { routerActions } from "connected-next-router";

export default {
    auth: authActions,
    router: routerActions,
    menu: menuActions,
    schemas: schemasActions,
    serverErrors: serverErrorsActions,
    schema: schemaActions,
    createTabs: tabsActions,
};
