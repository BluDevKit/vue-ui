<script lang="ts" setup>
import { usePaddingSizes } from '@/composables/paddingSizes';
import { mergeClasses } from '@/utils/tailwindMerge';

interface BluTextareaProps {
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
    label: string;

    /**
     * size of the button
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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

    /**
     * model value of input field
     */
    modelValue?: string;

    /**
     * placeholder of input field
     */
    placeholder?: string;

    /**
     * max length of input field
     */
    maxLength?: number;

    /**
     * whether the input field is required
     */
    required?: boolean;

    /**
     * whether the input field is readonly
     */
    readonly?: boolean;
}

const props = withDefaults(defineProps<BluTextareaProps>(), {
    size: 'md',
    fullWidth: true,
});
</script>

<template>
    <div class="flex flex-col gap-1">
        <label :for="id">
            {{ label }}
        </label>
        <textarea
            :id="id"
            :name="name"
            :disabled="props.disabled || props.loading"
            :placeholder="props.placeholder"
            :maxlength="props.maxLength"
            :required="props.required"
            :readonly="props.readonly"
            :class="[
                mergeClasses(
                    [usePaddingSizes(size).value],
                    props.twClasses || ''
                ),
            ]"
            :value="modelValue"
        />
    </div>
</template>
