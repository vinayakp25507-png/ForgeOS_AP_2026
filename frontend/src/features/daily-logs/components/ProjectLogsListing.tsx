// Imports ArrowDownRight, ArrowUpRight, CalendarDays, ClipboardList, Edit3, Eye, FilterX, Plus, Search, Users, X from lucide-react so this module can reuse that component, helper, or library.
import { ArrowDownRight, ArrowUpRight, CalendarDays, ClipboardList, Edit3, Eye, FilterX, Plus, Search, Users, X } from 'lucide-react'
// Imports useMemo, useState from react so this module can reuse that component, helper, or library.
import { useMemo, useState } from 'react'
// Imports saveProjectLog from ../data/projectLogStore so this module can reuse that component, helper, or library.
import { saveProjectLog } from '../data/projectLogStore'
// Imports type  ProjectLog, ProjectLogFormValues from ../types/projectLog so this module can reuse that component, helper, or library.
import type { ProjectLog, ProjectLogFormValues } from '../types/projectLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProjectLogsListingProps {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the initialLogs field so the surrounding object or component receives this setting.
  initialLogs: ProjectLog[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles = {
  // Sets the Draft field so the surrounding object or component receives this setting.
  Draft: 'bg-slate-100 text-slate-600',
  // Sets the Submitted field so the surrounding object or component receives this setting.
  Submitted: 'bg-amber-50 text-amber-700',
  // Sets the Approved field so the surrounding object or component receives this setting.
  Approved: 'bg-emerald-50 text-emerald-700',
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in formatDate so later lines can reuse this data or behavior for the current feature.
const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

// Defines ProjectLogsListing so this module can perform its named task when needed.
export function ProjectLogsListing({ projectId, initialLogs }: ProjectLogsListingProps) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [logs, setLogs] = useState(initialLogs)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [fromDate, setFromDate] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [toDate, setToDate] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [activeLog, setActiveLog] = useState<ProjectLog | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editingLog, setEditingLog] = useState<ProjectLog | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [isCreating, setIsCreating] = useState(false)

  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  // Caches visibleLogs so its calculation is repeated only when its inputs change.
  const visibleLogs = useMemo(() => logs
    // Keeps only items matching this condition so the result contains relevant data.
    .filter((log) => (!fromDate || log.date >= fromDate) && (!toDate || log.date <= toDate))
    // Keeps only items matching this condition so the result contains relevant data.
    .filter((log) => log.summary.toLowerCase().includes(search.toLowerCase().trim()))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    .sort((a, b) => b.date.localeCompare(a.date)), [fromDate, logs, search, toDate])
  // Stores the value in latestLog so later lines can reuse this data or behavior for the current feature.
  const latestLog = logs.slice().sort((a, b) => b.date.localeCompare(a.date))[0]
  // Stores the value in hasFilters so later lines can reuse this data or behavior for the current feature.
  const hasFilters = Boolean(search || fromDate || toDate)

  // Stores the value in clearFilters so later lines can reuse this data or behavior for the current feature.
  const clearFilters = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSearch('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFromDate('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setToDate('')
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in saveLog so later lines can reuse this data or behavior for the current feature.
  const saveLog = (values: ProjectLogFormValues) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editingLog) {
      // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
      const updated = { ...editingLog, ...values }
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setLogs((current) => current.map((log) => log.id === editingLog.id ? updated : log))
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      saveProjectLog(updated)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Stores the value in previous so later lines can reuse this data or behavior for the current feature.
      const previous = logs.slice().sort((a, b) => b.date.localeCompare(a.date))[0]
      // Stores the value in created so later lines can reuse this data or behavior for the current feature.
      const created: ProjectLog = { id: `${projectId.toLowerCase()}-log-${Date.now()}`, projectId, ...values, progressChange: Number((values.progress - (previous?.progress ?? 0)).toFixed(1)), issues: '', labour: [], machinery: [] }
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setLogs((current) => [created, ...current])
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      saveProjectLog(created)
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditingLog(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setIsCreating(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  /* Returns the result so the caller or React receives the value or interface this function provides. */
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">
    {/* Starts the <div> element to organize this part of the interface. */}
    <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div>
        {/* Starts the <p> element to organize this part of the interface. */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Green Valley Residency · {projectId}</p>
        {/* Starts the <h1> element to organize this part of the interface. */}
        <h1 className="text-3xl font-bold tracking-tight text-[#323232]">Daily Site Logs</h1>
        {/* Starts the <p> element to organize this part of the interface. */}
        <p className="mt-2 text-sm text-[#8E827A]">A complete record of daily work, resources, and site conditions.</p>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <a> element to provide navigation to another location. */}
      <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#9A5E3A]" href={`/projects/${projectId}/logs/new`}><Plus className="h-4 w-4" /> Add Daily Log</a>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>

    {/* Starts the <div> element to organize this part of the interface. */}
    <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {/* Starts the <SummaryCard> element to organize this part of the interface. */}
      <SummaryCard icon={<ClipboardList />} label="Total daily logs" value={`${logs.length}`} detail="Recorded on this project" />
      {/* Starts the <SummaryCard> element to organize this part of the interface. */}
      <SummaryCard icon={<ArrowUpRight />} label="Current project progress" value={`${latestLog?.progress ?? 0}%`} detail="Latest reported completion" />
      {/* Starts the <SummaryCard> element to organize this part of the interface. */}
      <SummaryCard icon={<CalendarDays />} label="Latest log date" value={latestLog ? formatDate(latestLog.date) : '—'} detail="Most recent site record" />
      {/* Starts the <SummaryCard> element to organize this part of the interface. */}
      <SummaryCard icon={<Users />} label="Workers in latest log" value={`${latestLog?.workerCount ?? 0}`} detail="People recorded on site" />
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>

    {/* Starts the <section> element to group related content into a meaningful region. */}
    <section className="mb-5 rounded-2xl border border-[#E8E0DA] bg-white p-4 shadow-[0_8px_24px_rgba(50,50,50,0.04)]">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* Starts the <label> element to name a form control for users and assistive technology. */}
        <label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-[#A59A93]" /><input className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#A59A93] focus:border-[#9A5E3A]" onChange={(event) => setSearch(event.target.value)} placeholder="Search work summary..." value={search} /></label>
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="grid gap-3 sm:grid-cols-2 xl:flex">
          {/* Starts the <label> element to name a form control for users and assistive technology. */}
          <label className="relative"><span className="sr-only">From date</span><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-[#A59A93]" /><input className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#9A5E3A] xl:w-40" onChange={(event) => setFromDate(event.target.value)} type="date" value={fromDate} /></label>
          {/* Starts the <label> element to name a form control for users and assistive technology. */}
          <label className="relative"><span className="sr-only">To date</span><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-[#A59A93]" /><input className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#9A5E3A] xl:w-40" onChange={(event) => setToDate(event.target.value)} type="date" value={toDate} /></label>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        {hasFilters && <button className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={clearFilters} type="button"><FilterX className="h-4 w-4" /> Clear filters</button>}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <p> element to organize this part of the interface. */}
      <p className="mt-3 text-xs text-[#8E827A]">Showing {visibleLogs.length} of {logs.length} logs · Newest first</p>
    {/* Closes the <section> element so later content is no longer part of this region. */}
    </section>

    // Transforms each collection item so the corresponding values or interface elements can be produced.
    {visibleLogs.length > 0 ? <><div className="hidden overflow-hidden rounded-2xl border border-[#E8E0DA] bg-white shadow-[0_8px_24px_rgba(50,50,50,0.04)] lg:block"><table className="w-full text-left"><thead className="border-b border-[#E8E0DA] bg-[#FBF9F7] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E827A]"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Work summary</th><th className="px-5 py-4">Progress</th><th className="px-5 py-4">Change</th><th className="px-5 py-4">Workers</th><th className="px-5 py-4">Machine hours</th><th className="px-5 py-4">Weather</th><th className="px-5 py-4">Actions</th></tr></thead><tbody className="divide-y divide-[#F1EBE6]">{visibleLogs.map((log) => <LogTableRow key={log.id} log={log} onEdit={() => { window.location.href = `/projects/${projectId}/logs/${log.id}/edit` }} onView={() => { window.location.href = `/projects/${projectId}/logs/${log.id}` }} projectId={projectId} />)}</tbody></table></div><div className="space-y-3 lg:hidden">{visibleLogs.map((log) => <LogMobileCard key={log.id} log={log} onEdit={() => { window.location.href = `/projects/${projectId}/logs/${log.id}/edit` }} onView={() => { window.location.href = `/projects/${projectId}/logs/${log.id}` }} projectId={projectId} />)}</div></> : <EmptyState hasFilters={hasFilters} onClear={clearFilters} onCreate={() => { window.location.href = `/projects/${projectId}/logs/new` }} />}

    // Continues the component or data expression so its related values and behavior stay grouped together.
    {(activeLog || editingLog || isCreating) && <LogModal editingLog={editingLog} isCreating={isCreating} log={activeLog} onClose={() => { setActiveLog(null); setEditingLog(null); setIsCreating(false) }} onSave={saveLog} />}
  {/* Closes the <div> element so later content is no longer part of this region. */}
  </div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines SummaryCard so this module can perform its named task when needed.
function SummaryCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-2xl border border-[#E8E0DA] bg-white p-4 shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-xs font-medium text-[#8E827A]">{label}</span></div><p className="mt-3 text-2xl font-bold text-[#323232]">{value}</p><p className="mt-1 text-[11px] text-[#A59A93]">{detail}</p></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LogTableRow so this module can perform its named task when needed.
function LogTableRow({ log, projectId, onView, onEdit }: { log: ProjectLog; projectId: string; onView: () => void; onEdit: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <tr className="hover:bg-[#FCFAF8]"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#323232]">{formatDate(log.date)}</td><td className="max-w-[260px] px-5 py-4"><p className="truncate text-sm font-medium text-[#323232]">{log.summary}</p><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[log.status]}`}>{log.status}</span></td><td className="min-w-[130px] px-5 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#F0E9E4]"><div className="h-full rounded-full bg-[#B87A4F]" style={{ width: `${log.progress}%` }} /></div><span className="text-xs font-bold">{log.progress}%</span></div></td><td className="whitespace-nowrap px-5 py-4"><ProgressChange value={log.progressChange} /></td><td className="px-5 py-4 text-sm text-[#595552]">{log.workerCount}</td><td className="px-5 py-4 text-sm text-[#595552]">{log.machineryHours}h</td><td className="whitespace-nowrap px-5 py-4 text-xs text-[#8E827A]">{log.weather}</td><td className="px-5 py-4"><Actions logId={log.id} projectId={projectId} onEdit={onEdit} onView={onView} /></td></tr>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LogMobileCard so this module can perform its named task when needed.
function LogMobileCard({ log, onView, onEdit, projectId }: { log: ProjectLog; onView: () => void; onEdit: () => void; projectId: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <article className="rounded-2xl border border-[#E8E0DA] bg-white p-4 shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold">{formatDate(log.date)}</p><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[log.status]}`}>{log.status}</span></div><ProgressChange value={log.progressChange} /></div><p className="mt-4 text-sm leading-5 text-[#595552]">{log.summary}</p><div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#FBF9F7] p-3 text-xs"><div><p className="text-[#8E827A]">Progress</p><p className="mt-1 font-bold">{log.progress}%</p><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E8E0DA]"><div className="h-full rounded-full bg-[#B87A4F]" style={{ width: `${log.progress}%` }} /></div></div><div><p className="text-[#8E827A]">Workers</p><p className="mt-1 font-bold">{log.workerCount}</p></div><div><p className="text-[#8E827A]">Machine hours</p><p className="mt-1 font-bold">{log.machineryHours}h</p></div><div><p className="text-[#8E827A]">Weather</p><p className="mt-1 font-medium">{log.weather}</p></div></div><div className="mt-4 flex gap-2"><button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8E0DA] py-2.5 text-xs font-semibold text-[#595552]" onClick={onView} type="button"><Eye className="h-3.5 w-3.5" /> View details</button><a className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#323232] py-2.5 text-xs font-semibold text-white" href={`/projects/${projectId}/logs/${log.id}/edit`} onClick={onEdit}><Edit3 className="h-3.5 w-3.5" /> Edit</a></div></article>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Actions so this module can perform its named task when needed.
function Actions({ logId, projectId, onView, onEdit }: { logId: string; projectId: string; onView: () => void; onEdit: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="flex items-center gap-1"><button className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F3E9E1] hover:text-[#9A5E3A]" onClick={onView} type="button" aria-label="View details"><Eye className="h-4 w-4" /></button><a className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F3E9E1] hover:text-[#9A5E3A]" href={`/projects/${projectId}/logs/${logId}/edit`} onClick={onEdit} aria-label="Edit log"><Edit3 className="h-4 w-4" /></a></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressChange so this module can perform its named task when needed.
function ProgressChange({ value }: { value: number }) {
  /* Checks this condition before continuing so the code can choose the correct path for the current state. */
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (value === 0) return <span className="text-xs text-[#A59A93]">—</span>
  // Stores the value in positive so later lines can reuse this data or behavior for the current feature.
  const positive = value > 0
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-emerald-700' : 'text-rose-700'}`}>{positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{positive ? '+' : ''}{value}%</span>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines EmptyState so this module can perform its named task when needed.
function EmptyState({ hasFilters, onClear, onCreate }: { hasFilters: boolean; onClear: () => void; onCreate: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-2xl border border-dashed border-[#C8BCB4] bg-white/70 p-10 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E9E1] text-[#9A5E3A]"><ClipboardList className="h-7 w-7" /></div><h2 className="mt-5 text-lg font-bold">{hasFilters ? 'No logs match your filters' : 'No daily logs yet'}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8E827A]">{hasFilters ? 'Try adjusting the date range or search term to find another site record.' : 'Create the first site record to start tracking daily work and resources.'}</p>{hasFilters ? <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#E8E0DA] px-4 py-2.5 text-xs font-semibold text-[#9A5E3A]" onClick={onClear} type="button"><FilterX className="h-4 w-4" /> Clear filters</button> : <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#323232] px-4 py-2.5 text-xs font-semibold text-white" onClick={onCreate} type="button"><Plus className="h-4 w-4" /> Add Daily Log</button>}</div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LogModal so this module can perform its named task when needed.
function LogModal({ log, editingLog, isCreating, onClose, onSave }: { log: ProjectLog | null; editingLog: ProjectLog | null; isCreating: boolean; onClose: () => void; onSave: (values: ProjectLogFormValues) => void }) {
  // Stores the value in isEditing so later lines can reuse this data or behavior for the current feature.
  const isEditing = Boolean(editingLog || isCreating)
  // Stores the value in initial so later lines can reuse this data or behavior for the current feature.
  const initial = editingLog ?? { date: '2024-06-19', summary: '', progress: 42, workerCount: 0, machineryHours: 0, weather: '', issues: '', status: 'Draft' as const, labour: [], machinery: [] }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [values, setValues] = useState<ProjectLogFormValues>(initial)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (log && !isEditing) return <ModalFrame title="Daily log details" onClose={onClose}><div className="space-y-4"><div><p className="text-xs text-[#8E827A]">Date</p><p className="mt-1 font-semibold">{formatDate(log.date)}</p></div><div><p className="text-xs text-[#8E827A]">Work summary</p><p className="mt-1 text-sm leading-6 text-[#595552]">{log.summary}</p></div><div className="grid grid-cols-2 gap-3"><Detail label="Progress" value={`${log.progress}%`} /><Detail label="Progress change" value={`${log.progressChange > 0 ? '+' : ''}${log.progressChange}%`} /><Detail label="Workers" value={`${log.workerCount}`} /><Detail label="Machinery hours" value={`${log.machineryHours}h`} /><Detail label="Weather" value={log.weather} /><Detail label="Status" value={log.status} /></div></div></ModalFrame>
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <ModalFrame title={editingLog ? 'Edit daily log' : 'Add daily log'} onClose={onClose}><div className="space-y-4"><label className="block text-xs font-semibold text-[#595552]">Date<input className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-2.5 text-sm outline-none focus:border-[#9A5E3A]" onChange={(event) => setValues({ ...values, date: event.target.value })} type="date" value={values.date} /></label><label className="block text-xs font-semibold text-[#595552]">Work summary<textarea className="mt-2 min-h-24 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-2.5 text-sm outline-none focus:border-[#9A5E3A]" onChange={(event) => setValues({ ...values, summary: event.target.value })} value={values.summary} /></label><div className="grid grid-cols-2 gap-3"><Field label="Progress %" type="number" value={values.progress} onChange={(value) => setValues({ ...values, progress: Number(value) })} /><Field label="Workers" type="number" value={values.workerCount} onChange={(value) => setValues({ ...values, workerCount: Number(value) })} /><Field label="Machinery hours" type="number" value={values.machineryHours} onChange={(value) => setValues({ ...values, machineryHours: Number(value) })} /><label className="text-xs font-semibold text-[#595552]">Status<select className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#9A5E3A]" onChange={(event) => setValues({ ...values, status: event.target.value as ProjectLog['status'] })} value={values.status}><option>Draft</option><option>Submitted</option><option>Approved</option></select></label></div><label className="block text-xs font-semibold text-[#595552]">Weather<input className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#9A5E3A]" onChange={(event) => setValues({ ...values, weather: event.target.value })} placeholder="Clear · 28°C" value={values.weather} /></label><div className="flex justify-end gap-2 pt-2"><button className="rounded-xl border border-[#E8E0DA] px-4 py-2.5 text-xs font-semibold text-[#595552]" onClick={onClose} type="button">Cancel</button><button className="rounded-xl bg-[#323232] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#9A5E3A]" onClick={() => onSave({ ...values, summary: values.summary || 'Daily site work recorded.' })} type="button">Save log</button></div></div></ModalFrame>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ModalFrame so this module can perform its named task when needed.
function ModalFrame({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#323232]/40 p-4"><div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E8E0DA] bg-white p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><button className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F3E9E1]" onClick={onClose} type="button" aria-label="Close dialog"><X className="h-4 w-4" /></button></div>{children}</div></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Detail so this module can perform its named task when needed.
function Detail({ label, value }: { label: string; value: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-xl bg-[#FBF9F7] p-3"><p className="text-[11px] text-[#8E827A]">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Field so this module can perform its named task when needed.
function Field({ label, type, value, onChange }: { label: string; type: string; value: number; onChange: (value: string) => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <label className="text-xs font-semibold text-[#595552]">{label}<input className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#9A5E3A]" min="0" onChange={(event) => onChange(event.target.value)} type={type} value={value} /></label>
// Closes the current block or object so the grouped statements or settings end here.
}
