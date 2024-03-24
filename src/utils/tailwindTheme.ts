import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@public/tailwind.config'

const tailwind = resolveConfig(tailwindConfig);
export function useTailwindTheme() {
    return tailwind.theme;
}
