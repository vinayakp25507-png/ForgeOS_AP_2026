// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Calls this helper or component so the feature can perform the operation or render the control represented here.
vi.mock('../src/utils/prisma.js', () => ({
  // Sets the prisma field so the surrounding object or component receives this setting.
  prisma: {
    // Sets the $queryRaw field so the surrounding object or component receives this setting.
    $queryRaw: vi.fn(),
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Imports request from supertest so this module can reuse that component, helper, or library.
import request from 'supertest'
// Imports createApp from ../src/app.js so this module can reuse that component, helper, or library.
import { createApp } from '../src/app.js'
// Imports prisma from ../src/utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../src/utils/prisma.js'

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('GET /api/v1/health', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  beforeEach(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.clearAllMocks()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('reports the API and database as healthy when Prisma can query', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.mocked(prisma.$queryRaw).mockResolvedValue([{ '?column?': 1 }])

    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp()).get('/api/v1/health')

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body).toEqual({
      // Sets the success field so the surrounding object or component receives this setting.
      success: true,
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ok',
        // Sets the api field so the surrounding object or component receives this setting.
        api: 'ok',
        // Sets the server field so the surrounding object or component receives this setting.
        server: 'ok',
        // Sets the database field so the surrounding object or component receives this setting.
        database: 'connected',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('reports a degraded API when Prisma cannot connect', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.mocked(prisma.$queryRaw).mockRejectedValue(new Error('database unavailable'))

    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp()).get('/api/v1/health')

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(503)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body.data.database).toBe('disconnected')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body.success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
