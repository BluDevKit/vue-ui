import { BluToast } from '@/components';
import { BluToastProps } from '@/components/Toast/BluToast.vue';
import { App, createApp, h } from 'vue';

let mainApp: App | null = null;
let container: HTMLElement | null = null;
const CONTAINER_ID = 'toast-overlay' as const;
export const bluDevKitUtils: any = {
    install(app: App) {
        mainApp = app;

        const toastContainer = document.createElement('section');
        toastContainer.id = CONTAINER_ID;
        toastContainer?.setAttribute(
            'class',
            'fixed inset-0 z-50 pointer-events-none'
        );
        toastContainer.innerHTML = `
            <div id="top-left" class="absolute pointer-events-auto flex flex-col gap-1 top-2 left-2"></div>
            <div id="top-center" class="absolute pointer-events-auto flex flex-col gap-1 top-2 inset-x-2 child:mx-auto"></div>
            <div id="top-right" class="absolute pointer-events-auto flex flex-col gap-1 top-2 right-2"></div>
            <div id="bottom-left" class="absolute pointer-events-auto flex flex-col gap-1 bottom-2 left-2"></div>
            <div id="bottom-center" class="absolute pointer-events-auto flex flex-col gap-1 bottom-2 inset-x-2 child:mx-auto"></div>
            <div id="bottom-right" class="absolute pointer-events-auto flex flex-col gap-1 bottom-2 right-2"></div>
        `;

        document.body.appendChild(toastContainer);
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
