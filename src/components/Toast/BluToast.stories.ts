import type { Meta, StoryObj } from "@storybook/vue3";

import BluToast from "./BluToast.vue";
import BluToastContainer from "./BluToastContainer.vue";
import { BluButton } from "@/components/Button";
import { useBluToast } from "@/utils/toast";

const meta: Meta<typeof BluToast> = {
    title: "BluToast",
    component: BluToast,
    tags: ["autodocs"],
    args: {
        message: "This is a toast message",
        timeout: 0,
        location: "top-right",
        type: "info",
    },
    render: (args) => ({
        setup() {
            const createToast = () => {
                useBluToast.create({
                    ...args,
                    // teleport: '#toasts',
                });
            };

            return {
                createToast,
            };
        },
        components: { BluToast, BluButton, BluToastContainer },
        template: `
        <section class="flex flex-col gap-1">
            <BluButton @click="createToast" class="mb-2" autofocus>
                Create Toast
            </BluButton>
            <BluToastContainer />
        </section>
        `,
    }),
};

export default meta;
type Story = StoryObj<typeof BluToast>;

/* 
 *Variants
 */
export const Basic: Story = {};

export const Timeout: Story = {
    args: {
        timeout: 3000,
        timerVisible: true,
    },
};
