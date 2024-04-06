import type { Meta, StoryObj } from "@storybook/vue3";

import BluLoginForm from "./BluLoginForm.vue";

const meta: Meta<typeof BluLoginForm> = {
    title: "BluLoginForm",
    component: BluLoginForm,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BluLoginForm>;

/* 
 *Variants
 */
export const Basic: Story = {};
