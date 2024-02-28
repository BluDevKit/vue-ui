import { h } from 'vue';

const TabOne = h('div', {
    innerText: 'Tab test component',
});
const TabTwo = h('div', {
    innerText: 'Tab test component 2',
});

const TabThree = h('div', {
    innerText: 'Tab test component 3',
});

export const tabs = [
    {
        label: 'Tab 1',
        name: 'TabOne',
        component: TabOne,
    },
    {
        label: 'Tab 2',
        name: 'TabTwo',
        component: TabTwo,
    },
    {
        label: 'Tab 3',
        name: 'TabThree',
        component: TabThree,
    },
];
