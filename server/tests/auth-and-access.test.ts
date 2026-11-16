// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Stores the value in mocks so later lines can reuse this data or behavior for the current feature.
const mocks = vi.hoisted(() => ({
  // Sets the userFindUnique field so the surrounding object or component receives this setting.
  userFindUnique: vi.fn(),
  // Sets the userUpdate field so the surrounding object or component receives this setting.
  userUpdate: vi.fn(),
  // Sets the userFindMany field so the surrounding object or component receives this setting.
  userFindMany: vi.fn(),
  // Sets the userCount field so the surrounding object or component receives this setting.
  userCount: vi.fn(),
  // Sets the userCreate field so the surrounding object or component receives this setting.
  userCreate: vi.fn(),
  // Sets the transaction field so the surrounding object or component receives this setting.
  transaction: vi.fn(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Calls this helper or component so the feature can perform the operation or render the control represented here.
vi.mock('../src/utils/prisma.js', () => ({
  // Sets the prisma field so the surrounding object or component receives this setting.
  prisma: {
    // Sets the user field so the surrounding object or component receives this setting.
    user: {
      // Sets the findUnique field so the surrounding object or component receives this setting.
      findUnique: mocks.userFindUnique,
      // Sets the update field so the surrounding object or component receives this setting.
      update: mocks.userUpdate,
      // Sets the findMany field so the surrounding object or component receives this setting.
      findMany: mocks.userFindMany,
      // Sets the count field so the surrounding object or component receives this setting.
      count: mocks.userCount,
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.userCreate,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the $queryRaw field so the surrounding object or component receives this setting.
    $queryRaw: vi.fn(),
    // Sets the $transaction field so the surrounding object or component receives this setting.
    $transaction: mocks.transaction,
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Imports request from supertest so this module can reuse that component, helper, or library.
import request from 'supertest'
// Imports Prisma from @prisma/client so this module can reuse that component, helper, or library.
import { Prisma } from '@prisma/client'
// Imports createApp from ../src/app.js so this module can reuse that component, helper, or library.
import { createApp } from '../src/app.js'
// Imports createAccessToken from ../src/utils/jwt.js so this module can reuse that component, helper, or library.
import { createAccessToken } from '../src/utils/jwt.js'
// Imports hashPassword from ../src/utils/password.js so this module can reuse that component, helper, or library.
import { hashPassword } from '../src/utils/password.js'

// Stores the value in admin so later lines can reuse this data or behavior for the current feature.
const admin = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: 1,
  // Sets the name field so the surrounding object or component receives this setting.
  name: 'Admin',
  // Sets the email field so the surrounding object or component receives this setting.
  email: 'admin@example.com',
  // Sets the passwordHash field so the surrounding object or component receives this setting.
  passwordHash: hashPassword('correct-password'),
  // Sets the role field so the surrounding object or component receives this setting.
  role: 'ADMIN' as const,
  // Sets the phone field so the surrounding object or component receives this setting.
  phone: null,
  // Sets the isActive field so the surrounding object or component receives this setting.
  isActive: true,
  // Sets the createdAt field so the surrounding object or component receives this setting.
  createdAt: new Date(),
  // Sets the updatedAt field so the surrounding object or component receives this setting.
  updatedAt: new Date(),
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in pm so later lines can reuse this data or behavior for the current feature.
const pm = { ...admin, id: 2, name: 'PM', email: 'pm@example.com', role: 'PM' as const }

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('authentication and shared authorization', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  beforeEach(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.clearAllMocks()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValue(admin)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userUpdate.mockResolvedValue(admin)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindMany.mockResolvedValue([admin])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userCount.mockResolvedValue(1)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userCreate.mockResolvedValue(admin)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.transaction.mockImplementation(async (operations: Array<Promise<unknown>>) => Promise.all(operations))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('logs in and returns a JWT without a password hash', async () => {
    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp())
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post('/api/v1/auth/login')
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ email: admin.email, password: 'correct-password' })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body.data.token).toEqual(expect.any(String))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body.data.user).not.toHaveProperty('passwordHash')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows PM login and rejects inactive users', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValueOnce(pm)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userUpdate.mockResolvedValueOnce(pm)
    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp())
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post('/api/v1/auth/login')
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ email: pm.email, password: 'correct-password' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body.data.user.role).toBe('PM')

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValueOnce({ ...pm, isActive: false })
    // Stores the value in inactive so later lines can reuse this data or behavior for the current feature.
    const inactive = await request(createApp())
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post('/api/v1/auth/login')
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ email: pm.email, password: 'correct-password' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(inactive.status).toBe(401)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects unknown users and invalid passwords', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValueOnce(null)
    // Stores the value in unknown so later lines can reuse this data or behavior for the current feature.
    const unknown = await request(createApp()).post('/api/v1/auth/login').send({ email: 'missing@example.com', password: 'bad-password' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(unknown.status).toBe(401)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValueOnce(admin)
    // Stores the value in invalid so later lines can reuse this data or behavior for the current feature.
    const invalid = await request(createApp()).post('/api/v1/auth/login').send({ email: admin.email, password: 'bad-password' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(invalid.status).toBe(401)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('hashes a new user password without passing plaintext to Prisma', async () => {
    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp())
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post('/api/v1/users')
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set('Authorization', `Bearer ${createAccessToken(admin)}`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ name: 'New PM', email: 'newpm@example.com', password: 'secure-password', role: 'PM' })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(201)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.userCreate).toHaveBeenCalledWith({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the name field so the surrounding object or component receives this setting.
        name: 'New PM',
        // Sets the email field so the surrounding object or component receives this setting.
        email: 'newpm@example.com',
        // Sets the passwordHash field so the surrounding object or component receives this setting.
        passwordHash: expect.any(String),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.userCreate.mock.calls[0]?.[0]).not.toHaveProperty('data.password')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects missing, invalid, and expired JWTs', async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).get('/api/v1/auth/me')).status).toBe(401)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).get('/api/v1/auth/me').set('Authorization', 'Bearer invalid')).status).toBe(401)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.useFakeTimers()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.setSystemTime(Date.now() - 60 * 60 * 1000)
    // Stores the value in expiredToken so later lines can reuse this data or behavior for the current feature.
    const expiredToken = createAccessToken(admin)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.useRealTimers()
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).get('/api/v1/auth/me').set('Authorization', `Bearer ${expiredToken}`)).status).toBe(401)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN user management and denies PM user management', async () => {
    // Stores the value in adminToken so later lines can reuse this data or behavior for the current feature.
    const adminToken = createAccessToken(admin)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).get('/api/v1/users').set('Authorization', `Bearer ${adminToken}`)).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).post('/api/v1/users').set('Authorization', `Bearer ${adminToken}`).send({
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'New PM',
      // Sets the email field so the surrounding object or component receives this setting.
      email: 'newpm@example.com',
      // Sets the password field so the surrounding object or component receives this setting.
      password: 'secure-password',
      // Sets the role field so the surrounding object or component receives this setting.
      role: 'PM',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(201)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).patch('/api/v1/users/2').set('Authorization', `Bearer ${adminToken}`).send({
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Updated PM',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(200)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userFindUnique.mockResolvedValue(pm)
    // Stores the value in pmToken so later lines can reuse this data or behavior for the current feature.
    const pmToken = createAccessToken(pm)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).get('/api/v1/users').set('Authorization', `Bearer ${pmToken}`)).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).post('/api/v1/users').set('Authorization', `Bearer ${pmToken}`).send({
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Blocked',
      // Sets the email field so the surrounding object or component receives this setting.
      email: 'blocked@example.com',
      // Sets the password field so the surrounding object or component receives this setting.
      password: 'secure-password',
      // Sets the role field so the surrounding object or component receives this setting.
      role: 'PM',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).patch('/api/v1/users/2').set('Authorization', `Bearer ${pmToken}`).send({ name: 'Blocked' })).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(createApp()).patch('/api/v1/users/2/status').set('Authorization', `Bearer ${pmToken}`).send({ isActive: false })).status).toBe(403)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('maps duplicate user emails to a conflict without exposing hashes', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.userCreate.mockRejectedValueOnce(new Prisma.PrismaClientKnownRequestError('duplicate', {
      // Sets the code field so the surrounding object or component receives this setting.
      code: 'P2002',
      // Sets the clientVersion field so the surrounding object or component receives this setting.
      clientVersion: '5.22.0',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(createApp())
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post('/api/v1/users')
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set('Authorization', `Bearer ${createAccessToken(admin)}`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ name: 'Duplicate', email: 'admin@example.com', password: 'secure-password', role: 'PM' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(409)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.body).not.toHaveProperty('data.passwordHash')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
