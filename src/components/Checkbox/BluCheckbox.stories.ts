import type { Meta, StoryObj } from '@storybook/vue3';

import BluCheckbox from './BluCheckbox.vue';

const meta: Meta<typeof BluCheckbox> = {
    title: 'BluCheckbox',
    component: BluCheckbox,
    tags: ['autodocs'],
    args: {
        id: 'checkbox',
        label: 'Checkbox',
    },
};

export default meta;
type Story = StoryObj<typeof BluCheckbox>;

/* 
  Variants
*/
export const Basic: Story = {};
