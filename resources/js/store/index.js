import { createStore } from "vuex";
import axiosClient from "../axios";
const store = createStore({
    strict: true,
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        newMenu: {
            info: {
                name: "",
                street: "",
                email: "",
                phone: "",
                type: "",
                template_id: null,
            },
            list: [],
        },
        menus: [],
        fakeMenu: {
            images: [
                {
                    id: 1,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 2,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 3,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 5,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 6,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 7,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 8,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 9,
                    url: "https://fakeimg.pl/350x200/",
                },
                {
                    id: 10,
                    url: "https://fakeimg.pl/350x200/",
                },
            ],
        },
        error: "",
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post("/register", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        login({ commit }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post("/logout").then((response) => {
                commit("logout");
                return response;
            });
        },
        createMenu({ commit, state }, list) {
            const l = JSON.parse(JSON.stringify(list));

            commit("setList", l);
            return axiosClient
                .post("/menu/create", state.newMenu)
                .then((response) => {
                    commit("setToMenus", response);
                    return response;
                });
        },
        getMenus({ state, commit }) {
            if (state.menus) {
                return axiosClient
                    .post("/menu/get", state.newMenu)
                    .then((response) => {
                        commit("setToMenus", response, true);
                        return response.data;
                    });
            }
            return 1;
        },
    },
    mutations: {
        logout: (state) => {
            state.error = "";
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.error = "";
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        },
        ChangeMenuInfo: (state, val) => {
            state.newMenu.info = val;
        },
        setTemplate(state, val) {
            state.newMenu.info.template_id = val;
        },
        setError: (state, val) => {
            state.error = val;
        },
        setList: (state, list) => {
            state.newMenu.list = list;
        },
        ClearMenuInfo: (state) => {
            state.newMenu = {
                info: {
                    name: "",
                    street: "",
                    email: "",
                    phone: "",
                    type: "",
                    template_id: null,
                },
                list: [],
            };
        },
        setToMenus: (state, menu) => {
            state.menus = state.menus.concat(menu.data);
        },
    },
    modules: {},
});

export default store;
