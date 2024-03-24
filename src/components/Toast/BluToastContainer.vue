<script setup lang="ts">
import { useToastStore } from '@/stores/toasts';
import { watch } from "vue";
import BluToast from "./BluToast.vue";

export interface BluToastContainerProps {
    /**
     * Max toast messages per locations
     */
    maxToasts?: number;
}

const props = withDefaults(defineProps<BluToastContainerProps>(), {
    maxToasts: 10,
});

const toastStore = useToastStore();

watch(toastStore.toasts, () => {
    console.log("toasts changed");

    if (toastStore.topLeftToasts.length > props.maxToasts) {
        // toastStore.topLeftToasts.shift();
        console.log("topLeftToasts length", toastStore.topLeftToasts.length);
    }

    if (toastStore.topCenterToasts.length > props.maxToasts) {
        // toastStore.topCenterToasts.shift();
        console.log("topCenterToasts length", toastStore.topCenterToasts.length);
    }

    if (toastStore.topRightToasts.length > props.maxToasts) {
        // toastStore.topRightToasts.shift();
        console.log("topRightToasts length", toastStore.topRightToasts.length);
    }

    if (toastStore.bottomLeftToasts.length > props.maxToasts) {
        // toastStore.bottomLeftToasts.shift();
        console.log("bottomLeftToasts length", toastStore.bottomLeftToasts.length);
    }

    if (toastStore.bottomCenterToasts.length > props.maxToasts) {
        // toastStore.bottomCenterToasts.shift();
        console.log("bottomCenterToasts length",toastStore.bottomCenterToasts.length);
    }

    if (toastStore.bottomRightToasts.length > props.maxToasts) {
        // toastStore.bottomRightToasts.shift();
        console.log("bottomRightToasts length", toastStore.bottomRightToasts.length);
    }
});
</script>

<template>
    <section class="fixed pointer-events-none inset-1">
        <div
            id="top-left"
            class="z-[9994] absolute items-end flex flex-col gap-1 pointer-events-none top-2 left-2"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.topLeftToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
        <div
            id="top-center"
            class="z-[9995] absolute items-end flex flex-col gap-1 pointer-events-none top-2 inset-x-2 child:mx-auto"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.topCenterToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
        <div
            id="top-right"
            class="z-[9996] absolute items-end flex flex-col gap-1 pointer-events-none top-2 right-2"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.topRightToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
        <div
            id="bottom-left"
            class="z-[9997] absolute items-end flex flex-col gap-1 pointer-events-none bottom-2 left-2"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.bottomLeftToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
        <div
            id="bottom-center"
            class="z-[9998] absolute items-end flex flex-col gap-1 pointer-events-none bottom-2 inset-x-2 child:mx-auto"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.bottomCenterToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
        <div
            id="bottom-right"
            class="z-[9999] absolute items-end flex flex-col gap-1 pointer-events-none bottom-2 right-2"
        >
            <TransitionGroup name="toast" appear>
                <BluToast
                    v-for="toast in toastStore.bottomRightToasts"
                    :key="toast.id"
                    :message="toast.message"
                    :type="toast.type"
                    :toast="toast"
                />
            </TransitionGroup>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.toast-leave-active {
    position: absolute;
}
</style>
