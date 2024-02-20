import "./assets/style.css";

import * as components from '@/components/index';
import { App, Plugin } from 'vue';

const install: Exclude<Plugin['install'], undefined> = (app: App) => {
    Object.entries(components).forEach(([componentName, component]) => {
        app.component(componentName, component)
    });
};

export default install 
export * from '@/components/index';
