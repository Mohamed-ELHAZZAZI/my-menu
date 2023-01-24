<template>
    <div
        class="w-full rounded-md mx-auto min-h-fit overflow-hidden cursor-default px-4 py-5 sm:p-6"
    >
        <label class="block text-sm font-medium text-gray-700"
            >Select menu template</label
        >
        <hr class="my-4" />
        <div
            class="w-full h-full bg-gray-200 bg-opacity-70 grid grid-cols-3 p-3 gap-3 rounded"
        >
            <div v-for="menu in menus" :key="menu.id">
                <input
                    type="radio"
                    name="template"
                    :value="menu.id"
                    :id="menu.id"
                    class="peer hidden"
                    v-model="template"
                />

                <label
                    :for="menu.id"
                    class="block cursor-pointer rounded-lg border border-gray-100 text-sm font-medium shadow-sm overflow-hidden hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                    <img :src="menu.url" class="rounded-lg" />
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "../../store";

defineExpose({
    submit,
});

const menus = computed(() => store.state.fakeMenu.images);
const template = ref(store.state.newMenu.info.template_id);

function submit() {
    if (!template.value) {
        store.commit("setError", "Please select a template.");
        return 0;
    }
    store.commit("setTemplate", template.value);
    return 1;
}
</script>

<style></style>
