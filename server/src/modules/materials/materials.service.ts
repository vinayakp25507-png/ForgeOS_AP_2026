// Imports type  MaterialCategory from @prisma/client so this module can reuse that component, helper, or library.
import type { MaterialCategory } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports type  CreateMaterialInput, MaterialListQuery, UpdateMaterialInput from ./materials.validator.js so this module can reuse that component, helper, or library.
import type { CreateMaterialInput, MaterialListQuery, UpdateMaterialInput } from './materials.validator.js'

// Defines listMaterials so this module can perform its named task when needed.
export async function listMaterials(query: MaterialListQuery) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.material.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.search ? { name: { contains: query.search, mode: 'insensitive' } } : {}),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.category ? { category: query.category as MaterialCategory } : {}),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.isActive === undefined ? {} : { isActive: query.isActive }),
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { name: 'asc' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getMaterial so this module can perform its named task when needed.
export async function getMaterial(id: number) {
  // Stores the value in material so later lines can reuse this data or behavior for the current feature.
  const material = await prisma.material.findUnique({ where: { id } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!material) throw new AppError('NOT_FOUND', 'Material not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return material
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createMaterial so this module can perform its named task when needed.
export async function createMaterial(input: CreateMaterialInput) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.material.create({
    // Sets the data field so the surrounding object or component receives this setting.
    data: {
      // Sets the name field so the surrounding object or component receives this setting.
      name: input.name,
      // Sets the category field so the surrounding object or component receives this setting.
      category: input.category as MaterialCategory,
      // Sets the unit field so the surrounding object or component receives this setting.
      unit: input.unit,
      // Sets the description field so the surrounding object or component receives this setting.
      description: input.description ?? null,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateMaterial so this module can perform its named task when needed.
export async function updateMaterial(id: number, input: UpdateMaterialInput) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await getMaterial(id)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.material.update({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the data field so the surrounding object or component receives this setting.
    data: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(input.name === undefined ? {} : { name: input.name }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(input.category === undefined ? {} : { category: input.category as MaterialCategory }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(input.unit === undefined ? {} : { unit: input.unit }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(input.description === undefined ? {} : { description: input.description }),
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
