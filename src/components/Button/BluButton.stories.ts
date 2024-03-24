import type { Meta, StoryObj } from '@storybook/vue3';

import BluButton from './BluButton.vue';

const meta: Meta<typeof BluButton> = {
    title: 'BluButton',
    component: BluButton,
    tags: ['autodocs'],
    args: {
        default: 'Button',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<typeof BluButton>;

/* 
 *Variants
 */
export const Basic: Story = {};
