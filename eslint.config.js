import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Analiza TypeScript, React y sus hooks para detectar errores sin ejecutar la aplicación.
export default defineConfig([
  // La salida compilada se genera automáticamente y no se revisa como código fuente.
  globalIgnores(['dist']),
  {
    // Aplica las reglas únicamente a archivos TypeScript y componentes TSX.
    files: ['**/*.{ts,tsx}'],
    // Combina las recomendaciones de JavaScript, TypeScript, hooks y Fast Refresh.
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    // Reconoce las variables del navegador, como window y document.
    languageOptions: {
      globals: globals.browser,
    },
  },
])
