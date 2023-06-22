/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    printWidth: 100,
    singleQuote: true,
    trailingComma: "es5",
    bracketSameLine: false,
};

module.exports = config;
