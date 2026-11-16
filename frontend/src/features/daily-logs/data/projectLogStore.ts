// Imports projectLogs from ./projectLogs so this module can reuse that component, helper, or library.
import { projectLogs } from './projectLogs'
// Imports type  ProjectLog from ../types/projectLog so this module can reuse that component, helper, or library.
import type { ProjectLog } from '../types/projectLog'

// Stores the value in storageKey so later lines can reuse this data or behavior for the current feature.
const storageKey = 'forgeos-project-logs'

// Defines getProjectLogs so this module can perform its named task when needed.
export function getProjectLogs(projectId: string): ProjectLog[] {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in stored so later lines can reuse this data or behavior for the current feature.
    const stored = localStorage.getItem(storageKey)
    // Stores the value in parsed so later lines can reuse this data or behavior for the current feature.
    const parsed = stored ? JSON.parse(stored) as ProjectLog[] : projectLogs
    // Returns the result so the caller or React receives the value or interface this function provides.
    return parsed.filter((log) => log.projectId === projectId).map(normalizeProjectLog)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return projectLogs.filter((log) => log.projectId === projectId).map(normalizeProjectLog)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveProjectLog so this module can perform its named task when needed.
export function saveProjectLog(log: ProjectLog) {
  // Stores the value in allLogs so later lines can reuse this data or behavior for the current feature.
  const allLogs = getAllProjectLogs()
  // Stores the value in next so later lines can reuse this data or behavior for the current feature.
  const next = allLogs.some((item) => item.id === log.id)
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    ? allLogs.map((item) => item.id === log.id ? log : item)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    : [...allLogs, log]
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  localStorage.setItem(storageKey, JSON.stringify(next))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getAllProjectLogs so this module can perform its named task when needed.
function getAllProjectLogs(): ProjectLog[] {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in stored so later lines can reuse this data or behavior for the current feature.
    const stored = localStorage.getItem(storageKey)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return stored ? JSON.parse(stored) as ProjectLog[] : projectLogs
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return projectLogs
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines normalizeProjectLog so this module can perform its named task when needed.
function normalizeProjectLog(log: ProjectLog): ProjectLog {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...log,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: log.issues ?? '',
    // Sets the labour field so the surrounding object or component receives this setting.
    labour: log.labour ?? [],
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: log.machinery ?? [],
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
