import type { Meta, StoryObj } from '@storybook/vue3';

import BluToast from './BluToast.vue';
import { BluButton } from '@/components/Button';
import { useBluToast } from '@/utils';

const meta: Meta<typeof BluToast> = {
    title: 'BluToast',
    component: BluToast,
    tags: ['autodocs'],
    args: {
        teleport: '.docs-story div:first-child',
        message: 'This is a toast message',
        timeout: 0,
        visible: true,
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
        components: { BluToast, BluButton },
        template: `
        <section class="flex flex-col gap-1">
            <BluButton @click="createToast" class="mb-2" autofocus>
                Create Toast
            </BluButton>
            <section id="toasts" class="flex flex-col gap-1"></section>
        </section>
        `,
    }),
};

export default meta;
type Story = StoryObj<typeof BluToast>;

/* 
  Variants
*/
export const Basic: Story = {};

export const timeout: Story = {
    args: {
        timeout: 3000,
        timerVisible: true,
    },
};
