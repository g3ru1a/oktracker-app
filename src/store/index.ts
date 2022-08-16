import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree } from "vuex";
import createPersistedState from "vuex-persistedstate";

export type AuthData = { id: number, name: string, email: string, profile_picture: string, role_id: number, token: string };
export type State = { authData: AuthData | null, dark_theme: boolean };

export const key: InjectionKey<Store<State>> = Symbol();

const state: State = {
    authData: null,
    dark_theme: false,
};

export const enum MUTATIONS {
    SET_AUTH_DATA = 'SET_AUTH_DATA',
    CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA',
    TOGGLE_THEME = 'TOGGLE_THEME'
}

const mutations: MutationTree<State> = {
    [MUTATIONS.SET_AUTH_DATA](state, data: AuthData) {
        state.authData = data;
    },
    [MUTATIONS.CLEAR_AUTH_DATA](state) {
        state.authData = null;
    },
    [MUTATIONS.TOGGLE_THEME](state) {
        state.dark_theme = !state.dark_theme;
    },
}

export const store = createStore<State>({ 
    state, mutations, 
    plugins: [createPersistedState()] });

export function useStore() {
    return baseUseStore(key);
}