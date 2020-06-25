import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
    export type RootAction = ActionType<typeof import('./actions').default>;

    interface Types {
        RootAction: RootAction;
    }
}
