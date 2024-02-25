<script lang="ts" setup>
import { usePaddingSizes } from '@/composables/paddingSizes';
import { mergeClasses } from '@/utils/tailwindMerge';
import { computed, reactive } from 'vue';

interface BluInputProps {
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
    size?: 'xs' | 'sm' | 'md' | 'lg';

    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;

    /**
     * type of input field
     */
    type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' | 'hidden';

    /**
     * model value of input field
     */
    modelValue?: string | number | boolean;

    /**
     * whether the input field is disabled
     */
    disabled?: boolean;

    /**
     * minimum value of input field
     */
    min?: string | number;

    /**
     * maximum value of input field
     */
    max?: string | number;

    /**
     * step value of input field
     */
    step?: string | number;

    /**
     * placeholder of input field
     */
    placeholder?: string;
}

const props = withDefaults(defineProps<BluInputProps>(), {
    type: 'text',
    size: 'md',
});

interface BluInputEmits {
    /**
     * Event emitted when input is focused
     */
    (event: 'inputFocus', $event: FocusEvent, id: string): void;
    /**
     * Event emitted when input is changed
     */
    (event: 'inputChange', $event: Event, id: string): void;
    /**
     * Event emitted when input is blurred
     */
    (event: 'inputBlur', $event: Event, id: string): void;
    /**
     * Event emitted when input is keyup
     */
    (event: 'inputKeyUp', $event: KeyboardEvent, id: string): void;
    /**
     * Event emitted when input is focused
     */
    (event: 'prefixClick', $event: Event, id: string): void;
    /**
     * Event emitted when input is focused
     */
    (event: 'suffixClick', $event: Event, id: string): void;
}

const emit = defineEmits<BluInputEmits>();

interface bluInputSlots {
    /**
     * Slot for prefix
     */
    prefix?: string;
    /**
     * Slot for left icon
     */
    leftIcon?: string;
    /**
     * Slot for right icon
     */
    rightIcon?: string;
    /**
     * Slot for left prefix
     */
    suffix?: string;
}

const slots = defineSlots<bluInputSlots>();

const model = defineModel();

const state = reactive({
    showPassword: false,
});

const togglePassword = () => {
    state.showPassword = !state.showPassword;
};

const dynamicType = computed(() => {
    return props.type === 'password' && state.showPassword
        ? 'text'
        : props.type;
});
</script>

<template>
    <section class="relative flex flex-col gap-1">
        <label :for="id">
            {{ label }}
        </label>
        <div class="relative flex h-full">
            <button
                v-if="$slots.prefix"
                :class="[
                    usePaddingSizes(size).value,
                    'border-2 rounded-r-none border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
                ]"
                @click="$emit('prefixClick', $event, id)"
            >
                <slot name="prefix" />
            </button>

            <slot name="leftIcon" />
            <div class="relative flex w-fit">
                <input
                    :id="id"
                    v-model="model"
                    :name="name || id"
                    :type="dynamicType"
                    :disabled="disabled"
                    :min="min"
                    :max="max"
                    :step="step"
                    :placeholder="placeholder"
                    :class="[
                        mergeClasses(
                            [
                                usePaddingSizes(size).value,
                                'border-2 border-gray-300 w-full focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
                                $slots.prefix ? 'rounded-l-none' : '',
                                $slots.suffix ? 'rounded-r-none' : '',
                            ],
                            twClasses || ''
                        ),
                    ]"
                    @focus="$emit('inputFocus', $event, id)"
                    @change="$emit('inputChange', $event, id)"
                    @blur="$emit('inputBlur', $event, id)"
                    @keyup="$emit('inputKeyUp', $event, id)"
                />

                <span
                    v-if="type === 'password'"
                    class="absolute inset-y-0 flex items-center cursor-pointer"
                    :class="[
                        size === 'xs' && 'right-1',
                        size === 'sm' && 'right-2',
                        size === 'md' && 'right-4',
                        size === 'lg' && 'right-6',
                    ]"
                    @click="togglePassword"
                >
                    {{ state.showPassword ? 'Hide' : 'Show' }}
                </span>
            </div>
            <slot name="rightIcon" />

            <button
                v-if="$slots.suffix"
                :class="[
                    usePaddingSizes(size).value,
                    'border-2 rounded-l-none border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
                ]"
                @click="$emit('suffixClick', $event, id)"
            >
                <slot name="suffix" />
            </button>
        </div>
    </section>
</template>
