<template>
    <div>
        <main>
            <div
                class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 grid grid-cols-3 gap-5"
            >
                <button
                    class="relative rounded-lg p-8 shadow-xl font-semibold text-[#1a73e8] bg-white flex items-center justify-center flex-col gap-5 border hover:border-[#1a73e8]"
                    @click="open = true"
                >
                    <PlusIcon class="h-10 w-10" />
                    Add menu
                </button>
                <CreateLayout :open="open" @closeModel="open = false" />

                <div
                    v-for="menu in menus"
                    :key="menu.id"
                    class="bg-red-500 flex items-center justify-center rounded-lg min-h-[200px]"
                >
                    {{ menu.name }}
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/outline";
import { computed, onMounted, ref } from "vue";
import CreateLayout from "../components/CreateLayout.vue";
import store from "../store";
const open = ref(false);

const menus = computed(() => store.state.menus);

const t = onMounted(() => {
    store.dispatch("getMenus");
    // .then((data) => (menus.value = data));
});
</script>

<style scoped>
main {
    min-height: calc(100vh - 64px);
}
</style>
