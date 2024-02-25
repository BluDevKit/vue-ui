import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BluInput from './BluInput.vue';

describe('Button', () => {
    it('renders with label, style and classes', () => {
        const wrapper = mount(BluInput, {
            props: {
                id: 'input',
                label: 'Test Button',
            },
            slots: {
                default: 'Test Button',
            },
        });

        expect(wrapper.find('button').text()).toBe('Test Button');
        expect(wrapper.find('button').classes()).toContain('storybook-button');
        expect(wrapper.find('button').classes()).toContain(
            'storybook-button--primary'
        );
        expect(wrapper.find('button').classes()).toContain(
            'storybook-button--large'
        );
        expect(wrapper.find('button').attributes('style')).toBe(
            'background-color: blue;'
        );
    });
});