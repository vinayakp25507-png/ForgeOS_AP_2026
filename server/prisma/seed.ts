// Imports randomBytes, scryptSync from node:crypto so this module can reuse that component, helper, or library.
import { randomBytes, scryptSync } from 'node:crypto'
// Imports PrismaClient, ProjectStatus, Role from @prisma/client so this module can reuse that component, helper, or library.
import { PrismaClient, ProjectStatus, Role } from '@prisma/client'

// Stores the value in prisma so later lines can reuse this data or behavior for the current feature.
const prisma = new PrismaClient()

// Defines hashPassword so this module can perform its named task when needed.
function hashPassword(password: string): string {
  // Stores the value in salt so later lines can reuse this data or behavior for the current feature.
  const salt = randomBytes(16).toString('hex')
  // Stores the value in hash so later lines can reuse this data or behavior for the current feature.
  const hash = scryptSync(password, salt, 64).toString('hex')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return `scrypt$${salt}$${hash}`
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines main so this module can perform its named task when needed.
async function main() {
  // Stores the value in adminPassword so later lines can reuse this data or behavior for the current feature.
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? randomBytes(24).toString('base64url')
  // Stores the value in pmPassword so later lines can reuse this data or behavior for the current feature.
  const pmPassword = process.env.SEED_PM_PASSWORD ?? randomBytes(24).toString('base64url')

  // Stores the value in admin so later lines can reuse this data or behavior for the current feature.
  const admin = await prisma.user.upsert({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { email: 'admin@forgeos.local' },
    // Sets the update field so the surrounding object or component receives this setting.
    update: { name: 'ForgeOS Administrator', role: Role.ADMIN, isActive: true, passwordHash: hashPassword(adminPassword) },
    // Sets the create field so the surrounding object or component receives this setting.
    create: {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'ForgeOS Administrator',
      // Sets the email field so the surrounding object or component receives this setting.
      email: 'admin@forgeos.local',
      // Sets the passwordHash field so the surrounding object or component receives this setting.
      passwordHash: hashPassword(adminPassword),
      // Sets the role field so the surrounding object or component receives this setting.
      role: Role.ADMIN,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Stores the value in pm so later lines can reuse this data or behavior for the current feature.
  const pm = await prisma.user.upsert({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { email: 'pm@forgeos.local' },
    // Sets the update field so the surrounding object or component receives this setting.
    update: { name: 'ForgeOS Project Manager', role: Role.PM, isActive: true, passwordHash: hashPassword(pmPassword) },
    // Sets the create field so the surrounding object or component receives this setting.
    create: {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'ForgeOS Project Manager',
      // Sets the email field so the surrounding object or component receives this setting.
      email: 'pm@forgeos.local',
      // Sets the passwordHash field so the surrounding object or component receives this setting.
      passwordHash: hashPassword(pmPassword),
      // Sets the role field so the surrounding object or component receives this setting.
      role: Role.PM,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Stores the value in existingLand so later lines can reuse this data or behavior for the current feature.
  const existingLand = await prisma.land.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { name: 'ForgeOS Development Parcel' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Stores the value in land so later lines can reuse this data or behavior for the current feature.
  const land = existingLand ?? await prisma.land.create({
    // Sets the data field so the surrounding object or component receives this setting.
    data: {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'ForgeOS Development Parcel',
      // Sets the city field so the surrounding object or component receives this setting.
      city: 'Gurugram',
      // Sets the state field so the surrounding object or component receives this setting.
      state: 'Haryana',
      // Sets the areaValue field so the surrounding object or component receives this setting.
      areaValue: 2.5,
      // Sets the areaUnit field so the surrounding object or component receives this setting.
      areaUnit: 'ACRE',
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: admin.id,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.upsert({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { code: 'DEV-001' },
    // Sets the update field so the surrounding object or component receives this setting.
    update: {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'ForgeOS Development Project',
      // Sets the status field so the surrounding object or component receives this setting.
      status: ProjectStatus.ACTIVE,
      // Sets the assignedPmId field so the surrounding object or component receives this setting.
      assignedPmId: pm.id,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: admin.id,
      // Sets the landId field so the surrounding object or component receives this setting.
      landId: land.id,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the create field so the surrounding object or component receives this setting.
    create: {
      // Sets the code field so the surrounding object or component receives this setting.
      code: 'DEV-001',
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'ForgeOS Development Project',
      // Sets the status field so the surrounding object or component receives this setting.
      status: ProjectStatus.ACTIVE,
      // Sets the assignedPmId field so the surrounding object or component receives this setting.
      assignedPmId: pm.id,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: admin.id,
      // Sets the landId field so the surrounding object or component receives this setting.
      landId: land.id,
      // Sets the totalBudget field so the surrounding object or component receives this setting.
      totalBudget: 1000000,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  console.log(`Seeded admin ${admin.email}, PM ${pm.email}, land ${land.id}, project ${project.code}`)
// Closes the current block or object so the grouped statements or settings end here.
}

// Calls this helper or component so the feature can perform the operation or render the control represented here.
main()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  .catch((error) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error(error)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    process.exitCode = 1
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  .finally(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$disconnect()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
