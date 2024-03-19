import { BluToast, BluToastContainer } from '@/components/Toast';
import type { BluToastProps } from '@/components/Toast';
import { App, createApp, createVNode, h, render } from 'vue';

let mainApp: App | null = null;
let container: HTMLElement | null = null;
const CONTAINER_ID = 'toast-overlay' as const;

interface BluToastOptions {
    maxToasts: string;
}

export const bluDevKitUtils: any = {
    install(app: App, options: BluToastOptions) {
        mainApp = app;

        const toastContainer = createVNode(BluToastContainer, {
            ...options,
            id: CONTAINER_ID,
        });

        render(toastContainer, document.body);
    },
};

export const useBluToast = {
    create: (options: BluToastProps) => {
        if (!mainApp) return null;

        const toast = h(
            BluToast,
            {
                teleport: `#${CONTAINER_ID} #${options.location}`,
                ...options,
            },
            {
                default: () => options.message,
            }
        );

        const toastApp = createApp({
            render: () => toast,
        });

        container = document.createElement('div');
        document.body.appendChild(container);
        toastApp.mount(container);
    },
};
