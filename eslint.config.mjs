import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    rules: {
      semi: ["warn", "always"],
      quotes: ["warn", "double", {"allowTemplateLiterals": true}],
    },
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.browser } 
  },
]);