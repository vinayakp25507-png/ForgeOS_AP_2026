// Imports type  Role from @prisma/client so this module can reuse that component, helper, or library.
import type { Role } from '@prisma/client'

// Continues the component or data expression so its related values and behavior stay grouped together.
declare global {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  namespace Express {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    interface Request {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      user?: {
        // Sets the id field so the surrounding object or component receives this setting.
        id: number
        // Sets the role field so the surrounding object or component receives this setting.
        role: Role
        // Sets the email field so the surrounding object or component receives this setting.
        email: string
        // Sets the name field so the surrounding object or component receives this setting.
        name: string
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export {}
