import type { Meta, StoryObj } from "@storybook/vue3";

import BluSingleSelect from "./BluSingleSelect.vue";

const meta: Meta<typeof BluSingleSelect> = {
    title: "BluSingleSelect",
    component: BluSingleSelect,
    tags: ["autodocs"],
    args: {
        id: "select",
        label: "Select Label",
        options: [
            {
                value: "1",
                label: "Option 1",
            },
            {
                value: "2",
                label: "Option 2",
            },
            {
                value: "3",
                label: "Option 3",
            },
            {
                value: "4",
                label: "Option 4",
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof BluSingleSelect>;

/* 
 *Variants
 */
export const Basic: Story = {
    args: {
        default: "Button",
    },
};

export const Searchable: Story = {
    args: {
        showSearch: true,
    },
};
