const { postcss } = require("./config");

const basePlugins = {
    "postcss-nested": {},
    "postcss-preset-env": {},
    "postcss-css-variables": {
        variables: {
            ...postcss.variables
        }
    },
    autoprefixer: ["last 2 version", "> 1%", "not dead", "ie <= 10"],
};

module.exports = {
    use: [
        "postcss-import",
        "postcss-nested",
        "postcss-preset-env",
        "autoprefixer",
        "postcss-css-variables",
        "postcss-color-function",
    ].concat(process.env.NODE_ENV === "production" ? ["cssnano"] : []),
    plugins: Object.assign(
        {},
        basePlugins,
        process.env.NODE_ENV === "production"
            ? {
                  cssnano:
                      process.env.NODE_ENV === "production"
                          ? {
                                preset: "default"
                            }
                          : undefined
              }
            : {}
    )
};
