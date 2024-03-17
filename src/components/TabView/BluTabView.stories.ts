import type { Meta, StoryObj } from '@storybook/vue3';

import BluTabView from './BluTabView.vue';
import { tabs } from '../helpers';

const meta: Meta<typeof BluTabView> = {
    title: 'BluTabView',
    component: BluTabView,
    tags: ['autodocs'],
    args: {
        options: tabs,
        activeTabIndex: 0,
    },
};

export default meta;
type Story = StoryObj<typeof BluTabView>;

/* 
  Variants
*/
export const Basic: Story = {};
