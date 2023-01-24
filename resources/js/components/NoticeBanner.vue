<template>
    <div class="bg-blue-600">
        <div class="mx-auto max-w-7xl py-3 px-2 sm:px-6 lg:px-8">
            <div class="flex flex-wrap items-center justify-between">
                <div class="flex w-0 flex-1 items-center">
                    <span class="flex rounded-lg bg-blue-800 p-2">
                        <MegaphoneIcon
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </span>
                    <p class="ml-3 truncate font-medium text-white">
                        <span class="md:hidden"
                            >Make sure the informations are correct!</span
                        >
                        <span class="hidden md:inline"
                            >These informations may be displayed in the menu!
                            make sure it's correct
                        </span>
                    </p>
                </div>
                <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button
                        type="button"
                        @click="remove"
                        class="-mr-1 flex rounded-md p-2 hover:bg-blue-500 focus:outline-none sm:-mr-2"
                    >
                        <span class="sr-only">Dismiss</span>
                        <XMarkIcon
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MegaphoneIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({});

const emit = defineEmits(["removeBanner"]);
function remove() {
    emit("removeBanner");
}
</script>
