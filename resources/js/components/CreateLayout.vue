<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center max-w-[95%] mx-auto max-[600px]:maw-w-full max-[600px]:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-[95%] sm:max-w-[1000px]"
                        >
                            <CreateSteps :step="step" />
                            <Error :class="'mx-4 '" />
                            <InfoFirst v-if="step === 1" ref="FirstStep" />
                            <MenuTemplates
                                ref="SecoundStep"
                                v-else-if="step === 2"
                            />
                            <templatesFill
                                ref="ThirdStep"
                                v-else-if="step === 3"
                                :class="[' mx-6 my-3']"
                                @submitMenu="submitMenu"
                            />
                            <LastStep
                                v-else-if="step === 4"
                                :MenuInfo="MenuInfo"
                            />

                            <!-- /code -->

                            <div
                                class="bg-gray-50 px-4 py-3 flex min-[640px]:justify-between max-[640px]:flex-col-reverse gap-1 sm:px-6"
                            >
                                <button
                                    v-if="step === 1"
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    @click="closeModel"
                                    ref="cancelButtonRef"
                                >
                                    Cancel
                                </button>

                                <button
                                    v-if="step != 1 && step < 4"
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    @click="PreviousStep"
                                    ref="cancelButtonRef"
                                >
                                    Previous
                                </button>

                                <button
                                    v-if="step < 4"
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-auto sm:w-auto sm:text-sm"
                                    @click="NextStep"
                                >
                                    Next
                                </button>
                                <button
                                    v-else
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-auto sm:w-auto sm:text-sm"
                                    @click="FinishCreation"
                                >
                                    Finish
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import store from "../store";
//to recover
import InfoFirst from "../components/create/InfoFirst.vue";

//steps
import CreateSteps from "../components/create/CreateSteps.vue";
import MenuTemplates from "../components/create/MenuTemplates.vue";
import LastStep from "../components/create/LastStep.vue";
import Error from "./Error.vue";

//dinamic import
import { defineAsyncComponent } from "vue";

const step = ref(1);

const emit = defineEmits(["closeModel"]);
const props = defineProps({
    open: Boolean,
});

function closeModel() {
    emit("closeModel");
    setTimeout(() => {
        store.commit("ClearMenuInfo");
    }, 500);
}

const FirstStep = ref(null);
const SecoundStep = ref(null);
const ThirdStep = ref(null);
const validated = ref(null);
const MenuInfo = ref("");
let template_name = ref("");
function NextStep() {
    validated.value = 0;
    switch (step.value) {
        case 1:
            validated.value = FirstStep.value.submit();
            break;
        case 2:
            validated.value = SecoundStep.value.submit();
            template_name.value = store.state.newMenu.info.template_name;
            break;
        case 3:
            ThirdStep.value.submit();
            break;
    }

    if (validated.value) {
        store.commit("setError", "");
        step.value += 1;
    }
}

function PreviousStep() {
    store.commit("setError", "");
    step.value -= 1;
}

//step 3
function submitMenu(e) {
    store.commit("setError", "");
    MenuInfo.value = e;
    step.value += 1;
}

function FinishCreation() {
    emit("closeModel");
    setTimeout(() => {
        store.commit("ClearMenuInfo");
        step.value = 1;
    }, 500);
}

const templatesFill = defineAsyncComponent(() => {
    return import(`./create/templates/${template_name.value}.vue`);
});
</script>
