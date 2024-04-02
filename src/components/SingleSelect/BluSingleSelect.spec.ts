import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import BluSingleSelect from "./BluSingleSelect.vue";

describe("Button", () => {
    it("renders with label, style and classes", () => {
        const wrapper = mount(BluSingleSelect, {
            props: {
                id: "select",
                label: "Test select",
                options: [
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                ],
            },
        });

        expect(wrapper.find("button").text()).toBe("Test Button");
        expect(wrapper.find("button").classes()).toContain("storybook-button");
        expect(wrapper.find("button").classes()).toContain("storybook-button--primary");
        expect(wrapper.find("button").classes()).toContain("storybook-button--large");
        expect(wrapper.find("button").attributes("style")).toBe("background-color: blue;");
    });
});
