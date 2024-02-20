import { fileURLToPath, URL } from 'url';

export const getPath = (path: string) => fileURLToPath(new URL(`.storybook/${path}`, import.meta.url));
