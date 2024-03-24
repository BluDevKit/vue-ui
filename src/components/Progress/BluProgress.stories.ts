import type { Meta, StoryObj } from '@storybook/vue3';

import BluProgress from './BluProgress.vue';

const hours = new Date().getHours();
const hoursInPercent = (hours / 24) * 100;

const meta: Meta<typeof BluProgress> = {
    title: 'BluProgress',
    component: BluProgress,
    tags: ['autodocs'],
    args: {
        // icon: 'check',
        label: 'Count',
        size: 'md',
        value: hoursInPercent,
    },
};

export default meta;
type Story = StoryObj<typeof BluProgress>;

/* 
 *Variants
 */
export const Basic: Story = {};
