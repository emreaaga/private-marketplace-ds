import pluginJs from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // 1. Глобальные игноры (отдельным объектом в начале)
  globalIgnores([
    ".github/",
    ".husky/",
    "node_modules/",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/components/ui/**", // Добавил /** для верности
    "*.config.ts",
    "*.mjs",
  ]),

  // 2. Базовые конфиги
  ...nextVitals,
  ...nextTs,
  pluginJs.configs.recommended,
  securityPlugin.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Твои правила и плагины
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: pluginImport,
      security: securityPlugin,
      prettier: prettier,
      unicorn: unicorn,
      sonarjs: sonarjs,
    },
    rules: {
      "prettier/prettier": "warn",
      "security/detect-object-injection": "off",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["^.*\\.config\\.(js|ts|mjs)$", "^.*\\.d\\.ts$"],
        },
      ],

      // Кастомный стиль
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-useless-rename": "error",

      // Импорты
      "import/no-mutable-exports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "{next,next/**}", group: "external", position: "before" },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": "error",
      "no-duplicate-imports": ["error", { includeExports: true }],
      "import/no-cycle": ["error", { maxDepth: 2 }],

      // Форматирование
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }],
      "object-curly-spacing": ["error", "always"],

      // Сложность
      complexity: ["error", { max: 15 }],
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // React
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/jsx-pascal-case": ["error", { allowAllCaps: false }],
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      "react/no-array-index-key": "warn",

      // SonarJS
      "sonarjs/no-commented-code": "warn",
    },
  },
]);
