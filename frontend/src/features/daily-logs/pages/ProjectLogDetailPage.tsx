// Imports ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, ClipboardList, CloudSun, Edit3, MapPin, Users, Wrench, AlertTriangle from lucide-react so this module can reuse that component, helper, or library.
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, ClipboardList, CloudSun, Edit3, MapPin, Users, Wrench, AlertTriangle } from 'lucide-react'
// Imports type  ReactNode from react so this module can reuse that component, helper, or library.
import type { ReactNode } from 'react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports Breadcrumbs from ../../app-shell/components/Breadcrumbs so this module can reuse that component, helper, or library.
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
// Imports getProjectLogs from ../data/projectLogStore so this module can reuse that component, helper, or library.
import { getProjectLogs } from '../data/projectLogStore'
// Imports type  LabourRow, MachineryRow, ProjectLog from ../types/projectLog so this module can reuse that component, helper, or library.
import type { LabourRow, MachineryRow, ProjectLog } from '../types/projectLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProjectLogDetailPageProps {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the logId field so the surrounding object or component receives this setting.
  logId: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in formatDate so later lines can reuse this data or behavior for the current feature.
const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

// Defines ProjectLogDetailPage so this module can perform its named task when needed.
export function ProjectLogDetailPage({ projectId, logId }: ProjectLogDetailPageProps) {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = getProjectLogs(projectId).find((item) => item.id === logId)

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!log) {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <AppShell currentPath={`/projects/${projectId}/logs`}><div className="mx-auto max-w-5xl p-6 lg:p-10"><Breadcrumbs current="Daily Log" /><div className="rounded-2xl border border-dashed border-[#C8BCB4] bg-white p-10 text-center"><h1 className="text-2xl font-bold">Daily log not found</h1><p className="mt-2 text-sm text-[#8E827A]">This record may have been removed or belongs to another project.</p><a className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#323232] px-4 py-2.5 text-sm font-semibold text-white" href={`/projects/${projectId}/logs`}><ArrowLeft className="h-4 w-4" /> Back to logs</a></div></div></AppShell>
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in totalWorkers so later lines can reuse this data or behavior for the current feature.
  const totalWorkers = log.labour.reduce((total, row) => total + row.workers, 0)
  // Stores the value in totalLabourHours so later lines can reuse this data or behavior for the current feature.
  const totalLabourHours = log.labour.reduce((total, row) => total + row.workers * row.hours, 0)
  // Stores the value in totalMachineryHours so later lines can reuse this data or behavior for the current feature.
  const totalMachineryHours = log.machinery.reduce((total, row) => total + row.hours, 0)
  // Stores the value in totalFuel so later lines can reuse this data or behavior for the current feature.
  const totalFuel = log.machinery.reduce((total, row) => total + row.fuel, 0)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return <AppShell currentPath={`/projects/${projectId}/logs`}><div className="mx-auto max-w-6xl p-5 sm:p-6 lg:p-10"><Breadcrumbs current="Daily Log Details" /><header className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><a className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#8E827A] hover:text-[#9A5E3A]" href={`/projects/${projectId}/logs`}><ArrowLeft className="h-3.5 w-3.5" /> Back to daily logs</a><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Green Valley Residency · {projectId}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{formatDate(log.date)}</h1><p className="mt-2 flex items-center gap-1.5 text-sm text-[#8E827A]"><MapPin className="h-3.5 w-3.5" /> Daily site record</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">{log.status}</span><a className="inline-flex items-center gap-2 rounded-xl bg-[#323232] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#9A5E3A]" href={`/projects/${projectId}/logs/${log.id}/edit`}><Edit3 className="h-3.5 w-3.5" /> Edit log</a></div></header>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]"><ProgressCard log={log} /><SummaryCard totalFuel={totalFuel} totalLabourHours={totalLabourHours} totalMachineryHours={totalMachineryHours} totalWorkers={totalWorkers} /></div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2"><WorkSummary log={log} /><LabourCard entries={log.labour} totalHours={totalLabourHours} totalWorkers={totalWorkers} /><MachineryCard entries={log.machinery} totalFuel={totalFuel} totalHours={totalMachineryHours} /></div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div></AppShell>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressCard so this module can perform its named task when needed.
function ProgressCard({ log }: { log: ProjectLog }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[#9A5E3A]"><ArrowUpRight className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-[0.14em]">Progress update</p></div><p className="mt-3 text-4xl font-bold tracking-tight">{log.progress}%</p><p className="mt-1 text-sm text-[#8E827A]">Current cumulative project progress</p></div><div className="rounded-xl bg-[#F3E9E1] px-3 py-2 text-right"><p className="text-[11px] text-[#8E827A]">Change</p><p className="text-sm font-bold text-emerald-700">{log.progressChange > 0 ? '+' : ''}{log.progressChange} pts</p></div></div><div className="mt-6 h-3 overflow-hidden rounded-full bg-[#F0E9E4]"><div className="h-full rounded-full bg-[#B87A4F]" style={{ width: `${log.progress}%` }} /></div><div className="mt-3 flex justify-between text-xs text-[#8E827A]"><span>Previous progress: {Math.max(0, log.progress - log.progressChange)}%</span><span>100%</span></div></section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines SummaryCard so this module can perform its named task when needed.
function SummaryCard({ totalWorkers, totalLabourHours, totalMachineryHours, totalFuel }: { totalWorkers: number; totalLabourHours: number; totalMachineryHours: number; totalFuel: number }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="grid grid-cols-2 gap-3 rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4 sm:grid-cols-4 lg:grid-cols-2"><Metric icon={<Users />} label="Workers" value={`${totalWorkers}`} /><Metric icon={<CalendarDays />} label="Labour hours" value={`${totalLabourHours}h`} /><Metric icon={<Wrench />} label="Machine hours" value={`${totalMachineryHours}h`} /><Metric icon={<CheckCircle2 />} label="Fuel used" value={`${totalFuel} L`} /></section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines WorkSummary so this module can perform its named task when needed.
function WorkSummary({ log }: { log: ProjectLog }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><SectionHeading icon={<ClipboardIcon />} title="Work summary" /><p className="mt-4 text-sm leading-7 text-[#595552]">{log.summary}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><InfoItem icon={<CloudSun />} label="Weather" value={log.weather} /><InfoItem icon={<AlertTriangle />} label="Issues and delays" value={log.issues || 'No issues or delays recorded.'} /></div></section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LabourCard so this module can perform its named task when needed.
function LabourCard({ entries, totalWorkers, totalHours }: { entries: LabourRow[]; totalWorkers: number; totalHours: number }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="flex items-start justify-between gap-3"><SectionHeading icon={<Users />} title="Labour attendance" /><div className="text-right"><p className="text-lg font-bold">{totalWorkers}</p><p className="text-[11px] text-[#8E827A]">workers · {totalHours}h</p></div></div>{entries.length ? <div className="mt-5 space-y-3">{entries.map((entry) => <div className="rounded-xl bg-[#FBF9F7] p-4" key={entry.id}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{entry.trade === 'Other' ? entry.customTrade : entry.trade}</p><p className="mt-1 text-xs text-[#8E827A]">{entry.contractor || 'Contractor not recorded'}</p></div><span className="rounded-full bg-[#F3E9E1] px-2.5 py-1 text-xs font-bold text-[#9A5E3A]">{entry.workers} workers</span></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#595552]"><span>{entry.hours}h each</span><span>{entry.workers * entry.hours} labour hours</span>{entry.remarks && <span>{entry.remarks}</span>}</div></div>)}</div> : <EmptySection text="No labour rows recorded for this log." />}</section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines MachineryCard so this module can perform its named task when needed.
function MachineryCard({ entries, totalHours, totalFuel }: { entries: MachineryRow[]; totalHours: number; totalFuel: number }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="flex items-start justify-between gap-3"><SectionHeading icon={<Wrench />} title="Machinery usage" /><div className="text-right"><p className="text-lg font-bold">{totalHours}h</p><p className="text-[11px] text-[#8E827A]">machine hours · {totalFuel} L</p></div></div>{entries.length ? <div className="mt-5 space-y-3">{entries.map((entry) => <div className="rounded-xl bg-[#FBF9F7] p-4" key={entry.id}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{entry.machine}</p><p className="mt-1 text-xs text-[#8E827A]">{entry.operator || 'Operator not recorded'}</p></div><span className="rounded-full bg-[#F3E9E1] px-2.5 py-1 text-xs font-bold text-[#9A5E3A]">{entry.hours}h</span></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#595552]"><span>{entry.fuel} L fuel</span>{entry.remarks && <span>{entry.remarks}</span>}</div></div>)}</div> : <EmptySection text="No machinery rows recorded for this log." />}</section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines SectionHeading so this module can perform its named task when needed.
function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="flex items-center gap-2 text-[#323232]"><span className="text-[#9A5E3A]">{icon}</span><h2 className="font-semibold">{title}</h2></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines InfoItem so this module can perform its named task when needed.
function InfoItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-xl bg-[#FBF9F7] p-3"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span><p className="text-[11px] font-semibold uppercase tracking-wide text-[#8E827A]">{label}</p></div><p className="mt-2 text-sm leading-5 text-[#595552]">{value}</p></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Metric so this module can perform its named task when needed.
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-xl bg-white p-3"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span><p className="text-[11px] text-[#8E827A]">{label}</p></div><p className="mt-2 text-lg font-bold">{value}</p></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines EmptySection so this module can perform its named task when needed.
function EmptySection({ text }: { text: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <p className="mt-5 rounded-xl border border-dashed border-[#D9CEC6] p-5 text-center text-xs text-[#8E827A]">{text}</p>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ClipboardIcon so this module can perform its named task when needed.
function ClipboardIcon() {
  /* Returns the result so the caller or React receives the value or interface this function provides. */
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <ClipboardListIcon />
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ClipboardListIcon so this module can perform its named task when needed.
function ClipboardListIcon() {
  /* Returns the result so the caller or React receives the value or interface this function provides. */
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <ClipboardList className="h-4 w-4" />
// Closes the current block or object so the grouped statements or settings end here.
}
