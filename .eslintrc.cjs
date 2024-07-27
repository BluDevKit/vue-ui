module.exports = {
    root: true,
    extends: [
        "@nuxt/eslint-config",
        "plugin:nuxt/recommended",
        "plugin:vue/vue3-recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
        "vue/html-indent": ["error", 4],
        "vue/multi-word-component-names": "off",
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "always",
                "component": "always",
            },
            "svg": "always",
        }],
        "vue/max-attributes-per-line": ["error", {
            singleline: {
                max: 3,
            },
            multiline: {
                max: 1,
            },
        }],
        "vue/first-attribute-linebreak": ["error", {
            "singleline": "beside",
            "multiline": "below"
        }],
        "vue/require-default-prop": "off",
        "vue/component-name-in-template-casing": ["error", "PascalCase",{
            registeredComponentsOnly: false,
            ignores: [],
        }],
        "vue/singleline-html-element-content-newline": ["error",{
            ignoreWhenNoAttributes: true,
            ignoreWhenEmpty: true,
            ignores: ["pre", "textarea"],
        }],
        "vue/padding-line-between-tags": ["error", [
            { "blankLine": "consistent", "prev": "*", "next": "*" }
        ]],
        'vue/no-multiple-template-root': 'off',
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "always"
        }]
    },
};
