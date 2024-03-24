// src/utils/tailwindMerge.ts

import { twMerge } from 'tailwind-merge';

export function mergeClasses(defaultClasses: string | string[], additionalClasses: string): string {
    return twMerge(defaultClasses, additionalClasses);
}
