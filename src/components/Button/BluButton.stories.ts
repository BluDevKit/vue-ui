import type { Meta, StoryObj } from '@storybook/vue3';

import BluButton from './BluButton.vue';

const meta: Meta<typeof BluButton> = {
    title: 'BluButton',
    component: BluButton,
    tags: ['autodocs'],
};
  
export default meta;
type Story = StoryObj<typeof BluButton>;

/* 
  Variants
*/
export const Primary: Story = {
    args: {
        default: 'Button',
        size: 'md',
    },
};