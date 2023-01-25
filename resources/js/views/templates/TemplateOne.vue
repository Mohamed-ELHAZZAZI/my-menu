<template>
    <div class="bg-black overflow-hidden">
        <div
            class="w-full h-[350px] flex justify-center items-center relative overflow-hidden col-span-7"
        >
            <img :src="'../storage/images/header.jpg'" alt="" />
            <div
                class="absolute bg-[#e89e309e] flex justify-center items-center p-8 max-w-[900px] overflow-hidden"
            >
                <p
                    type="text"
                    class="border-none mx-5 text-[70px] bg-transparent uppercase text-center font-bold px-6 py-4 focus:border-none focus:ring-0"
                >
                    {{ menuData.title }}
                </p>
            </div>
        </div>
        <div
            class="w-full bg-black border-l-[20px] border-l-[#e89e30] grid grid-cols-7"
        >
            <div class="py-10 px-16 h-full pr-24 col-span-5">
                <div
                    class="w-full mb-10 relative"
                    v-for="data in menuData.data"
                    :key="data.id"
                >
                    <p
                        type="text"
                        class="bg-transparent w-full border-none font-semibold uppercase tracking-[5px] pl-0 pb-0 focus:border-none focus:ring-0 text-[#e89e30] text-[20px]"
                    >
                        {{ data.section }}
                    </p>

                    <hr class="h-[2px] bg-[#e89e30] my-3 w-full border-none" />
                    <div
                        class="w-full flex justify-between relative"
                        v-for="item in data.items"
                        :key="item.id"
                    >
                        <p
                            type="text"
                            class="bg-transparent w-4/5 border-none text-white capitalize p-0 focus:border-none focus:ring-0"
                        >
                            {{ item.name }}
                        </p>
                        <p
                            type="text"
                            class="bg-transparent border-none text-right w-1/5 text-white capitalize p-0 focus:border-none focus:ring-0"
                        >
                            {{ item.price }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-span-2 h-full pt-10 flex flex-col items-end">
                <img
                    v-for="img in menuData.images"
                    :key="img.link"
                    :src="img.link"
                    class="w-72 h-72"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["data"]);

const menuData = props.data;
</script>

<style></style>
