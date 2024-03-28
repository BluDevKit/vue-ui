<script lang="ts" setup>
import { mergeClasses } from "@/utils/tailwindMerge";
import { usePaddingSizes } from "@/composables/paddingSizes";

interface BluButtonProps {
    /**
     * size of the button
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * type of the button
     */
    type?: "button" | "submit" | "reset";
    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;
    /**
     * whether the button is disabled
     */
    disabled?: boolean;
    /**
     * whether the button is loading
     */
    loading?: boolean;
    /**
     * whether the button is full width
     */
    fullWidth?: boolean;
}

withDefaults(defineProps<BluButtonProps>(), {
    type: "button",
    size: "md",
});

interface BluButtonSlots {
    /**
     * Slot for left icon
     */
    leftIcon?: string;
    /**
     * Slot for label
     */
    default?: string;
    /**
     * Slot for loading icon
     */
    loadingIcon?: string;
    /**
     * Slot for right icon
     */
    rightIcon?: string;
}

defineSlots<BluButtonSlots>();
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="[
            mergeClasses(
                [
                    usePaddingSizes(size).value,
                    'flex justify-center gap-1 transition-all bg-blu-400 hover:brightness-90 disabled:bg-opacity-50 disabled:cursor-not-allowed items-center',
                    fullWidth ? 'w-full text-center' : '',
                ],
                twClasses || ''
            ),
        ]"
    >
        <slot name="leftIcon" />

        <slot />

        <span v-if="loading" class="animate-spin">
            <slot name="loadingIcon"> 🔃 </slot>
        </span>

        <slot name="rightIcon" />
    </button>
</template>
