import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree } from "vuex";

export type AuthData = { id: number, name: string, email: string, profile_picture: string, role_id: number, token: string };
export type State = { authData: AuthData | null };

export const key: InjectionKey<Store<State>> = Symbol();

const state: State = {
    authData: null
};

export const enum MUTATIONS {
    SET_AUTH_DATA = 'SET_AUTH_DATA',
    CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA'
}

const mutations: MutationTree<State> = {
    [MUTATIONS.SET_AUTH_DATA](state, data: AuthData) {
        state.authData = data;
    },
    [MUTATIONS.CLEAR_AUTH_DATA](state) {
        state.authData = null;
    }
}

export const store = createStore<State>({ state, mutations });

export function useStore() {
    return baseUseStore(key);
}