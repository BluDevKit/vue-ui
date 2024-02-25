<script lang="ts" setup>
import { usePaddingSizes } from '@/composables/paddingSizes';
import { mergeClasses } from '@/utils/tailwindMerge';

interface BluRadioCardProps {
    /**
     * id of input field
     */
    id: string;

    /**
     *  name of input field
     */
    name?: string;

    /**
     * label of input field
     */
    ariaLabel: string;

    /**
     * size of the button
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * type of the button
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;

    /**
     * whether the button is disabled
     */
    disabled?: boolean;

    /**
     * checkbox value
     */
    value?: string | boolean | number;

    /**
     * model value of input field
     */
    modelValue?: boolean;
}

withDefaults(defineProps<BluRadioCardProps>(), {
    type: 'button',
    size: 'md',
});

interface bluButtonSlots {
    /**
     * Slot for content
     */
    default?: string;
}

defineSlots<bluButtonSlots>();

const model = defineModel();
</script>

<template>
    <label
        :class="[
            mergeClasses(
                [
                    usePaddingSizes(size).value,
                    'grid p-4 border-2 rounded-md place-items-center w-max cursor-pointer transition-colors has-[:disabled]:bg-gray-400 has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed',
                    'has-[:checked]:bg-green-600 has-[:checked]:text-white has-[:checked]:font-bold has-[:focus]:ring-2 has-[:focus]:ring-blu-600',
                ],
                twClasses || ''
            ),
        ]"
        :aria-label="`Select ${ariaLabel}`"
        :for="id"
    >
        <div class="flex flex-col items-center gap-1">
            <slot />
            <input
                :id="id"
                v-model="model"
                :name="name || id"
                type="radio"
                :disabled="disabled"
                :value="value"
                class="border-2 text-black disabled:cursor-not-allowed ring-0 checked:!bg-none checked:!border-white"
            />
        </div>
    </label>
</template>

<style scoped>
/* hide styling */
input[type='radio'] {
    /* all: unset; */
}
</style>
