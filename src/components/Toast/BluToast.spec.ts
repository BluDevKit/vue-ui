import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import BluToast from "./BluToast.vue";

describe("Button", () => {
    it("renders with label, style and classes", () => {
        const wrapper = mount(BluToast, {
            props: {
                size: "lg",
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
