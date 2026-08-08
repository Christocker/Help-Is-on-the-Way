import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The fetch-data-in-useEffect pattern is the standard client-side
      // approach used throughout this app; this new rule flags it
      // incorrectly for data fetching. Kept as a warning, not an error.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
