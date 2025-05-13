import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Configuración para resolver alias de rutas y desactivar reglas conflictivas
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"], paths: ["src"] },
      },
    },
    rules: {
      // Permite usar 'any' cuando sea necesario
      "@typescript-eslint/no-explicit-any": "off",
      // Desactiva las reglas de hooks durante build
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "warn",
      // Permite importar módulos internos sin listarlos en dependencies
      "import/no-extraneous-dependencies": "off",
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];