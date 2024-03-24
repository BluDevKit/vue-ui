import type { Meta, StoryObj } from '@storybook/vue3';

import BluTextarea from './BluTextarea.vue';

const meta: Meta<typeof BluTextarea> = {
    title: 'BluTextarea',
    component: BluTextarea,
    tags: ['autodocs'],
    args: {
        id: 'textarea',
        label: 'Textarea Label',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<typeof BluTextarea>;

/* 
 *Variants
 */
export const Basic: Story = {};
