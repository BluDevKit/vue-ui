<script lang="ts" setup>
import { ref } from "vue";
import { useTimeout } from "@/composables/useTimeout";
import { useToastStore } from "@/stores/toasts";
import { mergeClasses } from "@/utils/tailwind";

export interface BluToastProps {
    /**
     * classes to overwrite classes for the button
     */
    twClasses?: string;

    /**
     * Message to display
     */
    message?: string;

    /**
     * whether the button is disabled
     */
    dismissable?: boolean;

    /**
     * whether the button is full width
     */
    fullWidth?: boolean;

    /**
     * length of time the toast should be displayed
     */
    timeout?: number;

    /**
     * type of the toast
     */
    type?: "success" | "warning" | "danger" | "info";

    /**
     * type of the toast
     */
    location?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

    /**
     * whether to teleport the toast
     */
    teleport?: string;

    /**
     * whether the toast timer is visible
     */
    timerVisible?: boolean;

    /**
     * id to target toast
     */
    id?: string;
}

const props = withDefaults(defineProps<BluToastProps>(), {
    type: "success",
    teleport: "body",
    dismissable: true,
    timeout: 0,
});

interface BluToastEmits {
    /**
     * Event emitted when input is focused
     */
    (event: "close", $event: Event): void;
}

const emit = defineEmits<BluToastEmits>();

interface bluButtonSlots {
    /**
     * Slot for left icon
     */
    icon?: string;
    /**
     * Slot for label
     */
    default?: string;

    /**
     * Slot for close
     */
    
    close?: string;
}

defineSlots<bluButtonSlots>();

const toastStore = useToastStore();
const playTimer = ref(true);

const { pause, resume } = useTimeout(() => {
    closeToast(new Event("close"));
}, {
    delay: props.timeout,
    startImmediately: props.timeout > 0,
});

const toggleTimeout = () => {
    if (props.timeout === 0) return;

    playTimer.value = !playTimer.value;
    if (playTimer.value) {
        resume();
    } else {
        pause();
    }
};

const closeToast = (e: Event) => {
    toastStore.removeToast({
        id: props.id,
        location: props.location,
    });
    emit("close", e);
};
</script>

<template>
    <section
        :class="[
            mergeClasses(
                [
                    'relative flex justify-between items-center p-4 rounded-md border gap-1 pointer-events-auto',
                    type === 'success'
                        ? 'border-green-400 bg-green-100 bg-gradient-to-r from-green-100 to-green-200 text-green-800'
                        : '',
                    type === 'warning'
                        ? 'border-yellow-400 bg-yellow-100 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800'
                        : '',
                    type === 'danger'
                        ? 'border-red-400 bg-red-100 bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                        : '',
                    type === 'info'
                        ? 'border-blue-400 bg-blue-100 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800'
                        : '',
                    !dismissable ? 'justify-start' : '',
                    fullWidth ? 'w-full' : 'w-max',
                ],
                twClasses || ''
            ),
        ]"
        @mouseenter="toggleTimeout"
        @mouseleave="toggleTimeout"
    >
        <slot name="icon">
            <span v-if="type === 'success'">👍</span>
            <span v-else-if="type === 'warning'">⚠️</span>
            <span v-else-if="type === 'danger'">🔥</span>
            <span v-else-if="type === 'info'">ℹ️</span>
        </slot>
        <p>
            <slot>
                {{ message }}
            </slot>
        </p>
        <slot v-if="dismissable" name="close">
            <button class="p-1 rounded-md" @click="closeToast">
                <span>❌</span>
            </button>
        </slot>
        <div id="timer" class="absolute inset-x-0 bottom-0">
            <span
                v-if="timerVisible && timeout > 0"
                class="block h-1"
                :class="[
                    type === 'success' ? 'bg-green-400' : '',
                    type === 'warning' ? 'bg-yellow-400' : '',
                    type === 'danger' ? 'bg-red-400' : '',
                    type === 'info' ? 'bg-blue-400' : '',
                ]"
                :style="{
                    'animation-duration': timeout + 'ms',
                    'animation-play-state': playTimer ? 'running' : 'paused',
                }"
            />
        </div>
    </section>
</template>

<style lang="scss" scoped>
#timer {
    border-radius: inherit;

    span {
        border-radius: inherit;
        animation: timer ease-in-out forwards;
    }
}

@keyframes timer {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}
</style>
@/utils/tailwind
