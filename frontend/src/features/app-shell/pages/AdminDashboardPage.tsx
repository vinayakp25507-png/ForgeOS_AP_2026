// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  AlertTriangle,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ArrowUpRight,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  BarChart3,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  BellRing,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Building2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  CheckCircle2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ClipboardList,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Clock3,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  FolderKanban,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Grid2X2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  List,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MapPin,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Plus,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Search,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  SlidersHorizontal,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  TrendingUp,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  UsersRound,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  WalletCards,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  X,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports useMemo, useState from react so this module can reuse that component, helper, or library.
import { useMemo, useState } from 'react'
// Imports AppShell from ../components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../components/AppShell'
// Imports DashboardCard, ProgressBar, SectionTitle, StatCard, StatusPill from ../components/dashboard-ui so this module can reuse that component, helper, or library.
import { DashboardCard, ProgressBar, SectionTitle, StatCard, StatusPill } from '../components/dashboard-ui'

// Continues the component or data expression so its related values and behavior stay grouped together.
type ProjectStatus = 'In Progress' | 'Completed' | 'Delayed' | 'Planning'
// Continues the component or data expression so its related values and behavior stay grouped together.
type ProjectHealth = 'Healthy' | 'Watch' | 'At risk'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Project = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the location field so the surrounding object or component receives this setting.
  location: string
  // Sets the manager field so the surrounding object or component receives this setting.
  manager: string
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number
  // Sets the stage field so the surrounding object or component receives this setting.
  stage: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: ProjectStatus
  // Sets the health field so the surrounding object or component receives this setting.
  health: ProjectHealth
  // Sets the completionDate field so the surrounding object or component receives this setting.
  completionDate: string
  // Sets the value field so the surrounding object or component receives this setting.
  value: string
  // Sets the image field so the surrounding object or component receives this setting.
  image: string
  // Sets the tone field so the surrounding object or component receives this setting.
  tone: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in projects so later lines can reuse this data or behavior for the current feature.
