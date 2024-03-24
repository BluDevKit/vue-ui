<script setup lang="ts">
import { BluProgressProps } from "./BluProgress.vue";

const props = withDefaults(defineProps<
        Pick<
            BluProgressProps,
            | "progressValue"
            | "progressColor"
            | "gradientColors"
            | "progressBackground"
            | "progressWidth"
        >
    >(), {
    progressValue: 0,
    progressColor: "var(--default-color)",
    progressBackground: "var(--default-background)",
    progressWidth: "var(--default-width)",
});

console.log(props);
</script>
<template>
    <div
        role="progressbar"
        :aria-valuenow="progressValue"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-live="polite"
        :style="{
            '--progress': `${progressValue}`,
            '--progress-color': `${gradientColors?.length! > 0 ? 'url(#GradientColor)' : progressColor}`,
            '--progress-background': `${progressBackground}`,
            '--progress-width': `${progressWidth}`,
        }"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            height="100%"
            width="100%"
        >
            <circle
                v-for="index in 2"
                :key="index"
                r="40%"
                cx="50%"
                cy="50%"
                stroke-linecap="round"
            />
            <defs>
                <linearGradient
                    id="GradientColor"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        v-for="color in gradientColors"
                        :key="color.offset"
                        :offset="color.offset"
                        :stop-color="color.stopColor"
                    />
                </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
div[role="progressbar"] {
    --default-color: theme('colors.blu.500');
    --default-background: theme('colors.blu.900');
    --default-width: 1rem;
    --dasharray: 478;

    position: relative;
    display: grid; 
    place-items: center;
    width: 12rem;
    height: 12rem;
    font-weight: bold;
    font-size: x-large;

    &::before {
        grid-area: 1 / 1;
        content: attr(aria-valuenow);
        display: grid;
        place-items: center;
    }

    svg {
        grid-area: 1 / 1;
        display: block;
        margin: 0 auto;
        transform: rotate(-90deg);
        transform-origin: center;
        
        circle {
            fill: transparent;
            stroke-width: var(--progress-width);
            stroke: var(--progress-background);

            &:nth-of-type(2) {
                stroke: var(--progress-color);
                stroke-dasharray: var(--dasharray);
                stroke-dashoffset: calc(var(--dasharray) - (var(--dasharray) * var(--progress)) / 100);
                animation: progress 2s linear forwards;
            }
        }
    }

    defs{
        position: absolute;
    }
}
</style>
