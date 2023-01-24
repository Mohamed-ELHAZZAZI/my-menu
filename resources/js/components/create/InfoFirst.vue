<template>
    <div
        class="w-full bg-white rounded-md mx-auto overflow-hidden cursor-default"
    >
        <form action="#" method="POST">
            <div class="shadow h-full sm:overflow-hidden rounded-md">
                <div class="space-y-6 bg-white px-4 py-5 sm:p-6 rounded-md">
                    <div class="col-span-6">
                        <label
                            for="menu-name"
                            class="block text-sm font-medium text-gray-700"
                            >Menu name</label
                        >
                        <input
                            type="text"
                            name="menuName"
                            id="menu-name"
                            autocomplete="menu-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 sm:text-sm"
                            v-model="info.name"
                        />
                    </div>
                    <div class="col-span-6">
                        <label
                            for="street-address"
                            class="block text-sm font-medium text-gray-700"
                            >Street address</label
                        >
                        <input
                            type="text"
                            name="streetAddress"
                            id="street-address"
                            autocomplete="street-address"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 sm:text-sm"
                            v-model="info.street"
                        />
                    </div>
                    <div class="col-span-6">
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autocomplete="email-address"
                            class="mt-1 flex w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            v-model="info.email"
                        />
                    </div>
                    <div class="col-span-6">
                        <label
                            for="phone"
                            class="block text-sm font-medium text-gray-700"
                            >Phone</label
                        >
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            autocomplete="phone-address"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 sm:text-sm"
                            v-model="info.phone"
                        />
                    </div>
                    <fieldset class="grid grid-cols-2 gap-4">
                        <p
                            class="block text-sm font-medium text-gray-700 col-span-2"
                        >
                            Shop type
                        </p>

                        <div>
                            <input
                                type="radio"
                                name="DeliveryOption"
                                value="RestoShop"
                                id="RestoShop"
                                class="peer hidden"
                                v-model="info.type"
                            />

                            <label
                                for="RestoShop"
                                class="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                            >
                                <p class="text-gray-700">Restaurant</p>
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="DeliveryOption"
                                value="CoffeeShop"
                                id="CoffeeShop"
                                class="peer hidden"
                                v-model="info.type"
                            />

                            <label
                                for="CoffeeShop"
                                class="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                            >
                                <p class="text-gray-700">Coffe shope</p>
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import store from "../../store";
import { computed } from "vue";

const t = computed(() => store.state.newMenu.info);
const info = JSON.parse(JSON.stringify(t.value));

defineExpose({
    submit,
});
function submit() {
    if (info.name === "" || info.email === "" || info.phone === "") {
        store.commit("setError", "All blanks must be filled in.");
        return 0;
    } else if (info.type != "RestoShop" && info.type != "CoffeeShop") {
        return store.commit("setError", "Please select an appropriate type.");
    }

    store.commit("setError", "");
    store.commit("ChangeMenuInfo", info);
    return 1;
}
</script>

<style></style>
