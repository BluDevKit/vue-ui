import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import BluProgress from "./BluProgress.vue";

describe("Button", () => {
    it("renders with label, style and classes", () => {
        const wrapper = mount(BluProgress, {
            props: {
                size: "lg",
                label: "Count",
                value: 50,
            },
            slots: {
                default: "Test Button",
            },
        });

        expect(wrapper.find("button").text()).toBe("Test Button");
        expect(wrapper.find("button").classes()).toContain("storybook-button");
        expect(wrapper.find("button").classes()).toContain("storybook-button--primary");
        expect(wrapper.find("button").classes()).toContain("storybook-button--large");
        expect(wrapper.find("button").attributes("style")).toBe("background-color: blue;");
    });
});
