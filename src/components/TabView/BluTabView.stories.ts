import type { Meta, StoryObj } from "@storybook/vue3";

import { tabs } from "../helpers";
import { BluTabView } from "../TabView";

const meta: Meta<typeof BluTabView> = {
    title: "BluTabView",
    component: BluTabView,
    tags: ["autodocs"],
    args: {
        // options: tabs,
        activeTabIndex: 0,
    },
};

export default meta;
type Story = StoryObj<typeof BluTabView>;

/* 
 *Variants
 */
export const TwoItems: Story = {
    args: {
        options: tabs.slice(0, 2),
    },
};

export const ThreeItems: Story = {
    args: {
        options: tabs.slice(0, 3),
    },
};

export const FourItems: Story = {
    args: {
        options: tabs,
    },
};

