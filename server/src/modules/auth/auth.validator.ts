// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in loginSchema so later lines can reuse this data or behavior for the current feature.
export const loginSchema = z.object({
  // Sets the email field so the surrounding object or component receives this setting.
  email: z.string().email().transform((value) => value.toLowerCase()),
  // Sets the password field so the surrounding object or component receives this setting.
  password: z.string().min(1),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
