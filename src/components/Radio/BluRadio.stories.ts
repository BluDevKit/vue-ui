import type { Meta, StoryObj } from '@storybook/vue3';

import BluRadio from './BluRadio.vue';

const meta: Meta<typeof BluRadio> = {
    title: 'BluRadio',
    component: BluRadio,
    tags: ['autodocs'],
    args: {
        id: 'radio',
        label: 'Radio',
        name: 'radio',
    },
};

export default meta;
type Story = StoryObj<typeof BluRadio>;

/* 
  Variants
*/
export const Basic: Story = {};
