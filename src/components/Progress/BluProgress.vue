<script lang="ts" setup>
import { mergeClasses } from "@/utils/tailwindMerge";
import { usePaddingSizes } from "@/composables/paddingSizes";
import { computed } from "vue";

interface BluButtonProps {
    /**
     * size of the progress element
     */
    size?: "sm" | "md" | "lg" | "xl";
    /**
     * Label of the progress element
     */
    label: string;
    /**
     * label type
     */
    labelType?: "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    /**
     * label location
     */
    labelLocation?: "left" | "right" | "top" | "bottom";
    /**
     * value of the progress element
     */
    value: number;
    /**
     * classes to overwrite classes for the progress element
     */
    twClasses?: string;
    /**
     * whether the progress element is disabled
     */
    disabled?: boolean;
    /**
     * whether the progress element is loading
     */
    loading?: boolean;
    
}

const props = withDefaults(defineProps<BluButtonProps>(), {
    value: 0,
    size: "md",
    labelType: "h2",
    labelLocation: "bottom",
});

// interface BluButtonSlots {
//     /**
//      * Slot for icon
//      */
//     icon?: string;
// }

// defineSlots<BluButtonSlots>();

const progress = computed(() => Math.round(props.value));
</script>

<template>
    <section 
        :disabled="disabled || loading"
        :class="[
            mergeClasses(
                [
                    usePaddingSizes(size).value,
                    'flex gap-4 items-center justify-between bg-gray-200 w-max',
                    labelLocation === 'top' || labelLocation === 'bottom' ? 'flex-col' : 'flex-row',
                ],
                twClasses || ''
            ),
        ]"
    >
        <component 
            :is="labelType ?? 'h2'" 
            :class="[
                labelLocation === 'top' ? 'order-first' : '',
                labelLocation === 'bottom' ? 'order-last' : '',
                labelLocation === 'left' ? 'order-first' : '',
                labelLocation === 'right' ? 'order-last' : '',
            ]"
        >
            {{ label }}
        </component>
        <Transition appear>
            <div
                v-if="true"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-live="polite"
                :style="{ '--progress': `${progress}%` }"
            />
        </Transition>
    </section>
</template>
<style lang="scss" scoped>
div[role="progressbar"] {
    --size: 8rem;
    --border-width: 1.25rem;
    
    display: grid;
    place-items: center;
    width: var(--size);
    aspect-ratio: 1;
    border-radius: 50%;
    background-image: conic-gradient(
        black var(--progress),
        grey 0%
    );

    font-weight: bold;
    font-size: x-large;

    &::after{
        content: attr(aria-valuenow);
        display: grid;
        place-items: center;
        width: calc(100% - var(--border-width));
        aspect-ratio: 1;
        border-radius: inherit;
        background-color: white;
    }   
}
</style>