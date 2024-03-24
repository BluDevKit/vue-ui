import type { Meta, StoryObj } from '@storybook/vue3';

import BluInput from './BluInput.vue';

const meta: Meta<typeof BluInput> = {
    title: 'BluInput',
    component: BluInput,
    tags: ['autodocs'],
    args: {
        id: 'input',
        label: 'Label',
        placeholder: 'Placeholder',
    },
};

export default meta;
type Story = StoryObj<typeof BluInput>;

/* 
 *Variants
 */
export const Basic: Story = {
    args: {
        id: 'input',
        label: 'Label',
        placeholder: 'Placeholder',
    },
};

export const Password: Story = {
    args: {
        modelValue: 'password',
        type: 'password',
    },
};

export const Search: Story = {
    args: {
        type: 'search',
    },
};

export const PrefixSuffix: Story = {
    args: {
        prefix: '+31',
        suffix: '€',
    },
};
