import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

export function usePaddingSizes(size: string) {
    return computed(() =>
        twMerge([
            size === 'xs' && 'px-1 py-1 text-xs rounded-sm',
            size === 'sm' && 'px-2 py-1 text-sm rounded',
            size === 'md' && 'px-4 py-2 text-base rounded-md',
            size === 'lg' && 'px-6 py-3 text-lg rounded-lg',
            size === 'xl' && 'px-8 py-4 text-xl rounded-xl',
        ]));
}

export function usePaddingSizePosition(size: string) {
    return computed(() =>
        twMerge([
            size === 'xs' && 'right-1',
            size === 'sm' && 'right-2',
            size === 'md' && 'right-4',
            size === 'lg' && 'right-6',
        ]));
}
