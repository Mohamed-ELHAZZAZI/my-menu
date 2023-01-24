<template>
    <div>
        <tmpMenu />
    </div>
</template>

<script setup>
import store from "../../store";
import { defineAsyncComponent } from "vue";

const template_name = store.state.newMenu.info.template_name;

const tmpMenu = defineAsyncComponent(() => {
    return import(`./templates/${template_name}.vue`);
});
</script>

<style></style>
