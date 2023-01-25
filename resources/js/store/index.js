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
            lists: null,
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
        createMenu({ commit, state }) {
            return axiosClient
                .post("/menu/create", state.newMenu)
                .then((response) => {
                    // commit("setToMenus", response);
                    return response;
                });
        },
        getMenu: (state, slug) => {
            return axiosClient.get(`/menu/${slug}`).then((response) => {
                return response;
            });
        },
    },
    mutations: {
        logout: (state) => {
            state.error = "";
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setError: (state, val) => {
            state.error = val;
        },

        setUser: (state, userData) => {
            state.error = "";
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        },

        //menu commits
        ChangeMenuInfo: (state, val) => {
            state.newMenu.info = val;
        },
        setTemplate: (state, val) => {
            state.newMenu.info.template_id = val;
            const tmp = state.fakeMenu.images.find((flm) => flm.id === val);
            state.newMenu.info.template_name = tmp.name;
        },
        setNewMenu: (state, menu) => {
            state.newMenu.lists = menu;
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
                    template_name: null,
                },
                lists: null,
            };
        },
    },
    modules: {},
});

export default store;
