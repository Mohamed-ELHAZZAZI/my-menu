<template>
    <div
        class="w-full bg-white rounded-md mx-auto overflow-hidden cursor-default"
    >
        <div class="shadow h-full sm:overflow-hidden rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6 rounded-md">
                <div class="flex justify-between">
                    <h1>Menu List</h1>
                    <button
                        class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        type="button"
                        @click="addSection"
                    >
                        add
                    </button>
                </div>
                <div class="text-center text-gray-600" v-if="!menu.length">
                    You don't have any questions created
                </div>

                <div v-for="(section, index) in menu" :key="section.id">
                    <div class="flex justify-between items-center gap-2">
                        <input
                            type="text"
                            v-model="section.title"
                            :id="index"
                            class="w-full rounded-sm"
                            placeholder="Section name"
                        />

                        <button
                            class="p-2 rounded-full bg-slate-100"
                            @click="addItem(section)"
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
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </button>
                        <button
                            class="p-2 rounded-full"
                            @click="removeSection(section)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-red-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 12h-15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        class="w-[calc(100%-50px)] flex flex-col gap-2 py-2"
                        v-for="item in section.item"
                        :key="item.id"
                    >
                        <div class="flex gap-2">
                            <input
                                type="text"
                                class="w-[calc(100%-1rem)] ml-4"
                                placeholder="Item name"
                                v-model="item.name"
                            />
                            <input
                                type="number"
                                class="w-20"
                                placeholder="15.5"
                                v-model="item.price"
                            />
                            <button
                                class="p-2 rounded-full"
                                @click="removeItem(item, section)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-red-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 12h-15"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "../../store";
import { computed, ref } from "vue";
import { uuid } from "vue-uuid";

defineExpose({
    submit,
});

const emit = defineEmits(["submitMenu"]);

const menu = ref([]);

function addSection(index) {
    const newSection = {
        id: uuid.v4(),
        title: "",
        item: [],
    };
    menu.value.push(newSection);
}

function removeSection(section) {
    return (menu.value = menu.value.filter((sec) => sec !== section));
    console.log(section);
}

function addItem(section) {
    const newItem = {
        id: uuid.v4(),
        name: "",
        price: "",
    };

    section.item.push(newItem);
}

function removeItem(item, section) {
    return (section.item = section.item.filter((q) => q !== item));
}

function submit() {
    let error = 0;
    menu.value.forEach((e) => {
        if (e.title === "") {
            store.commit("setError", "Please fill all the blanks.");
            error = 1;
        }

        for (const key in e.item) {
            if (Object.hasOwnProperty.call(e.item, key)) {
                const element = e.item[key];
                if (element.name === "" || element.price === "") {
                    store.commit("setError", "Please fill all the blanks.");
                    error = 1;
                }
            }
        }
    });

    if (!error) {
        store.commit("setError", "");
        store
            .dispatch("createMenu", menu.value)
            .then((result) => {
                emit("submitMenu", result.data);
            })
            .catch((res) => console.log(res));
    }
}
</script>

<style></style>
