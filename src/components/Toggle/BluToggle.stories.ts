import type { Meta, StoryObj } from '@storybook/vue3';

import BluToggle from './BluToggle.vue';

const meta: Meta<typeof BluToggle> = {
    title: 'BluToggle',
    component: BluToggle,
    tags: ['autodocs'],
    args: {
        id: 'checkbox',
        label: 'Checkbox',
    },
};

export default meta;
type Story = StoryObj<typeof BluToggle>;

/* 
 *Variants
 */
export const Basic: Story = {};
