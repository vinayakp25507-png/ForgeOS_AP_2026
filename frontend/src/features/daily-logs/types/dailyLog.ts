// Continues the component or data expression so its related values and behavior stay grouped together.
export type DailyLogStatus = 'Draft' | 'Submitted' | 'Approved'

// Continues the component or data expression so its related values and behavior stay grouped together.
export type AttendanceStatus = 'Present' | 'Absent' | 'Half day'

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface LabourEntry {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the trade field so the surrounding object or component receives this setting.
  trade: string
  // Sets the company field so the surrounding object or component receives this setting.
  company: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: AttendanceStatus
  // Sets the hours field so the surrounding object or component receives this setting.
  hours: number
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface MachineryEntry {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the type field so the surrounding object or component receives this setting.
  type: string
  // Sets the operator field so the surrounding object or component receives this setting.
  operator: string
  // Sets the hours field so the surrounding object or component receives this setting.
  hours: number
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'In use' | 'Idle' | 'Maintenance'
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface ProgressEntry {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Sets the activity field so the surrounding object or component receives this setting.
  activity: string
  // Sets the completion field so the surrounding object or component receives this setting.
  completion: number
  // Sets the note field so the surrounding object or component receives this setting.
  note: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface ActivityEntry {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the time field so the surrounding object or component receives this setting.
  time: string
  // Sets the title field so the surrounding object or component receives this setting.
  title: string
  // Sets the description field so the surrounding object or component receives this setting.
  description: string
  // Sets the type field so the surrounding object or component receives this setting.
  type: 'update' | 'delivery' | 'issue' | 'approval'
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface DailyLog {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Sets the project field so the surrounding object or component receives this setting.
  project: string
  // Sets the weather field so the surrounding object or component receives this setting.
  weather: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: DailyLogStatus
  // Sets the summary field so the surrounding object or component receives this setting.
  summary: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the labour field so the surrounding object or component receives this setting.
  labour: LabourEntry[]
  // Sets the machinery field so the surrounding object or component receives this setting.
  machinery: MachineryEntry[]
  // Sets the progressHistory field so the surrounding object or component receives this setting.
  progressHistory: ProgressEntry[]
  // Sets the activity field so the surrounding object or component receives this setting.
  activity: ActivityEntry[]
// Closes the current block or object so the grouped statements or settings end here.
}
