import * as authActions from "./auth/actions";
import * as menuActions from "./menu/actions";
import * as serverErrorsActions from "./serverErrors/actions";
import * as schemasActions from "./schemas/actions";
import { routerActions } from "connected-next-router";

export default {
    auth: authActions,
    router: routerActions,
    menu: menuActions,
    schemas : schemasActions,
    serverErrors : serverErrorsActions
};
