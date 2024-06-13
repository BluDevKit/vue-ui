<script lang="ts" setup>
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { mergeClasses } from '@/utils/tailwindMerge';

interface BluMultiSelectProps {
    /**
     * size of the button
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
     * whether the button is loading
     */
    loading?: boolean;
    /**
     * whether the button is full width
     */
    fullWidth?: boolean;
}

const props = withDefaults(defineProps<BluMultiSelectProps>(), {
    type: 'button',
});

interface bluButtonSlots {
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

defineSlots<bluButtonSlots>();

const paddingStyles = computed(() => {
    return twMerge([
        props.size === 'sm' && 'px-2 py-1 text-sm rounded-sm',
        props.size === 'md' && 'px-4 py-2 text-base rounded-md',
        props.size === 'lg' && 'px-6 py-3 text-lg rounded-lg',
        props.size === 'xl' && 'px-8 py-4 text-xl rounded-xl',
    ]);
});
</script>

<template>
    <button
        :type="type"
        :disabled="props.disabled || props.loading"
        :class="[
            mergeClasses(
                [
                    paddingStyles,
                    'flex justify-between gap-1 transition-all bg-blu-400 hover:brightness-90 disabled:bg-opacity-50 disabled:cursor-not-allowed items-center',
                ],
                props.twClasses || ''
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

