<template>
    <div class="bg-black overflow-hidden">
        <div
            class="w-full h-[270px] flex justify-center items-center relative overflow-hidden col-span-7"
        >
            <img :src="'../storage/images/header.jpg'" alt="" />
            <div
                class="absolute bg-[#e89e309e] flex justify-center items-center px-5 max-w-[700px]"
            >
                <input
                    type="text"
                    class="border-none mx-5 text-[60px] bg-transparent uppercase text-center font-bold px-6 py-4 focus:border-none focus:ring-0 overflow-hidden"
                    v-model="menuData.title"
                />
            </div>
        </div>
        <div
            class="w-full bg-black border-l-[20px] border-l-[#e89e30] grid grid-cols-7"
        >
            <div class="py-10 px-16 h-full pr-24 col-span-5">
                <div
                    class="w-full mb-10"
                    v-for="data in menuData.data"
                    :key="data.id"
                >
                    <input
                        type="text"
                        v-model="data.section"
                        class="bg-transparent w-full border-none font-semibold uppercase tracking-[5px] pl-0 pb-0 focus:border-none focus:ring-0 text-[#e89e30] text-[20px]"
                    />
                    <hr class="h-[2px] bg-[#e89e30] my-3 w-full border-none" />
                    <div
                        class="w-full flex justify-between relative"
                        v-for="(item, index) in data.items"
                        :key="item.id"
                    >
                        <input
                            type="text"
                            v-model="item.name"
                            class="bg-transparent w-4/5 border-none text-white capitalize p-0 focus:border-none focus:ring-0"
                        />
                        <input
                            type="text"
                            v-model="item.price"
                            class="bg-transparent border-none text-right w-1/5 text-white capitalize p-0 focus:border-none focus:ring-0"
                        />
                        <div
                            class="absolute -right-14 flex text-white justify-center items-center gap-2"
                        >
                            <button
                                class="text-blue-600"
                                @click="addItem(item, index, data)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </button>

                            <button
                                class="text-red-600"
                                @click="removeItem(item, data)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
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
            <div class="col-span-2 h-full pt-10 flex flex-col items-end">
                <img
                    v-for="img in menuData.images"
                    :key="img.link"
                    :src="img.link"
                    class="w-64 h-64"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { uuid } from "vue-uuid";
const menuData = ref({});

const t = onMounted(() => {
    menuData.value = {
        title: "fast food menu",
        data: [
            {
                id: uuid.v4(),
                section: "appetizers and snacks",
                items: [
                    {
                        id: uuid.v4(),
                        name: "mozzarella sticks",
                        price: "$7",
                    },
                    {
                        id: uuid.v4(),
                        name: "Frensh Fries",
                        price: "$6",
                    },
                    {
                        id: uuid.v4(),
                        name: "chinken fingers",
                        price: "$6",
                    },
                    {
                        id: uuid.v4(),
                        name: "Broccli cheddqr soup",
                        price: "$6",
                    },
                    {
                        id: uuid.v4(),
                        name: "potato zedges",
                        price: "$7",
                    },
                    {
                        id: uuid.v4(),
                        name: "chunky onion rings",
                        price: "$7",
                    },
                ],
            },
            {
                id: uuid.v4(),
                section: "gourment burgers",
                items: [
                    {
                        id: uuid.v4(),
                        name: "bacon cheeseburger",
                        price: "$5",
                    },
                    {
                        id: uuid.v4(),
                        name: "stroganoff",
                        price: "$8",
                    },
                    {
                        id: uuid.v4(),
                        name: "vegetable chilli",
                        price: "$6",
                    },
                    {
                        id: uuid.v4(),
                        name: "four cheese",
                        price: "$9",
                    },
                    {
                        id: uuid.v4(),
                        name: "quarter pouder with chesse",
                        price: "$5",
                    },
                    {
                        id: uuid.v4(),
                        name: "mushroom swiss",
                        price: "$7",
                    },
                ],
            },
            {
                id: uuid.v4(),
                section: "gourment burgers",
                items: [
                    {
                        id: uuid.v4(),
                        name: "bacon cheeseburger",
                        price: "$5",
                    },
                    {
                        id: uuid.v4(),
                        name: "stroganoff",
                        price: "$8",
                    },
                    {
                        id: uuid.v4(),
                        name: "vegetable chilli",
                        price: "$6",
                    },
                    {
                        id: uuid.v4(),
                        name: "four cheese",
                        price: "$9",
                    },
                    {
                        id: uuid.v4(),
                        name: "quarter pouder with chesse",
                        price: "$5",
                    },
                    {
                        id: uuid.v4(),
                        name: "mushroom swiss",
                        price: "$7",
                    },
                ],
            },
        ],

        images: [
            {
                id: uuid.v4(),
                link: "../storage/images/burger1.png",
            },
            {
                id: uuid.v4(),
                link: "../storage/images/burger.png",
            },
            {
                id: uuid.v4(),
                link: "../storage/images/burger2.png",
            },
        ],
    };
});

function addItem(item, index, data) {
    const newItem = {
        id: uuid.v4(),
        name: "item",
        price: "$1",
    };

    data.items.splice(index + 1, 0, newItem);
}

function removeItem(item, data) {
    return (data.items = data.items.filter((q) => q !== item));
}
</script>

<style></style>
