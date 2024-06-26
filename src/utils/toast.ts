import {
    App, Plugin, h, render, 
} from "vue";
import { BluToastContainer } from "@/components/Toast";
import type { BluToastProps } from "@/components/Toast";
import { useToastStore } from "@/stores/toasts";

let mainApp: App | null = null;
const CONTAINER_ID = "toast-overlay" as const;

interface BluToastOptions {
    maxToasts: number;
}

export const bluDevKitUtils: Plugin = {
    install(app: App, options: BluToastOptions) {
        mainApp = app;

        const toastContainer = h(BluToastContainer, {
            maxToasts: options.maxToasts,
            id: CONTAINER_ID,
        });
        render(toastContainer, document.body);
    },
};

export const useBluToast = {
    create: (options: BluToastProps): void => {
        if (!mainApp) return;

        const toastStore = useToastStore();
        toastStore.addToast({
            ...options,
            id: Math.random().toString(36).substring(7),
        });
    },
};
