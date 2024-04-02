<script lang="ts" setup>
import { mergeClasses } from "@/utils/tailwind";

interface BluCheckboxProps {
    /**
     * id of input field
     */
    id: string;

    /**
     *  name of input field
     */
    name?: string;

    /**
     * size of the button
     */
    size: "sm" | "md" | "lg";

    /**
     * label of input field
     */
    label: string;

    /**
     * Text to display when the button is toggled on
     */
    onText?: string;

    /**
     * Text to display when the button is toggled off
     */
    offText?: string;

    /**
     * Label location
     */
    labelLocation?: "top" | "right" | "left";

    /**
     * model value of input field
     */
    modelValue: boolean;

    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;

    /**
     * whether the button is disabled
     */
    disabled?: boolean;

    /**
     * whether the input field is required
     */
    required?: boolean;
}

const props = withDefaults(defineProps<BluCheckboxProps>(), {
    size: "sm",
    labelLocation: "top",
    modelValue: false,
    onText: "On",
    offText: "Off",
});

const model = defineModel();

const toggleValue = () => {
    if (props.disabled) return;
    model.value = !model.value;
};
</script>

<template>
    <div
        class="flex w-20"
        :class="[
            labelLocation === 'top' ? 'flex-col' : 'flex-row items-center gap-1 *:',
            size === 'sm' ? 'w-20' : '',
            size === 'md' ? 'w-24' : '',
            size === 'lg' ? 'w-28' : '',
        ]"
        :style="[
            size === 'sm' ? '--slide: 5rem; --offset: 5%;' : '',
            size === 'md' ? '--slide: 6rem; --offset: 0%;' : '',
            size === 'lg' ? '--slide: 7rem; --offset: -5%;' : '',
        ]"
    >
        <label
            :for="id"
            :class="[labelLocation === 'left' ? 'order-first' : '', labelLocation === 'right' ? 'order-last' : '']"
        >
            {{ label }}
        </label>

        <input
            :id="id"
            v-model="model"
            :name="name || id"
            type="checkbox"
            :disabled="disabled"
            :required="required"
        />
        <div
            id="toggle"
            :class="[
                mergeClasses(
                    [
                        'relative rounded-full w-full shrink-0',
                        model ? 'bg-blu-500' : 'bg-gray-400 justify-end',
                        disabled ? 'cursor-not-allowed opacity-65 select-none' : 'cursor-pointer',
                    ],
                    twClasses || ''
                ),
            ]"
            @click="toggleValue"
        >
            <span class="px-2 text-lg">
                {{ model ? onText : offText }}
            </span>
        </div>
    </div>
</template>

<style scoped>
input {
    all: unset;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 0;
    width: 0;
    height: 0;
}

input:focus + #toggle {
    @apply ring-2 ring-blu-400;
}

#toggle {
    display: grid;
}

#toggle::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%) translateX(0);
    height: 80%;
    width: auto;
    aspect-ratio: 1/1;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
}
input:checked + #toggle::before {
    transform: translateY(-50%) translateX(calc(var(--slide) - 2rem + var(--offset)));
}
</style>
