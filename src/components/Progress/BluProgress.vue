<script lang="ts" setup>
import { mergeClasses } from "@/utils/tailwindMerge";
import { usePaddingSizes } from "@/composables/paddingSizes";
import { computed } from "vue";
import CircleSvg from "./CircleSvg.vue";



export interface BluProgressProps {
    /**
     * value of the progress element
     */
    progressValue: number;
    /*
     * color of the progress element
     */
    progressColor?: string;
    /**
     * gradient colors of the progress element
     */
    gradientColors?: {
        offset: string;
        stopColor: string;
    }[];
    /**
     * background color of the progress element
     */
    progressBackground?: string;
    /**
     * width of the progress element
     */
    progressWidth?: string;
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

const props = withDefaults(defineProps<BluProgressProps>(), {
    progressValue: 0,    
    size: "md",
    labelType: "h2",
    labelLocation: "bottom",
});

// interface BluProgressSlots {
//     /**
//      * Slot for icon
//      */
//     icon?: string;
// }

// defineSlots<BluProgressSlots>();

const progress = computed(() => {
    return props.progressValue > 100 ? 100 : Math.round(props.progressValue) < 0 ? 0 : Math.round(props.progressValue);
});
</script>

<template>
    <section
        :disabled="disabled || loading"
        :class="[
            mergeClasses(
                [
                    usePaddingSizes(size).value,
                    'relative flex gap-4 items-center justify-between bg-gray-200 w-max',
                    labelLocation === 'top' || labelLocation === 'bottom'
                        ? 'flex-col'
                        : 'flex-row',
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

        <CircleSvg
            v-bind="{
                progressValue: progress,
                progressColor,
                progressBackground,
                progressWidth,
                gradientColors,
            }"
        />
    </section>
</template>
