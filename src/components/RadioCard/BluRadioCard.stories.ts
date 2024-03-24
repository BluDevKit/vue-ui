import type { Meta, StoryObj } from '@storybook/vue3';

import BluRadioCard from './BluRadioCard.vue';

const meta: Meta<typeof BluRadioCard> = {
    title: 'BluRadioCard',
    component: BluRadioCard,
    tags: ['autodocs'],
    args: {
        id: 'radio-card',
        default: 'Radio Card',
        ariaLabel: 'Radio Card',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<typeof BluRadioCard>;

/* 
 *Variants
 */
export const Basic: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
