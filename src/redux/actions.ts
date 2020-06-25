import * as authActions from "./auth/actions";
import * as menuActions from "./menu/actions";
import { routerActions } from "connected-next-router";


export default {
    auth: authActions,
    router: routerActions,
    menu : menuActions
};
