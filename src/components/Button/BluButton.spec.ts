import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BluButton from './BluButton.vue';

describe('Button', () => {
  it('renders with label, style and classes', () => {
    const wrapper = mount(BluButton, {
        props: {
            size: 'lg',
        },
        slots: {
            default: 'Test Button'
        }
    });

    expect(wrapper.find('button').text()).toBe('Test Button');
    expect(wrapper.find('button').classes()).toContain('storybook-button');
    expect(wrapper.find('button').classes()).toContain('storybook-button--primary');
    expect(wrapper.find('button').classes()).toContain('storybook-button--large');
    expect(wrapper.find('button').attributes('style')).toBe('background-color: blue;');
  });
});