// @ts-check

import { defineConfig } from "@ilyasemenov/eslint-config"

export default defineConfig({
  vue: true,
  vuePug: true,
  rules: {
    "antfu/no-top-level-await": "off",
  },
}).append({
  files: ["server/lib/contracts/*.ts"],
  rules: {
    // полностью отключаем все правила
    "no-restricted-globals": "off",
    "unused-imports/no-unused-vars": "off",
    "style/max-statements-per-line": "off",
    "node/prefer-global/buffer": "off",
  },
})
