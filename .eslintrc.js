module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "jest", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  rules: {
    "brace-style": "error",
    "curly": ["error"],
    "eol-last": ["error", "always"],
    "import/order": ["error"],
    "prettier/prettier": ["error", { "singleQuote": true }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "semi": "off",
    "@typescript-eslint/no-unused-vars": ["error", {"varsIgnorePattern": "^_", "args": "none"}],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-use-before-define": ["error", {
      functions: false,
      typedefs: false
    }],
    "max-len": ["warn", 100, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
       ignoreTemplateLiterals: true,
     }],
  }
}