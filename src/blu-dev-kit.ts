import "./assets/style.css";

import { App, Plugin } from "vue";
import * as components from "@/components/index";

const install: Exclude<Plugin["install"], undefined> = (app: App) => {
    Object.entries(components).forEach(([componentName, component]) => {
        app.component(componentName, component);
    });
};

export default install;
export * from "@/components/index";
export * from "@/modules/index";