const projects: Project[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-001', name: 'Green Valley Residency', location: 'Gurugram, Haryana', manager: 'Aarav Sharma', progress: 76, stage: 'Finishing', status: 'In Progress', health: 'Healthy', completionDate: '20 Dec 2026', value: '₹84.2 Cr', image: 'tower', tone: '#F2A65A' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-002', name: 'Skyline Commercial Hub', location: 'Delhi, India', manager: 'Priya Mehta', progress: 52, stage: 'Structure', status: 'In Progress', health: 'Watch', completionDate: '15 Mar 2027', value: '₹126.8 Cr', image: 'office', tone: '#91B59A' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-003', name: 'Riverside Heights', location: 'Noida, Uttar Pradesh', manager: 'Rohan Verma', progress: 100, stage: 'Handover', status: 'Completed', health: 'Healthy', completionDate: '30 Aug 2026', value: '₹62.4 Cr', image: 'riverside', tone: '#A99BDA' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-004', name: 'Urban Square', location: 'Jaipur, Rajasthan', manager: 'Neha Kapoor', progress: 28, stage: 'Planning', status: 'Planning', health: 'Watch', completionDate: '30 Oct 2027', value: '₹48.6 Cr', image: 'square', tone: '#D5A76D' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-005', name: 'Harbor View Villas', location: 'Mumbai, Maharashtra', manager: 'Priya Mehta', progress: 41, stage: 'Foundation', status: 'Delayed', health: 'At risk', completionDate: '08 Jan 2027', value: '₹97.3 Cr', image: 'villas', tone: '#E48172' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in activity so later lines can reuse this data or behavior for the current feature.
const activity = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Progress update recorded', detail: 'Green Valley Residency reached 76%', time: '25 min ago', icon: TrendingUp, tone: 'green' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'New project created', detail: 'Harbor View Villas · PRJ-005', time: '2 hours ago', icon: FolderKanban, tone: 'amber' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Daily site log added', detail: 'Skyline Commercial Hub · 12 entries', time: 'Yesterday', icon: ClipboardList, tone: 'violet' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { title: 'Project assignment changed', detail: 'Urban Square assigned to Neha Kapoor', time: 'Yesterday', icon: UsersRound, tone: 'amber' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in healthTone so later lines can reuse this data or behavior for the current feature.
const healthTone: Record<ProjectHealth, 'green' | 'amber' | 'red'> = { Healthy: 'green', Watch: 'amber', 'At risk': 'red' }
// Stores the value in statusTone so later lines can reuse this data or behavior for the current feature.
const statusTone: Record<ProjectStatus, 'green' | 'amber' | 'red' | 'violet'> = { 'In Progress': 'amber', Completed: 'green', Delayed: 'red', Planning: 'violet' }

// Defines goTo so this module can perform its named task when needed.
function goTo(path: string) {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  window.location.href = path
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines BlueprintImage so this module can perform its named task when needed.
function BlueprintImage({ project }: { project: Project }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="relative h-40 overflow-hidden rounded-xl border border-white/10" style={{ background: `linear-gradient(135deg, ${project.tone}28, #101417 72%)` }}>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      {/* Starts the <svg> element to organize this part of the interface. */}
      <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden="true">
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d={project.image === 'office' ? 'M48 154V52h68v102M132 154V24h88v130M244 154V72h108v82M38 154h330' : project.image === 'villas' ? 'M42 154V94l40-38 40 38v60M142 154V72l40-28 40 28v82M250 154V88l42-32 42 32v66' : 'M55 154V72l50-42 50 42v82M190 154V45l58-28 58 28v109M42 154h275'} fill="none" stroke={project.tone} strokeWidth="2" />
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M20 154h360" stroke="rgba(255,255,255,.45)" strokeWidth="1" />
      {/* Closes the <svg> element so later content is no longer part of this region. */}
      </svg>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
        {/* Starts the <span> element to organize this part of the interface. */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{project.id} · {project.stage}</span>
        {/* Starts the <Building2> element to organize this part of the interface. */}
        <Building2 size={17} style={{ color: project.tone }} />
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectCard so this module can perform its named task when needed.
function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <DashboardCard className={compact ? 'flex gap-4 p-4' : 'p-4'}>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      {!compact && <BlueprintImage project={project} />}
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className={compact ? 'min-w-0 flex-1' : 'pt-4'}>
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex items-start justify-between gap-3">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="min-w-0">
            {/* Starts the <h3> element to organize this part of the interface. */}
            <h3 className="truncate text-sm font-semibold text-[var(--dashboard-ink)]">{project.name}</h3>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-1 flex items-center gap-1 text-xs text-[var(--dashboard-muted)]"><MapPin size={12} />{project.location}</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <StatusPill> element to organize this part of the interface. */}
          <StatusPill tone={healthTone[project.health]}>{project.health}</StatusPill>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="mt-4 flex items-end justify-between gap-3">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div><p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--dashboard-ink)]">{project.progress}%</p><p className="text-[10px] text-[var(--dashboard-muted)]">portfolio completion</p></div>
          {/* Starts the <StatusPill> element to organize this part of the interface. */}
          <StatusPill tone={statusTone[project.status]}>{project.status}</StatusPill>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <ProgressBar> element to organize this part of the interface. */}
        <ProgressBar value={project.progress} color={project.health === 'At risk' ? 'red' : project.health === 'Healthy' ? 'green' : 'amber'} />
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div><p className="text-[var(--dashboard-subtle)]">Project manager</p><p className="mt-1 font-medium text-[var(--dashboard-ink)]">{project.manager}</p></div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div><p className="text-[var(--dashboard-subtle)]">Expected completion</p><p className="mt-1 font-medium text-[var(--dashboard-ink)]">{project.completionDate}</p></div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <DashboardCard> element so later content is no longer part of this region. */}
    </DashboardCard>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines CompletionTrend so this module can perform its named task when needed.
function CompletionTrend() {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="relative h-48">
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[var(--dashboard-subtle)]">{[100, 75, 50, 25, 0].map((value) => <div className="flex items-center gap-3" key={value}><span className="w-7 text-right">{value}%</span><div className="h-px flex-1 bg-white/[0.07]" /></div>)}</div>
      {/* Starts the <svg> element to organize this part of the interface. */}
      <svg className="absolute bottom-5 left-10 right-0 h-40 w-[calc(100%-2.5rem)]" viewBox="0 0 500 150" preserveAspectRatio="none" role="img" aria-label="Portfolio completion trend">
        {/* Starts the <defs> element to organize this part of the interface. */}
        <defs><linearGradient id="adminTrendFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#F2A65A" stopOpacity=".32" /><stop offset="100%" stopColor="#F2A65A" stopOpacity="0" /></linearGradient></defs>
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M0 127 C50 120 62 105 110 110 S160 82 210 88 S260 67 310 72 S365 44 410 48 S460 28 500 18 L500 150 L0 150 Z" fill="url(#adminTrendFill)" />
        {/* Starts the <path> element to organize this part of the interface. */}
        <path d="M0 127 C50 120 62 105 110 110 S160 82 210 88 S260 67 310 72 S365 44 410 48 S460 28 500 18" fill="none" stroke="#F2A65A" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        {/* Starts the <circle> element to organize this part of the interface. */}
        <circle cx="500" cy="18" r="5" fill="#FFC078" />
      {/* Closes the <svg> element so later content is no longer part of this region. */}
      </svg>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-[var(--dashboard-subtle)]"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines AdminDashboardPage so this module can perform its named task when needed.
export function AdminDashboardPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [query, setQuery] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [listView, setListView] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [notice, setNotice] = useState('')
  // Stores the value in currentDate so later lines can reuse this data or behavior for the current feature.
  const currentDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  // Caches filteredProjects so its calculation is repeated only when its inputs change.
  const filteredProjects = useMemo(() => projects.filter((project) => {
    // Stores the value in matchesQuery so later lines can reuse this data or behavior for the current feature.
    const matchesQuery = `${project.name} ${project.location} ${project.manager}`.toLowerCase().includes(query.toLowerCase())
    // Returns the result so the caller or React receives the value or interface this function provides.
    return matchesQuery && (filter === 'All' || project.status === filter)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [filter, query])
  // Stores the value in attentionProjects so later lines can reuse this data or behavior for the current feature.
  const attentionProjects = projects.filter((project) => project.health !== 'Healthy')

  // Stores the value in quickAction so later lines can reuse this data or behavior for the current feature.
  const quickAction = (label: string, path: string) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNotice(`${label} workspace opened`)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    window.setTimeout(() => goTo(path), 350)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/admin/dashboard">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1680px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dashboard-amber)]">{currentDate}</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--dashboard-ink)] sm:text-5xl">Your Portfolio, <span className="text-white/45">Under Control.</span></h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--dashboard-muted)]">A live command center for every site, milestone, and decision across the ForgeOS construction portfolio.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-wrap gap-3">
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button type="button" onClick={() => quickAction('Create project', '/app/projects')} className="dashboard-button dashboard-button-ghost"><Plus size={16} /> Create project</button>
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button type="button" onClick={() => quickAction('Reports', '/app/reports')} className="dashboard-button dashboard-button-primary"><BarChart3 size={16} /> Open reports</button>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard tone="featured" className="p-5 sm:p-6">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-start justify-between"><div><p className="dashboard-eyebrow">Portfolio completion</p><p className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-[var(--dashboard-ink)]">59.4%</p><p className="mt-2 text-xs text-[var(--dashboard-green)]">↑ 6.8% vs last month</p></div><span className="dashboard-icon dashboard-icon-amber"><TrendingUp size={19} /></span></div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mt-6"><ProgressBar value={59.4} /><div className="mt-2 flex justify-between text-[10px] text-[var(--dashboard-muted)]"><span>Current portfolio progress</span><span>Target 72%</span></div></div>
          {/* Closes the <DashboardCard> element so later content is no longer part of this region. */}
          </DashboardCard>
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard className="p-5 sm:p-6"><p className="dashboard-eyebrow">Active project value <span className="text-[var(--dashboard-subtle)]">(sample data)</span></p><p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--dashboard-ink)]">₹357.3 Cr</p><div className="mt-5 flex items-center gap-2 text-xs text-[var(--dashboard-muted)]"><WalletCards size={14} className="text-[var(--dashboard-amber)]" /> 5 projects in portfolio</div></DashboardCard>
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard className="p-5 sm:p-6"><p className="dashboard-eyebrow">Needs attention</p><p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--dashboard-red)]">{attentionProjects.length}</p><p className="mt-2 text-xs text-[var(--dashboard-muted)]">projects outside healthy range</p><button type="button" onClick={() => document.getElementById('attention')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--dashboard-amber)]">Review priorities <ArrowUpRight size={13} /></button></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Total projects" value="05" note="Across 4 locations" icon={FolderKanban} />
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Active projects" value="02" note="Currently in progress" icon={TrendingUp} />
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Completed" value="01" note="Successfully handed over" icon={CheckCircle2} accent="green" />
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Delayed" value="01" note="Requires immediate action" icon={AlertTriangle} accent="red" />
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Project managers" value="04" note="3 active this month" icon={UsersRound} accent="violet" />
          {/* Starts the <StatCard> element to organize this part of the interface. */}
          <StatCard label="Site updates" value="18" note="Logs submitted this week" icon={ClipboardList} accent="green" />
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div><p className="dashboard-eyebrow">Portfolio workspace</p><h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-ink)]">Projects in motion</h2></div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--dashboard-subtle)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." className="dashboard-input pl-9" /></label>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={filter} onChange={(event) => setFilter(event.target.value as 'All' | ProjectStatus)} className="dashboard-input"><option>All</option><option>In Progress</option><option>Completed</option><option>Delayed</option><option>Planning</option></select>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" aria-label="Grid view" onClick={() => setListView(false)} className={`dashboard-view-button ${!listView ? 'dashboard-view-active' : ''}`}><Grid2X2 size={16} /></button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" aria-label="List view" onClick={() => setListView(true)} className={`dashboard-view-button ${listView ? 'dashboard-view-active' : ''}`}><List size={16} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          {filteredProjects.length ? <div className={listView ? 'grid gap-3' : 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'}>{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} compact={listView} />)}</div> : <DashboardCard className="p-10 text-center"><SlidersHorizontal className="mx-auto text-[var(--dashboard-subtle)]" /><p className="mt-3 text-sm text-[var(--dashboard-ink)]">No projects match your filters.</p><button type="button" onClick={() => { setQuery(''); setFilter('All') }} className="mt-3 text-xs text-[var(--dashboard-amber)]">Clear filters</button></DashboardCard>}
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          {/* Starts the <DashboardCard> element to organize this part of the interface. */}
          <DashboardCard className="p-5 sm:p-6"><SectionTitle title="Portfolio analytics" description="Completion velocity across the current operating year." action={<span className="dashboard-pill dashboard-pill-green">+6.8% trend</span>} /><CompletionTrend /></DashboardCard>
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard className="p-5 sm:p-6"><SectionTitle title="Projects by stage" description="Distribution of active construction work." /><div className="mt-6 space-y-4">{[['Planning', 1, 'violet'], ['Foundation', 1, 'red'], ['Structure', 1, 'amber'], ['Finishing', 1, 'green'], ['Handover', 1, 'green']].map(([label, count, tone]) => <div key={label as string}><div className="mb-2 flex justify-between text-xs"><span className="text-[var(--dashboard-muted)]">{label as string}</span><span className="font-medium text-[var(--dashboard-ink)]">{count as number} project</span></div><div className="h-2 rounded-full bg-white/[0.07]"><div className={`h-full rounded-full ${tone === 'violet' ? 'bg-[#B7A3E3]' : tone === 'red' ? 'bg-[#ED8B78]' : tone === 'green' ? 'bg-[#84C59A]' : 'bg-[#F2A65A]'}`} style={{ width: '20%' }} /></div></div>)}</div></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section id="attention" className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard><SectionTitle title="Attention required" description="Priority signals from across the portfolio." action={<BellRing size={17} className="text-[var(--dashboard-amber)]" />} /><div className="divide-y divide-white/[0.08]">{attentionProjects.map((project) => <button type="button" onClick={() => goTo('/app/projects')} className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03]" key={project.id}><span className={`dashboard-icon ${project.health === 'At risk' ? 'dashboard-icon-red' : 'dashboard-icon-amber'}`}><AlertTriangle size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-[var(--dashboard-ink)]">{project.name}</span><span className="mt-1 block text-xs text-[var(--dashboard-muted)]">{project.health === 'At risk' ? 'Delayed activity and delivery risk' : 'Progress below expected baseline'} · {project.progress}% complete</span></span><ArrowUpRight size={15} className="text-[var(--dashboard-subtle)]" /></button>)}</div></DashboardCard>
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          <DashboardCard><SectionTitle title="Recent activity" description="The latest operating signals from your teams." action={<Clock3 size={17} className="text-[var(--dashboard-amber)]" />} /><div className="divide-y divide-white/[0.08]">{activity.map(({ title, detail, time, icon: Icon, tone }) => <div className="flex gap-3 px-5 py-4" key={title}><span className={`dashboard-icon dashboard-icon-${tone}`}><Icon size={16} /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-[var(--dashboard-ink)]">{title}</p><p className="mt-1 truncate text-xs text-[var(--dashboard-muted)]">{detail}</p><p className="mt-1 text-[10px] text-[var(--dashboard-subtle)]">{time}</p></div></div>)}</div></DashboardCard>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        // Transforms each collection item so the corresponding values or interface elements can be produced.
        <section><div className="mb-4"><p className="dashboard-eyebrow">Command shortcuts</p><h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-ink)]">Move work forward</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['Create project', Plus, '/app/projects'], ['Add project manager', UsersRound, '/app/users'], ['View all projects', FolderKanban, '/app/projects'], ['Open reports', BarChart3, '/app/reports']].map(([label, Icon, path]) => <button type="button" key={label as string} onClick={() => quickAction(label as string, path as string)} className="dashboard-card group p-4 text-left transition hover:-translate-y-0.5 hover:border-[#F2A65A]/40"><div className="flex items-center justify-between"><span className="dashboard-icon dashboard-icon-amber"><Icon size={17} /></span><ArrowUpRight size={15} className="text-[var(--dashboard-subtle)] transition group-hover:text-[var(--dashboard-amber)]" /></div><p className="mt-4 text-sm font-medium text-[var(--dashboard-ink)]">{label as string}</p></button>)}</div></section>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      {notice && <button type="button" onClick={() => setNotice('')} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#F2A65A]/30 bg-[#171b1f] px-4 py-3 text-xs text-white shadow-2xl"><CheckCircle2 size={15} className="text-[#84C59A]" />{notice}<X size={14} className="text-white/40" /></button>}
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
