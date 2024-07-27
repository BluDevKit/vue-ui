import type { Meta, StoryObj } from "@storybook/vue3";

import BluMarquee from "./BluMarquee.vue";

const meta: Meta<typeof BluMarquee> = {
    title: "BluMarquee",
    component: BluMarquee,
    tags: ["autodocs"],
    args: {
        horizontalText: "This is a horizontal marquee",
        items: [],
        type: "text",
    },
};

export default meta;
type Story = StoryObj<typeof BluMarquee>;

/* 
 *Variants
 */
export const Text: Story = {
    args: {
        horizontalText: "This is a horizontal marquee",
    },
};

export const Icons: Story = {
    args: {
        horizontalText: "",
        items: [
            {
                icon: "fas fa-rocket",
                url: "https://www.google.com",
            },
            {
                icon: "fas fa-rocket",
                url: "https://www.google.com",
            },
            {
                icon: "fas fa-rocket",
                url: "https://www.google.com",
            },
        ],
        type: "icon-items",
    }
};

export const Images: Story = {
    args: {
        horizontalText: "",
        items: [
            {
                image: {
                    src: "https://via.placeholder.com/150",
                    alt: "Placeholder image",
                },
                url: "https://www.google.com",
            },
            {
                image: {
                    src: "https://via.placeholder.com/150",
                    alt: "Placeholder image",
                },
                url: "https://www.google.com",
            },
            {
                image: {
                    src: "https://via.placeholder.com/150",
                    alt: "Placeholder image",
                },
                url: "https://www.google.com",
            },
        ],
        type: "image-items",
    },
};
