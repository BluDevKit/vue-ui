import type { Meta, StoryObj } from "@storybook/vue3";

import BluProgress from "./BluProgress.vue";
import { useTailwindTheme } from "@/utils/tailwind";

const hours = new Date().getHours();
const hoursInPercent = (hours / 24) * 100;

const meta: Meta<typeof BluProgress> = {
    title: "BluProgress",
    component: BluProgress,
    tags: ["autodocs"],
    args: {
        label: "Day completed",
        size: "md",
        progressValue: hoursInPercent,
    },
};

export default meta;
type Story = StoryObj<typeof BluProgress>;

/* 
 *Variants
 */
export const Basic: Story = {};
export const Gradient: Story = {
    args: {
        gradientColors: [
            {
                offset: "0%",
                stopColor: useTailwindTheme().colors.blu[600],
            },
            {
                offset: "100%",
                stopColor: useTailwindTheme().colors.red[400],
            },
        ],
    },
};

export const Completed: Story = {
    args: {
        label: "Completed",
        progressValue: 100,
    },
};

export const CompletedWithMark: Story = {
    args: {
        label: "Completed",
        progressValue: 100,
        showCompleteMark: true,
    },
};
