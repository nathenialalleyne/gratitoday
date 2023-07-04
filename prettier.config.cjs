/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    'semi': false,
    'singleQuote': true,
    'useTabs': true,
    'proseWrap': "always",
    'printWidth': 80,
    "endOfLine": 'lf',
    "trailingComma": "all",
};

module.exports = config;
