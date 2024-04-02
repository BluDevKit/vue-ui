import { defineStore } from "pinia";
import { computed, reactive, readonly } from "vue";
import { BluToastProps } from "@/components";

interface ToastState {
    toasts: {
        "top-right": BluToastProps[];
        "top-center": BluToastProps[];
        "top-left": BluToastProps[];
        "bottom-right": BluToastProps[];
        "bottom-left": BluToastProps[];
        "bottom-center": BluToastProps[];
    };
}

export const useToastStore = defineStore("toasts", () => {
    const state: ToastState = reactive({
        toasts: {
            "top-right": [],
            "top-center": [],
            "top-left": [],
            "bottom-right": [],
            "bottom-left": [],
            "bottom-center": [],
        },
    });

    const addToast = (toast: BluToastProps) => {
        const location = toast?.location ?? "top-right";
        state.toasts[location].push(toast);
    };

    const removeToast = ({ id, location }: BluToastProps) => {
        if (!location) return;
        const index = state.toasts[location].findIndex((toast) => toast.id === id);
        if (index !== -1) {
            state.toasts[location!].splice(index, 1);
        }
    };

    const topLeftToasts = computed(() => state.toasts["top-left"]);
    const topCenterToasts = computed(() => state.toasts["top-center"]);
    const topRightToasts = computed(() => state.toasts["top-right"]);
    const bottomLeftToasts = computed(() => state.toasts["bottom-left"]);
    const bottomCenterToasts = computed(() => state.toasts["bottom-center"]);
    const bottomRightToasts = computed(() => state.toasts["bottom-right"]);

    return {
        toasts: readonly(state.toasts),
        addToast,
        removeToast,
        topLeftToasts,
        topCenterToasts,
        topRightToasts,
        bottomLeftToasts,
        bottomCenterToasts,
        bottomRightToasts,
    };
});
