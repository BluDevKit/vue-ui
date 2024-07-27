import { h } from "vue";

const TabOne = h("div", {
    innerText: "Tab test component",
});
const TabTwo = h("div", {
    innerText: "Tab test component 2",
});

const TabThree = h("div", {
    innerText: "Tab test component 3",
});

const TabFour = h("div", {
    innerText: "Tab test component 4",
});

export const tabs = [
    {
        label: "Tab 1 more",
        name: "TabOne",
        component: TabOne,
    },
    {
        label: "Tab 2 tes",
        name: "TabTwo",
        component: TabTwo,
    },
    {
        label: "Tab 3 test",
        name: "TabThree",
        component: TabThree,
    },
    {
        label: "Tab 4",
        name: "TabFour",
        component: TabFour,
    },
];
