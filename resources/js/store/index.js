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
                template_name: "",
            },
            list: [],
        },
        menus: [],
        fakeMenu: {
            images: [
                {
                    id: 1,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 2,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 3,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 5,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 6,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 7,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 8,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 9,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
                },
                {
                    id: 10,
                    name: "templateOne",
                    url: "../storage/templates/2.png",
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
            const tmp = state.fakeMenu.images.find((flm) => flm.id === val);
            state.newMenu.info.template_name = tmp.name;
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
