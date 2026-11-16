// Continues the component or data expression so its related values and behavior stay grouped together.
export interface ProjectLog {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Sets the summary field so the surrounding object or component receives this setting.
  summary: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the progressChange field so the surrounding object or component receives this setting.
  progressChange: number
  // Sets the workerCount field so the surrounding object or component receives this setting.
  workerCount: number
  // Sets the machineryHours field so the surrounding object or component receives this setting.
  machineryHours: number
  // Sets the weather field so the surrounding object or component receives this setting.
  weather: string
  // Sets the issues field so the surrounding object or component receives this setting.
  issues: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Draft' | 'Submitted' | 'Approved'
  // Sets the labour field so the surrounding object or component receives this setting.
  labour: LabourRow[]
  // Sets the machinery field so the surrounding object or component receives this setting.
  machinery: MachineryRow[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface LabourRow {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the trade field so the surrounding object or component receives this setting.
  trade: string
  // Sets the customTrade field so the surrounding object or component receives this setting.
  customTrade: string
  // Sets the contractor field so the surrounding object or component receives this setting.
  contractor: string
  // Sets the workers field so the surrounding object or component receives this setting.
  workers: number
  // Sets the hours field so the surrounding object or component receives this setting.
  hours: number
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface MachineryRow {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the machine field so the surrounding object or component receives this setting.
  machine: string
  // Sets the operator field so the surrounding object or component receives this setting.
  operator: string
  // Sets the hours field so the surrounding object or component receives this setting.
  hours: number
  // Sets the fuel field so the surrounding object or component receives this setting.
  fuel: number
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface ProjectLogFormValues {
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Sets the summary field so the surrounding object or component receives this setting.
  summary: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the workerCount field so the surrounding object or component receives this setting.
  workerCount: number
  // Sets the machineryHours field so the surrounding object or component receives this setting.
  machineryHours: number
  // Sets the weather field so the surrounding object or component receives this setting.
  weather: string
  // Sets the issues field so the surrounding object or component receives this setting.
  issues: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: ProjectLog['status']
  // Sets the labour field so the surrounding object or component receives this setting.
  labour: LabourRow[]
  // Sets the machinery field so the surrounding object or component receives this setting.
  machinery: MachineryRow[]
// Closes the current block or object so the grouped statements or settings end here.
}
