<script lang="ts" setup>
import { reactive } from "vue";
import { BluButton, BluInput } from "@/components";

interface BluLoginFormProps {
    /**
     * submit text
     */
    submitText?: string; 
}

withDefaults(defineProps<BluLoginFormProps>(), {
    size: "md",
    submitText: "Login",
});

interface BluInputEmits {
    /**
     * Event emitted when form is submitted
     */
    (event: "submitForm", form: { email: string, password: string }): void;
}

const emit = defineEmits<BluInputEmits>();
const form = reactive({
    email: "",
    password: "",
});

const submitForm = () => {
    emit("submitForm", form);
};
</script>

<template>
    <section>
        <form class="flex flex-col gap-4" @submit.prevent="submitForm">
            <BluInput id="email" label="Email" />
            <BluInput id="password" label="Password" />
            <BluButton type="submit">
                {{ submitText }}
            </BluButton>
        </form>
    </section>
</template>

<style lang="scss" scoped>

</style>
