<script lang="ts" setup>
import { reactive } from "vue";
import { BluButton, BluInput } from "@/components";

interface BluLoginFormProps {
    /**
     * Title of the form
     */
    formTitle?: string;
    /**
     * submit text
     */
    submitText?: string; 
}

withDefaults(defineProps<BluLoginFormProps>(), {
    formTitle: "Login form",
    submitText: "Login",
});

interface BluInputEmits {
    /**
     * Event emitted when form is submitted
     */
    (event: "submitForm", form: { email: string, password: string }): void;
}

const emit = defineEmits<BluInputEmits>();

interface BluLoginFormSlots {
    /**
     * Slot top of the form
     */
    formHeader: any;
}

defineSlots<BluLoginFormSlots>();

const form = reactive({
    email: "",
    password: "",
});

const submitForm = () => {
    emit("submitForm", form);
};
</script>

<template>
    <section class="flex flex-col max-w-lg gap-4 mx-auto">
        <slot name="formHeader">
            <h1 class="text-2xl font-bold">
                {{ formTitle }}
            </h1>
        </slot>
        <form class="flex flex-col gap-2" @submit.prevent="submitForm">
            <BluInput id="email" v-model="form.email" label="Email" />
            <BluInput
                id="password"
                v-model="form.password"
                label="Password"
                type="password"
            />
            <BluButton type="submit">
                {{ submitText }}
            </BluButton>
        </form>
    </section>
</template>

<style lang="scss" scoped>

</style>
