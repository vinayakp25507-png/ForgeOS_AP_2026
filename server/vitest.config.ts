// Imports defineConfig from vitest/config so this module can reuse that component, helper, or library.
import { defineConfig } from 'vitest/config'

// Exports defineConfig as this file’s default value so other modules can load the main feature.
export default defineConfig({
  // Sets the test field so the surrounding object or component receives this setting.
  test: {
    // Sets the setupFiles field so the surrounding object or component receives this setting.
    setupFiles: ['./tests/setup.ts'],
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the configuration expression so its related values and behavior stay grouped together.
})
