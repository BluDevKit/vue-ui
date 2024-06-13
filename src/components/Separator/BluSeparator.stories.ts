import type { Meta, StoryObj } from "@storybook/vue3";

import BluSeparator from "./BluSeparator.vue";

const meta: Meta<typeof BluSeparator> = {
    title: "BluSeparator",
    component: BluSeparator,
    tags: ["autodocs"],
    args: {
        separatorText: "or",
    },
};

export default meta;
type Story = StoryObj<typeof BluSeparator>;

/* 
 *Variants
 */
export const Basic: Story = {};
