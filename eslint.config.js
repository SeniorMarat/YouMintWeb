// @ts-check

import { defineConfig } from "@ilyasemenov/eslint-config"

export default defineConfig({
  vue: true,
  vuePug: true,
  rules: {
    "antfu/no-top-level-await": "off",
  },
})
