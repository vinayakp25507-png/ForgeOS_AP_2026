// Imports type  DailyLog from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { DailyLog } from '../types/dailyLog'

// Stores the value in dailyLogs so later lines can reuse this data or behavior for the current feature.
export const dailyLogs: DailyLog[] = [
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'log-2024-06-18',
    // Sets the date field so the surrounding object or component receives this setting.
    date: '2024-06-18',
    // Sets the project field so the surrounding object or component receives this setting.
    project: 'Riverside Residences',
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: 'Clear · 28°C',
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'Submitted',
    // Sets the summary field so the surrounding object or component receives this setting.
    summary: 'Level 04 slab reinforcement completed. MEP coordination is ready for inspection tomorrow.',
    // Sets the progress field so the surrounding object or component receives this setting.
    progress: 68,
    // Sets the labour field so the surrounding object or component receives this setting.
    labour: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'l1', name: 'Arjun Mehta', trade: 'Steel fixer', company: 'BuildRight Civil', status: 'Present', hours: 8 },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'l2', name: 'Sanjay Kumar', trade: 'Mason', company: 'BuildRight Civil', status: 'Present', hours: 8 },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'l3', name: 'Maya Patel', trade: 'Electrician', company: 'VoltWorks', status: 'Half day', hours: 4 },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'l4', name: 'Rakesh Singh', trade: 'Site supervisor', company: 'ForgeOS Projects', status: 'Present', hours: 9 },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'm1', name: 'Tower Crane TC-02', type: 'Lifting', operator: 'Vikram Rao', hours: 6.5, status: 'In use' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'm2', name: 'Transit Mixer TM-14', type: 'Concrete', operator: 'Amit Shah', hours: 4, status: 'In use' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'm3', name: 'Excavator EX-07', type: 'Earthworks', operator: 'Neeraj Das', hours: 0, status: 'Idle' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the progressHistory field so the surrounding object or component receives this setting.
    progressHistory: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'p1', date: 'Jun 18', activity: 'Level 04 reinforcement', completion: 92, note: 'East wing completed; west wing snagging in progress.' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'p2', date: 'Jun 17', activity: 'Level 04 formwork', completion: 100, note: 'Signed off by site engineer.' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'p3', date: 'Jun 15', activity: 'MEP first fix', completion: 64, note: 'Electrical conduits installed in core.' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the activity field so the surrounding object or component receives this setting.
    activity: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'a1', time: '16:42', title: 'Daily log submitted', description: 'Rakesh Singh submitted the site log for review.', type: 'approval' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'a2', time: '14:15', title: 'Concrete delivery received', description: '18 m³ of M30 concrete checked in at Gate 2.', type: 'delivery' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'a3', time: '11:30', title: 'Progress updated', description: 'Level 04 reinforcement moved from 84% to 92%.', type: 'update' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { id: 'a4', time: '09:10', title: 'Safety observation raised', description: 'Temporary edge protection required at the west stair core.', type: 'issue' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'log-2024-06-17',
    // Sets the date field so the surrounding object or component receives this setting.
    date: '2024-06-17',
    // Sets the project field so the surrounding object or component receives this setting.
    project: 'Riverside Residences',
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: 'Partly cloudy · 26°C',
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'Approved',
    // Sets the summary field so the surrounding object or component receives this setting.
    summary: 'Formwork inspection passed and the material hoist was serviced without schedule impact.',
    // Sets the progress field so the surrounding object or component receives this setting.
    progress: 65,
    // Sets the labour field so the surrounding object or component receives this setting.
    labour: [],
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: [],
    // Sets the progressHistory field so the surrounding object or component receives this setting.
    progressHistory: [],
    // Sets the activity field so the surrounding object or component receives this setting.
    activity: [],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'log-2024-06-14',
    // Sets the date field so the surrounding object or component receives this setting.
    date: '2024-06-14',
    // Sets the project field so the surrounding object or component receives this setting.
    project: 'Riverside Residences',
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: 'Light rain · 23°C',
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'Draft',
    // Sets the summary field so the surrounding object or component receives this setting.
    summary: 'Rain paused external works for 90 minutes. Internal finishing activities continued.',
    // Sets the progress field so the surrounding object or component receives this setting.
    progress: 63,
    // Sets the labour field so the surrounding object or component receives this setting.
    labour: [],
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: [],
    // Sets the progressHistory field so the surrounding object or component receives this setting.
    progressHistory: [],
    // Sets the activity field so the surrounding object or component receives this setting.
    activity: [],
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
]
