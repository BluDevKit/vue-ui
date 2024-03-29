<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BluProgressProps } from "./BluProgress.vue";

const props = withDefaults(
    defineProps<
        Pick<
            BluProgressProps,
            | "progressValue"
            | "progressUnit"
            | "unitLocation"
            | "progressColor"
            | "gradientColors"
            | "progressBackground"
            | "progressWidth"
            | "showCompleteMark"
        >
    >(),
    {
        progressValue: 0,
        progressUnit: "%",
        progressColor: "var(--default-color)",
        progressBackground: "var(--default-background)",
        progressWidth: "var(--default-width)",
    }
);
const fullCircle = 478;

const stylingWidth = computed(
    () => fullCircle - (fullCircle * props.progressValue) / 100
);

const circles = ref<HTMLElement | null>(null);
onMounted(() => {
    (circles.value!.children[1] as SVGElement).onanimationend = (e) => {
        (e.target as HTMLElement)?.classList.remove("animate");
    };
});
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
            '--progress-unit':
                unitLocation === 'left'
                    ? `'${progressUnit}' attr(aria-valuenow)`
                    : `attr(aria-valuenow) '${progressUnit}'`,
            '--progress-color': `${gradientColors?.length! > 0 ? 'url(#GradientColor)' : progressColor}`,
            '--progress-background': `${progressBackground}`,
            '--progress-width': `${progressWidth}`,
        }"
        :class="{
            'show-mark': showCompleteMark,
        }"
    >
        <svg
            ref="circles"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            height="100%"
            width="100%"
        >
            <circle
                v-for="index in 3"
                :key="index"
                :class="[index === 2 ? 'animate' : '']"
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
    --default-color: theme("colors.blu.500");
    --default-background: theme("colors.blu.900");
    --default-width: 1rem;
    --dasharray: 478;
    --value-dasharray: v-bind(stylingWidth);

    position: relative;
    display: grid;
    place-items: center;
    width: 12rem;
    height: 12rem;
    font-weight: bold;
    font-size: x-large;

    &::before {
        grid-area: 1 / 1;
        content: var(--progress-unit);
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

            &:nth-of-type(1) {
                filter: drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.5));
            }

            &:nth-of-type(2) {
                stroke: var(--progress-color);
                stroke-dasharray: var(--dasharray);
                stroke-dashoffset: var(--value-dasharray);
                transition: stroke-dashoffset 0.3s ease-in-out;
            }
            &:nth-of-type(2).animate {
                animation: progress 1.3s ease-in-out forwards;
            }
            &:nth-of-type(3) {
                opacity: 0;
                fill: transparent;
                stroke: transparent;
                transition: fill 0.3s ease-out;
            }
        }
    }

    &.show-mark[aria-valuenow="100"]:not(:has(circle.animate)) {
        &::before {
            content: "✓";
            z-index: 99;
            font-size: 5rem;
            font-weight: bold;
            filter: drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.5));
        }

        svg circle:nth-of-type(3) {
            @apply fill-blu-400 bg-opacity-50;
            opacity: 1;
        }
    }

    defs {
        position: absolute;
    }

    @keyframes progress {
        from {
            stroke-dashoffset: var(--dasharray);
        }
        to {
            stroke-dashoffset: var(--value-dasharray);
        }
    }
}
</style>
