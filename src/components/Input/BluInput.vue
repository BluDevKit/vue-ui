<script lang="ts" setup>
import {
    usePaddingSizes,
    usePaddingSizePosition,
} from '@/composables/paddingSizes';
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
     * whether to show label
     */
    showLabel?: boolean;

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
    type?:
        | 'email'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'url'
        | 'hidden';

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
    showLabel: true,
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
    special?: string;

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
        <label v-if="showLabel" :for="id">
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
            <div class="relative flex w-full">
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

                <slot name="special">
                    <span
                        v-if="type === 'password'"
                        class="absolute inset-y-0 flex items-center cursor-pointer"
                        :class="usePaddingSizePosition(size).value"
                        @click="togglePassword"
                    >
                        {{ state.showPassword ? 'Hide' : 'Show' }}
                    </span>

                    <Transition name="search">
                        <button
                            v-if="type === 'search' && model"
                            class="absolute inset-y-0 flex items-center cursor-pointer"
                            :class="usePaddingSizePosition(size).value"
                            @click="model = ''"
                        >
                            ❌
                        </button>
                    </Transition>
                </slot>
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
<style scoped>
.search-enter-active,
.search-leave-active {
    transition:
        opacity 0.3s,
        transform 0.3s;
}
.search-enter-from,
.search-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
}
</style>
