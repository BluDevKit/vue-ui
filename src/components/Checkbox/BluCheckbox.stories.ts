import type { Meta, StoryObj } from '@storybook/vue3';

import BluCheckbox from './BluCheckbox.vue';

const meta: Meta<typeof BluCheckbox> = {
    title: 'BluCheckbox',
    component: BluCheckbox,
    tags: ['autodocs'],
};
  
export default meta;
type Story = StoryObj<typeof BluCheckbox>;

/* 
  Variants
*/
export const Primary: Story = {
    args: {
        id: 'checkbox',
        size: 'md',
        label: 'Checkbox',
    },
};