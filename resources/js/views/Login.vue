<template>
    <div class="w-full max-w-md space-y-8">
        <div>
            <img
                class="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            />
            <h2
                class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
                Sign in to your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ " " }}
                <router-link
                    :to="{ name: 'Register' }"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    >create new account for free</router-link
                >
            </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="login">
            <Error />
            <!-- <ipnut type="hidden" name="remember" value="true" /> -->
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only"
                        >Email address</label
                    >
                    <input
                        id="email-address"
                        name="email"
                        required=""
                        type="email"
                        autocomplete="email"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 mb-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email address"
                        v-model="user.email"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required=""
                        autocomplete="current-password"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        v-model="user.password"
                    />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        v-model="user.remember"
                    />
                    <label
                        for="remember-me"
                        class="ml-2 block text-sm text-gray-900"
                        >Remember me</label
                    >
                </div>

                <div class="text-sm">
                    <a
                        href="#"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                        >Forgot your password?</a
                    >
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                        <LockClosedIcon
                            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                        />
                    </span>
                    Sign in
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import { useRouter } from "vue-router";
import Error from "../components/Error.vue";
import store from "../store";

const router = useRouter();

const user = {
    email: "",
    password: "",
    remember: false,
};

function login() {
    store
        .dispatch("login", user)
        .then(() => {
            router.push({
                name: "Dashboard",
            });
        })
        .catch((err) => {
            if (err.response.data.error) {
                store.commit("setError", err.response.data.error);
            } else if (err.response.data.errors["email"] != undefined) {
                store.commit("setError", err.response.data.errors["email"][0]);
            } else if (err.response.data.errors["password"] != undefined) {
                store.commit(
                    "setError",
                    err.response.data.errors["password"][0]
                );
            }
        });
}
</script>

<style></style>
