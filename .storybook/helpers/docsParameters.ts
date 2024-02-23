// docsParameters.ts
import {
    DocgenPropType,
    hasDocgen,
    extractComponentProps,
    convert,
} from '@storybook/docs-tools';
import type { InputType, SBType } from '@storybook/types';
import type { Prop } from 'vue';

type DocgenExtendedPropType = DocgenPropType & {
    elements?: DocgenExtendedPropType[];
    names?: [string];
};

const SECTIONS = ['props', 'events', 'slots', 'methods'] as const;

function toEventName(name: string) {
    return `on${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function getUnionTypes(
    docgenType: DocgenExtendedPropType | undefined,
): string[] {
    if (docgenType?.name === 'Array') return [`${docgenType.elements?.map((v) => v.name).join('|')}[]`];
    return (
        docgenType?.elements?.flatMap((v) => (v.elements ? getUnionTypes(v) : [v.name])) ?? []
    );
}

function isStringType(unionTypes: string[]) {
    return (
        unionTypes.length > 0
        && unionTypes.every(
            (t) => t === 'string' || (t.startsWith('"') && t.endsWith('"')),
        )
    );
}

/**
 * Same as Storybook `extractArgTypes` with the following changes:
 * - Remove control from events and methods.
 * - Add `on` prefix to events, so that `actions: { argTypesRegex: '^on[A-Z].*' }` can be used.
 * - Get event types from TS `defineEmits`. docgen info has it in `names` prop.
 * - Set types on `update:[prop]` events based on [prop] type
 * - Add all props not defined by docgen info in a group called "other props"
 * - Expand union type and use radio/select control when values are strings
 * - Expand array types
 * @see https://github.com/storybookjs/storybook/blob/d5ca2f42838c9f5a3e556a5e819e58f0deff522e/code/renderers/vue3/src/docs/extractArgTypes.ts
 */
export function extractArgTypes(component: any) {
    if (!hasDocgen(component)) return null;
    const results: Record<string, InputType> = {};
    SECTIONS.forEach((section) => {
        extractComponentProps(component, section).forEach(
            ({ propDef, docgenInfo, jsDocTags }) => {
                const {
                    name, type, description, defaultValue, required,
                } = propDef;
                const sbType = section === 'props'
                    ? convert(docgenInfo)
                    : { name: 'void' };
                const docgenType: DocgenExtendedPropType | undefined = docgenInfo.type;
                const unionTypes = getUnionTypes(docgenType);
                const summary = unionTypes.join(' | ')
                    || type?.summary
                    || docgenType?.names?.[0];
                const inputType: InputType = {
                    name,
                    description,
                    type: isStringType(unionTypes)
                        ? { required, name: 'string' }
                        : { required, ...sbType },
                    table: {
                        type: {
                            ...type,
                            summary,
                        },
                        jsDocTags,
                        defaultValue,
                        category: section,
                    },
                };
                if (section === 'events') {
                    inputType.control = null;
                    inputType.type = 'function';
                    const propName = /^update:(.+)$/.exec(name)?.[1];
                    const result = results[propName!];
                    if (result) {
                        inputType.table.type = result.table.type;
                    }
                } else if (isStringType(unionTypes)) {
                    const options: (string | undefined)[] = unionTypes
                        .map((t) => /^"(.+)"$/.exec(t)?.[1])
                        .filter(Boolean);

                    if (!required) options.unshift(`no ${name} selected`);

                    inputType.options = options;
                    // todo: set standard value 
                    inputType.control = {
                        type: options.length <= 5 ? 'radio' : 'select',
                        // labels: { undefined: '𝘶𝘯𝘥𝘦𝘧𝘪𝘯𝘦𝘥' },
                        // value: options[0],
                    };
                } else if (type?.summary === 'unknown') { // todo: set control type
                    inputType.control = {
                        type: 'text',
                    };
                }

                const argName = section === 'events' ? toEventName(name) : name;
                results[argName] = inputType;
            },
        );
    });
    return results;
}
