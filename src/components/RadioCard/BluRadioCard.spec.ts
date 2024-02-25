import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BluRadioCard from './BluRadioCard.vue';

describe('Button', () => {
    it('renders with label, style and classes', () => {
        const wrapper = mount(BluRadioCard, {
            props: {
                id: 'radio-card',
                ariaLabel: 'Radio Card',
                size: 'md',
            },
            slots: {
                default: 'Test Radio Card',
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
