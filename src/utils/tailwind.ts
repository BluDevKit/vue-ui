import tailwindConfig from "@public/tailwind.config";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwind = resolveConfig(tailwindConfig);
export function useTailwindTheme() {
    return tailwind.theme;
}

export function mergeClasses(defaultClasses: string | string[], additionalClasses: string): string {
    return twMerge(defaultClasses, additionalClasses);
}
