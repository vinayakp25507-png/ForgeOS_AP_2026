// Imports describe, expect, it from vitest so this module can reuse that component, helper, or library.
import { describe, expect, it } from 'vitest'
// Imports dailyLogBodySchema from ../src/modules/daily-logs/daily-logs.validator.js so this module can reuse that component, helper, or library.
import { dailyLogBodySchema } from '../src/modules/daily-logs/daily-logs.validator.js'

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('daily log validation', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('accepts a nested daily log payload', () => {
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = dailyLogBodySchema.safeParse({
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: '2026-10-04',
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 43,
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Slab casting completed.',
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [{ trade: 'Mason', headCount: 12, hoursWorked: 8 }],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [{ machineName: 'Concrete Mixer', hoursUsed: 6.5 }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.success).toBe(true)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects invalid labour and machinery measurements', () => {
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = dailyLogBodySchema.safeParse({
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: '2026-10-04',
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 43,
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Invalid measurements.',
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [{ trade: 'Mason', headCount: 0, hoursWorked: 25 }],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [{ machineName: 'Mixer', hoursUsed: -1, fuelLitres: -2 }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
