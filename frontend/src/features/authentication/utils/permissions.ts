// Continues the component or data expression so its related values and behavior stay grouped together.
export type UserRole = 'Admin' | 'Project Manager'

/** The shape stored in localStorage under `forgeos_demo_user`. */
// Continues the component or data expression so its related values and behavior stay grouped together.
export interface StoredUser {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  id?: string | number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  name?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  email?: string
  // Sets the role field so the surrounding object or component receives this setting.
  role: 'admin' | 'pm'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  rememberMe?: boolean
  /** PM-only: the project assigned at login. */
  // Continues the component or data expression so its related values and behavior stay grouped together.
  assignedProjectId?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  assignedProjectCode?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  assignedProjectName?: string
// Closes the current block or object so the grouped statements or settings end here.
}

/** All projects available for PM selection at login. */
// Stores the value in AVAILABLE_PROJECTS so later lines can reuse this data or behavior for the current feature.
export const AVAILABLE_PROJECTS = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '1', code: 'PRJ-001', name: 'Green Valley Residency' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '2', code: 'PRJ-002', name: 'Skyline Commercial Hub' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '3', code: 'PRJ-003', name: 'Riverside Heights' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '4', code: 'PRJ-004', name: 'Urban Square' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

/** PM access codes that admin gives to project managers. */
// Stores the value in PM_ACCESS_CODES so later lines can reuse this data or behavior for the current feature.
export const PM_ACCESS_CODES = ['FORGE-PM-2026', 'FORGEOS-SITE', 'PM-ACCESS-01']

// Stores the value in getCurrentUser so later lines can reuse this data or behavior for the current feature.
export const getCurrentUser = (): StoredUser | null => {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in storedUser so later lines can reuse this data or behavior for the current feature.
    const storedUser = localStorage.getItem('forgeos_demo_user')
    // Returns the result so the caller or React receives the value or interface this function provides.
    return storedUser ? JSON.parse(storedUser) : null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return null
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in getCurrentRole so later lines can reuse this data or behavior for the current feature.
export const getCurrentRole = (): UserRole | null => {
  // Stores the value in role so later lines can reuse this data or behavior for the current feature.
  const role = String(getCurrentUser()?.role ?? '').toLowerCase().trim()

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (role === 'admin') return 'Admin'
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (role === 'pm' || role === 'project manager') return 'Project Manager'

  // Returns the result so the caller or React receives the value or interface this function provides.
  return null
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in hasPermission so later lines can reuse this data or behavior for the current feature.
export const hasPermission = (allowedRoles: UserRole[]) => {
  // Stores the value in role so later lines can reuse this data or behavior for the current feature.
  const role = getCurrentRole()
  // Returns the result so the caller or React receives the value or interface this function provides.
  return role !== null && allowedRoles.includes(role)
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in isAdmin so later lines can reuse this data or behavior for the current feature.
export const isAdmin = () => getCurrentRole() === 'Admin'
// Stores the value in isProjectManager so later lines can reuse this data or behavior for the current feature.
export const isProjectManager = () => getCurrentRole() === 'Project Manager'

/** Get the project assigned to the current PM at login. Returns null for admins. */
// Stores the value in getAssignedProject so later lines can reuse this data or behavior for the current feature.
export const getAssignedProject = () => {
  // Stores the value in user so later lines can reuse this data or behavior for the current feature.
  const user = getCurrentUser()
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!user || user.role !== 'pm') return null
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!user.assignedProjectId) return null
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: user.assignedProjectId,
    // Sets the code field so the surrounding object or component receives this setting.
    code: user.assignedProjectCode || '',
    // Sets the name field so the surrounding object or component receives this setting.
    name: user.assignedProjectName || '',
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
