import type { Meta, StoryObj } from '@storybook/vue3';

import BluMultiSelect from './BluMultiSelect.vue';

const meta: Meta<typeof BluMultiSelect> = {
    title: 'BluMultiSelect',
    component: BluMultiSelect,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BluMultiSelect>;

/* 
 *Variants
 */
export const Basic: Story = {
    args: {
        default: 'Button',
        size: 'md',
    },
};
