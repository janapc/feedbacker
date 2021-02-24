module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "max-len": "off",
    "no-param-reassign": ["error", { props: false }],
    "import/no-mutable-exports": "off",
    "global-require": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
