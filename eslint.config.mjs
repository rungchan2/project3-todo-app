/* eslint-disable */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  eslint.configs.recommended,
  react.configs.flat.recommended,
  prettierRecommended,
  ...tseslint.configs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "off",
    },
    env: {
      node: true,
    },
  },
);
