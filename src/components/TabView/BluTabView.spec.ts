import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BluTabView from './BluTabView.vue';
import { tabs } from '../helpers';

describe('Button', () => {
    it('renders with label, style and classes', () => {
        const wrapper = mount(BluTabView, {
            props: {
                options: tabs,
            },
        });

        expect(wrapper.find('button').text()).toBe('Test Button');
        expect(wrapper.find('button').classes()).toContain('storybook-button');
        expect(wrapper.find('button').classes()).toContain('storybook-button--primary');
        expect(wrapper.find('button').classes()).toContain('storybook-button--large');
        expect(wrapper.find('button').attributes('style')).toBe('background-color: blue;');
    });
});
