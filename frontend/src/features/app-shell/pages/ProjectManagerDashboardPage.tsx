// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  AlertTriangle,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ArrowUpRight,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  BarChart3,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  CalendarClock,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  CheckCircle2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ClipboardList,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Clock3,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Construction,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  HardHat,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MapPin,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Plus,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ShieldAlert,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Truck,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Users,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Wrench,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports useMemo, useState from react so this module can reuse that component, helper, or library.
import { useMemo, useState } from 'react'
// Imports AppShell from ../components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../components/AppShell'
// Imports DashboardCard, ProgressBar, SectionTitle, StatCard, StatusPill from ../components/dashboard-ui so this module can reuse that component, helper, or library.
import { DashboardCard, ProgressBar, SectionTitle, StatCard, StatusPill } from '../components/dashboard-ui'

// Continues the component or data expression so its related values and behavior stay grouped together.
type ProjectStatus = 'In Progress' | 'Delayed'
// Continues the component or data expression so its related values and behavior stay grouped together.
type MilestoneStatus = 'Complete' | 'In progress' | 'Upcoming'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Milestone = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the status field so the surrounding object or component receives this setting.
  status: MilestoneStatus
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
type SiteProject = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the code field so the surrounding object or component receives this setting.
  code: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the location field so the surrounding object or component receives this setting.
  location: string
  // Sets the stage field so the surrounding object or component receives this setting.
  stage: string
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: string
  // Sets the completionDate field so the surrounding object or component receives this setting.
  completionDate: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the status field so the surrounding object or component receives this setting.
  status: ProjectStatus
  // Sets the health field so the surrounding object or component receives this setting.
  health: 'On track' | 'Watch'
  // Sets the workers field so the surrounding object or component receives this setting.
  workers: number
  // Sets the machinery field so the surrounding object or component receives this setting.
  machinery: number
  // Sets the logs field so the surrounding object or component receives this setting.
  logs: number
  // Sets the issues field so the surrounding object or component receives this setting.
  issues: number
  // Sets the lastUpdate field so the surrounding object or component receives this setting.
  lastUpdate: string
  // Sets the milestones field so the surrounding object or component receives this setting.
  milestones: Milestone[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in assignedProjects so later lines can reuse this data or behavior for the current feature.
const assignedProjects: SiteProject[] = [
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: '1',
    // Sets the code field so the surrounding object or component receives this setting.
    code: 'PRJ-001',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Green Valley Residency',
    // Sets the location field so the surrounding object or component receives this setting.
    location: 'Gurugram, Haryana',
    // Sets the stage field so the surrounding object or component receives this setting.
    stage: 'Finishing',
    // Sets the startDate field so the surrounding object or component receives this setting.
    startDate: '10 Jan 2026',
    // Sets the completionDate field so the surrounding object or component receives this setting.
    completionDate: '20 Dec 2026',
    // Sets the progress field so the surrounding object or component receives this setting.
    progress: 76,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'In Progress',
    // Sets the health field so the surrounding object or component receives this setting.
    health: 'On track',
    // Sets the workers field so the surrounding object or component receives this setting.
    workers: 42,
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: 7,
    // Sets the logs field so the surrounding object or component receives this setting.
    logs: 18,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: 2,
    // Sets the lastUpdate field so the surrounding object or component receives this setting.
    lastUpdate: 'Today, 4:30 PM',
    // Sets the milestones field so the surrounding object or component receives this setting.
    milestones: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Land preparation', date: 'Completed · Jan 18', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Excavation', date: 'Completed · Feb 12', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Foundation', date: 'Completed · Mar 28', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Structure', date: 'Target · Jul 12', progress: 86, status: 'In progress' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Finishing', date: 'Target · Nov 30', progress: 52, status: 'In progress' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Handover', date: 'Target · Dec 20', progress: 0, status: 'Upcoming' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: '2',
    // Sets the code field so the surrounding object or component receives this setting.
    code: 'PRJ-002',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Skyline Commercial Hub',
    // Sets the location field so the surrounding object or component receives this setting.
    location: 'Delhi, India',
    // Sets the stage field so the surrounding object or component receives this setting.
    stage: 'Structure',
    // Sets the startDate field so the surrounding object or component receives this setting.
    startDate: '01 Feb 2026',
    // Sets the completionDate field so the surrounding object or component receives this setting.
    completionDate: '15 Mar 2027',
    // Sets the progress field so the surrounding object or component receives this setting.
    progress: 52,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'In Progress',
    // Sets the health field so the surrounding object or component receives this setting.
    health: 'Watch',
    // Sets the workers field so the surrounding object or component receives this setting.
    workers: 31,
    // Sets the machinery field so the surrounding object or component receives this setting.
    machinery: 5,
    // Sets the logs field so the surrounding object or component receives this setting.
    logs: 12,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: 4,
    // Sets the lastUpdate field so the surrounding object or component receives this setting.
    lastUpdate: 'Today, 2:15 PM',
    // Sets the milestones field so the surrounding object or component receives this setting.
    milestones: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Land preparation', date: 'Completed · Feb 08', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Excavation', date: 'Completed · Mar 02', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Foundation', date: 'Completed · Apr 18', progress: 100, status: 'Complete' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Structure', date: 'Target · Sep 22', progress: 62, status: 'In progress' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Finishing', date: 'Target · Jan 18', progress: 8, status: 'Upcoming' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: 'Handover', date: 'Target · Mar 15', progress: 0, status: 'Upcoming' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in activity so later lines can reuse this data or behavior for the current feature.
const activity = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Daily progress submitted', detail: 'Structure level 04 slab poured', time: 'Today, 4:30 PM', icon: ClipboardList, tone: 'amber' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Labour attendance updated', detail: 'Masonry crew added 4 workers to site', time: 'Today, 9:15 AM', icon: Users, tone: 'green' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Machinery usage recorded', detail: 'Concrete mixer · 6.5 hours · Foundation zone', time: 'Yesterday, 5:45 PM', icon: Truck, tone: 'violet' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Material update received', detail: 'Steel delivery checked against challan', time: 'Yesterday, 3:20 PM', icon: Construction, tone: 'amber' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Site issue reported', detail: 'Material delivery delayed by one day', time: 'Yesterday, 2:10 PM', icon: AlertTriangle, tone: 'red' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Defines goTo so this module can perform its named task when needed.
function goTo(path: string) {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  window.location.href = path
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines SiteBlueprint so this module can perform its named task when needed.
function SiteBlueprint({ project }: { project: SiteProject }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="relative min-h-[245px] overflow-hidden rounded-2xl border border-white/10 bg-[#151a1d]">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(242,166,90,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,166,90,.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(242,166,90,.28),transparent_35%)]" />
      {/* Starts the <svg> element to organize this part of the interface. */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 300" preserveAspectRatio="none" aria-hidden="true">
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M75 270V142l92-74 90 74v128M290 270V83l103-53 102 53v187M525 270V125l61-42 61 42v145M40 270h575" fill="none" stroke="#F2A65A" strokeWidth="2" opacity=".8" />
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M116 270V174h103v96M337 270V115h107v155M548 270v-98h53v98" fill="none" stroke="#FFC078" strokeWidth="1.5" opacity=".7" />
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M25 270h590" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
      {/* Closes the <svg> element so later content is no longer part of this region. */}
      </svg>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 pt-20">
        {/* Starts the <div> element to organize this part of the interface. */}
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A65A]">Live site view · {project.code}</p><p className="mt-1 text-sm font-medium text-white/80">{project.stage} operations</p></div>
        {/* Starts the <span> element to organize this part of the interface. */}
        <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[10px] text-white/60">Sample visualization</span>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressTrend so this module can perform its named task when needed.
function ProgressTrend({ project }: { project: SiteProject }) {
  // Stores the value in end so later lines can reuse this data or behavior for the current feature.
  const end = project.progress
  // Stores the value in points so later lines can reuse this data or behavior for the current feature.
  const points = `M0 124 C45 119 58 110 105 112 S160 ${project.progress > 60 ? 80 : 95} 215 ${project.progress > 60 ? 85 : 103} S270 74 320 ${project.progress > 60 ? 62 : 78} S375 52 420 ${project.progress > 60 ? 42 : 61} S468 35 500 ${Math.max(18, 140 - end)}`
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="relative h-48">
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[var(--dashboard-subtle)]">{[100, 75, 50, 25, 0].map((value) => <div className="flex items-center gap-3" key={value}><span className="w-7 text-right">{value}</span><div className="h-px flex-1 bg-white/[0.07]" /></div>)}</div>
      {/* Starts the <svg> element to organize this part of the interface. */}
      <svg className="absolute bottom-5 left-10 right-0 h-40 w-[calc(100%-2.5rem)]" viewBox="0 0 500 150" preserveAspectRatio="none" role="img" aria-label={`${project.name} progress trend`}>
        {/* Starts the <defs> element to organize this part of the interface. */}
        <defs><linearGradient id={`pmProgress-${project.id}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#F2A65A" stopOpacity=".3" /><stop offset="100%" stopColor="#F2A65A" stopOpacity="0" /></linearGradient></defs>
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d={`${points} L500 150 L0 150 Z`} fill={`url(#pmProgress-${project.id})`} />
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d={points} fill="none" stroke="#F2A65A" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        {/* Starts the <circle> element to organize this part of the interface. */}
        <circle cx="500" cy={Math.max(18, 140 - end)} r="5" fill="#FFC078" />
      {/* Closes the <svg> element so later content is no longer part of this region. */}
      </svg>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-[var(--dashboard-subtle)]"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Now</span></div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines MilestoneRail so this module can perform its named task when needed.
function MilestoneRail({ milestones }: { milestones: Milestone[] }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="relative mt-7 space-y-5">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute bottom-5 left-[13px] top-5 w-px bg-white/10" />
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {milestones.map((milestone) => (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="relative flex gap-3" key={milestone.name}>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${milestone.status === 'Complete' ? 'border-[#84C59A]/40 bg-[#84C59A]/15 text-[#84C59A]' : milestone.status === 'In progress' ? 'border-[#F2A65A]/50 bg-[#F2A65A]/15 text-[#F2A65A]' : 'border-white/10 bg-[#171b1f] text-white/30'}`}>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            {milestone.status === 'Complete' ? <CheckCircle2 size={14} /> : <span className="h-2 w-2 rounded-full bg-current" />}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="min-w-0 flex-1">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between gap-3"><p className="text-sm font-medium text-[var(--dashboard-ink)]">{milestone.name}</p><span className="text-xs text-[var(--dashboard-muted)]">{milestone.progress}%</span></div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-1 text-[10px] text-[var(--dashboard-subtle)]">{milestone.date} · {milestone.status}</p>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mt-2"><ProgressBar value={milestone.progress} color={milestone.status === 'Complete' ? 'green' : 'amber'} /></div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ))}
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectManagerDashboardPage so this module can perform its named task when needed.
export function ProjectManagerDashboardPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedId, setSelectedId] = useState(assignedProjects[0].id)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [notice, setNotice] = useState('')
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  const project = useMemo(() => assignedProjects.find((item) => item.id === selectedId) ?? assignedProjects[0], [selectedId])
  // Stores the value in today so later lines can reuse this data or behavior for the current feature.
  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())

  // Stores the value in quickAction so later lines can reuse this data or behavior for the current feature.
  const quickAction = (label: string, path: string) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNotice(`${label} ready with sample data`)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    window.setTimeout(() => goTo(path), 350)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell
      /* Sets the currentPath property so this element receives the data or behavior required by this screen. */
      currentPath="/app/pm/dashboard"
      /* Sets the projectSelector property so this element receives the data or behavior required by this screen. */
      projectSelector={{
        /* Sets the value field so the surrounding object or component receives this setting. */
        value: project.code,
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        /* Transforms each collection item so the corresponding values or interface elements can be produced. */
        options: assignedProjects.map(({ code: id, name }) => ({ id, name })),
        /* Sets the onChange field so the surrounding object or component receives this setting. */
        onChange: (code) => {
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          /* Stores the value in next so later lines can reuse this data or behavior for the current feature. */
          const next = assignedProjects.find((item) => item.code === code)
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          /* Checks this condition before continuing so the code can choose the correct path for the current state. */
          if (next) setSelectedId(next.id)
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        /* Closes the current block or object so the grouped statements or settings end here. */
        },
      /* Continues the component or data expression so its related values and behavior stay grouped together. */
      }}
    >
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1680px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dashboard-amber)]">{today}</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--dashboard-ink)] sm:text-5xl">Good morning, <span className="text-white/45">Project Manager.</span></h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--dashboard-muted)]">Your site operations cockpit for keeping crews coordinated, milestones visible, and every day moving forward.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button type="button" onClick={() => quickAction('Daily site log', `/projects/${project.code}/logs/new`)} className="dashboard-button dashboard-button-primary"><Plus size={16} /> Add daily site log</button>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard tone="featured" className="p-5 sm:p-6">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex flex-col justify-between">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dashboard-amber)]">Assigned project · {project.code}</p><StatusPill tone={project.health === 'On track' ? 'green' : 'amber'}>{project.health}</StatusPill></div><h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--dashboard-ink)]">{project.name}</h2><p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--dashboard-muted)]"><MapPin size={15} />{project.location}</p></div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="mt-8"><div className="flex items-end justify-between"><div><p className="text-5xl font-semibold tracking-[-0.06em] text-[var(--dashboard-ink)]">{project.progress}%</p><p className="mt-1 text-xs text-[var(--dashboard-muted)]">overall project completion</p></div><StatusPill tone={project.status === 'Delayed' ? 'red' : 'amber'}>{project.status}</StatusPill></div><div className="mt-5"><ProgressBar value={project.progress} /><div className="mt-2 flex justify-between text-[10px] text-[var(--dashboard-muted)]"><span>Current stage · {project.stage}</span><span>Target · {project.completionDate}</span></div></div></div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <SiteBlueprint> element to organize this part of the interface. */}
              <SiteBlueprint project={project} />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4"><div><p className="dashboard-eyebrow">Current stage</p><p className="mt-1 text-sm font-semibold text-[var(--dashboard-ink)]">{project.stage}</p></div><div><p className="dashboard-eyebrow">Project started</p><p className="mt-1 text-sm font-semibold text-[var(--dashboard-ink)]">{project.startDate}</p></div><div><p className="dashboard-eyebrow">Expected completion</p><p className="mt-1 text-sm font-semibold text-[var(--dashboard-ink)]">{project.completionDate}</p></div><div><p className="dashboard-eyebrow">Last site update</p><p className="mt-1 text-sm font-semibold text-[var(--dashboard-ink)]">{project.lastUpdate}</p></div></div>
          {/* Closes the <DashboardCard> element so later content is no longer part of this region. */}
          </DashboardCard>
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard className="p-5 sm:p-6"><SectionTitle title="Project pulse" description="Operational health for the selected site." /><div className="mt-6 space-y-5"><div><div className="flex justify-between text-xs"><span className="text-[var(--dashboard-muted)]">Weekly progress</span><span className="font-semibold text-[#84C59A]">+4.2%</span></div><div className="mt-2 h-2 rounded-full bg-white/[0.07]"><div className="h-full w-[68%] rounded-full bg-[#84C59A]" /></div></div><div><div className="flex justify-between text-xs"><span className="text-[var(--dashboard-muted)]">Schedule confidence</span><span className="font-semibold text-[var(--dashboard-amber)]">{project.health === 'On track' ? '88%' : '64%'}</span></div><div className="mt-2 h-2 rounded-full bg-white/[0.07]"><div className="h-full rounded-full bg-[#F2A65A]" style={{ width: project.health === 'On track' ? '88%' : '64%' }} /></div></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="flex items-start gap-3"><ShieldAlert size={18} className="mt-0.5 text-[#F2A65A]" /><div><p className="text-sm font-semibold text-[var(--dashboard-ink)]">Field note</p><p className="mt-1 text-xs leading-5 text-[var(--dashboard-muted)]">{project.health === 'On track' ? 'Crew output is ahead of the weekly baseline.' : 'Review material deliveries before the next structure pour.'}</p></div></div></div><button type="button" onClick={() => quickAction('Progress history', `/projects/${project.code}/progress`)} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--dashboard-amber)]">Open progress history <ArrowUpRight size={13} /></button></div></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section><div className="mb-4"><p className="dashboard-eyebrow">Today at site</p><h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-ink)]">The field, at a glance</h2></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard label="Workers present today" value={String(project.workers)} note="Checked in across active zones" icon={HardHat} /><StatCard label="Machinery in use" value={String(project.machinery).padStart(2, '0')} note="Active across site zones" icon={Wrench} accent="violet" /><StatCard label="Daily logs submitted" value={String(project.logs)} note="Submitted for this project" icon={ClipboardList} accent="green" /><StatCard label="Open site issues" value={String(project.issues).padStart(2, '0')} note="Require field follow-up" icon={AlertTriangle} accent="red" /></div></section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard className="p-5 sm:p-6"><SectionTitle title="Project progress" description="Weekly completion trend from sample site updates." action={<StatusPill tone="green">+4.2% this week</StatusPill>} /><div className="mt-4 flex items-end gap-4"><p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--dashboard-ink)]">{project.progress}%</p><p className="pb-1 text-xs text-[var(--dashboard-muted)]">current completion<br /><span className="font-semibold text-[#84C59A]">{Math.max(0, project.progress - 4)}%</span> previous update</p></div><div className="mt-5"><ProgressTrend project={project} /></div><div className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">{['Structure level 04 slab poured', 'Foundation inspection approved', 'Masonry work started in Tower A'].map((item, index) => <div className="flex gap-2 text-xs" key={item}><CheckCircle2 size={15} className="shrink-0 text-[#84C59A]" /><span className="text-[var(--dashboard-muted)]">{item}<span className="mt-1 block text-[10px] text-[var(--dashboard-subtle)]">{index === 0 ? 'Today' : `${index + 1} days ago`}</span></span></div>)}</div></DashboardCard>
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard className="p-5 sm:p-6"><SectionTitle title="Construction milestones" description="Sample schedule · not saved backend data." /><MilestoneRail milestones={project.milestones} /></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_0.85fr]">
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard><SectionTitle title="Site activity timeline" description={`Latest field signals from ${project.name}.`} action={<Clock3 size={17} className="text-[var(--dashboard-amber)]" />} /><div className="divide-y divide-white/[0.08]">{activity.map(({ title, detail, time, icon: Icon, tone }) => <div className="flex gap-3 px-5 py-4" key={title}><span className={`dashboard-icon dashboard-icon-${tone}`}><Icon size={16} /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-[var(--dashboard-ink)]">{title}</p><p className="mt-1 text-xs text-[var(--dashboard-muted)]">{detail}</p><p className="mt-1 text-[10px] text-[var(--dashboard-subtle)]">{time}</p></div></div>)}</div></DashboardCard>
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard><SectionTitle title="Priority panel" description="Items needing attention from the field team." action={<AlertTriangle size={17} className="text-[#ED8B78]" />} /><div className="divide-y divide-white/[0.08]">{[['Missing daily log', 'Tomorrow’s log is not yet submitted', ClipboardList, `/projects/${project.code}/logs/new`], ['Upcoming deadline', `${project.stage} review due in 12 days`, CalendarClock, `/projects/${project.code}/progress`], ['Open site issue', `${project.issues} material and safety items need review`, ShieldAlert, '/app/daily-logs'], ['Delayed activity', 'Material delivery is one day behind', Truck, '/app/stock-in']].map(([title, detail, Icon, path]) => <button type="button" onClick={() => goTo(path as string)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03]" key={title as string}><span className="dashboard-icon dashboard-icon-red"><Icon size={16} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium text-[var(--dashboard-ink)]">{title as string}</span><span className="mt-1 block text-xs text-[var(--dashboard-muted)]">{detail as string}</span></span><ArrowUpRight size={15} className="text-[var(--dashboard-subtle)]" /></button>)}</div></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        // Transforms each collection item so the corresponding values or interface elements can be produced.
        <section><div className="mb-4"><p className="dashboard-eyebrow">Site shortcuts</p><h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-ink)]">Coordinate the next move</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{[['Add daily log', Plus, `/projects/${project.code}/logs/new`], ['View daily logs', ClipboardList, `/projects/${project.code}/logs`], ['Update progress', BarChart3, `/projects/${project.code}/progress`], ['View labour', Users, '/app/daily-logs'], ['View machinery', Wrench, '/app/daily-logs']].map(([label, Icon, path]) => <button type="button" onClick={() => quickAction(label as string, path as string)} className="dashboard-card group p-4 text-left transition hover:-translate-y-0.5 hover:border-[#F2A65A]/40" key={label as string}><div className="flex items-center justify-between"><span className="dashboard-icon dashboard-icon-amber"><Icon size={17} /></span><ArrowUpRight size={15} className="text-[var(--dashboard-subtle)] group-hover:text-[var(--dashboard-amber)]" /></div><p className="mt-4 text-sm font-medium text-[var(--dashboard-ink)]">{label as string}</p></button>)}</div></section>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      {notice && <button type="button" onClick={() => setNotice('')} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#F2A65A]/30 bg-[#171b1f] px-4 py-3 text-xs text-white shadow-2xl"><CheckCircle2 size={15} className="text-[#84C59A]" />{notice}</button>}
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
