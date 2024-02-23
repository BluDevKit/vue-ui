import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'

export function usePaddingSizes(size: string) {
    return computed(() => twMerge([
        size === 'sm' && 'px-2 py-1 text-sm rounded-sm',
        size === 'md' && 'px-4 py-2 text-base rounded-md',
        size === 'lg' && 'px-6 py-3 text-lg rounded-lg',
        size === 'xl' && 'px-8 py-4 text-xl rounded-xl',
    ]))
}