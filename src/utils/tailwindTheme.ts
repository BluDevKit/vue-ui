import tailwindConfig from "@public/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwind = resolveConfig(tailwindConfig);
export function useTailwindTheme() {
    return tailwind.theme;
}
