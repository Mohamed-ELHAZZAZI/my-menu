<template>
    <div
        v-if="ErrorMsg"
        class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded"
    >
        {{ ErrorMsg }}
        <span
            @click="ErrorMsg = ''"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </span>
    </div>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
const ErrorMsg = computed({
    get: () => store.state.error,
    set: (val) => store.commit("setError", val),
});
</script>

<style></style>
