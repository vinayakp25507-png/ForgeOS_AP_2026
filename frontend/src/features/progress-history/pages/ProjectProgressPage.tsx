// Imports ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays, ClipboardList, Eye, FilterX from lucide-react so this module can reuse that component, helper, or library.
import { ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays, ClipboardList, Eye, FilterX } from 'lucide-react'
// Imports useMemo, useState from react so this module can reuse that component, helper, or library.
import { useMemo, useState } from 'react'
// Imports type  ProjectLog from ../../daily-logs/types/projectLog so this module can reuse that component, helper, or library.
import type { ProjectLog } from '../../daily-logs/types/projectLog'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports Breadcrumbs from ../../app-shell/components/Breadcrumbs so this module can reuse that component, helper, or library.
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
// Imports getProjectLogs from ../../daily-logs/data/projectLogStore so this module can reuse that component, helper, or library.
import { getProjectLogs } from '../../daily-logs/data/projectLogStore'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProjectProgressPageProps {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in formatDate so later lines can reuse this data or behavior for the current feature.
const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
// Stores the value in formatShortDate so later lines can reuse this data or behavior for the current feature.
const formatShortDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

// Defines ProjectProgressPage so this module can perform its named task when needed.
export function ProjectProgressPage({ projectId }: ProjectProgressPageProps) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [fromDate, setFromDate] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [toDate, setToDate] = useState('')
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  // Caches allLogs so its calculation is repeated only when its inputs change.
  const allLogs = useMemo(() => getProjectLogs(projectId).sort((a, b) => a.date.localeCompare(b.date)), [projectId])
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  // Caches filteredLogs so its calculation is repeated only when its inputs change.
  const filteredLogs = useMemo(() => allLogs.filter((log) => (!fromDate || log.date >= fromDate) && (!toDate || log.date <= toDate)), [allLogs, fromDate, toDate])
  // Stores the value in newestLog so later lines can reuse this data or behavior for the current feature.
  const newestLog = allLogs[allLogs.length - 1]
  // Stores the value in previousLog so later lines can reuse this data or behavior for the current feature.
  const previousLog = allLogs[allLogs.length - 2]
  // Stores the value in totalIncrease so later lines can reuse this data or behavior for the current feature.
  const totalIncrease = newestLog && allLogs[0] ? Number((newestLog.progress - allLogs[0].progress).toFixed(1)) : 0
  // Stores the value in hasFilters so later lines can reuse this data or behavior for the current feature.
  const hasFilters = Boolean(fromDate || toDate)

  // Stores the value in clearFilters so later lines can reuse this data or behavior for the current feature.
  const clearFilters = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFromDate('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setToDate('')
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return <AppShell currentPath={`/projects/${projectId}/progress`}><div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10"><Breadcrumbs current="Progress History" /><header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Green Valley Residency · {projectId}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Project Progress History</h1><p className="mt-2 text-sm text-[#8E827A]">Track cumulative progress and daily site activity over time.</p></div><div className="flex items-center gap-2"><DateInput label="From" value={fromDate} onChange={setFromDate} /><DateInput label="To" value={toDate} onChange={setToDate} />{hasFilters && <button className="mt-5 rounded-xl p-2 text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={clearFilters} type="button" aria-label="Clear date filters"><FilterX className="h-4 w-4" /></button>}</div></header>
      {/* Starts the <section> element to group related content into a meaningful region. */}
      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Metric icon={<BarChart3 />} label="Current progress" value={`${newestLog?.progress ?? 0}%`} detail="Latest cumulative value" /><Metric icon={<ArrowUpRight />} label="Previous progress" value={`${previousLog?.progress ?? allLogs[0]?.progress ?? 0}%`} detail="Prior recorded value" /><Metric icon={<TrendingIcon positive={totalIncrease >= 0} />} label="Total increase" value={`${totalIncrease >= 0 ? '+' : ''}${totalIncrease} pts`} detail="Since first log" /><Metric icon={<ClipboardList />} label="Total daily logs" value={`${allLogs.length}`} detail="Recorded on project" /><Metric icon={<CalendarDays />} label="Last updated" value={newestLog ? formatDate(newestLog.date) : '—'} detail="Latest site record" /></section>
      {/* Starts the <ProgressChart> element to organize this part of the interface. */}
      <ProgressChart logs={filteredLogs} />
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      <section className="mt-5 overflow-hidden rounded-2xl border border-[#E8E0DA] bg-white shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="border-b border-[#E8E0DA] px-5 py-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-semibold">Progress history</h2><p className="mt-1 text-xs text-[#8E827A]">Daily cumulative progress records</p></div><span className="text-xs text-[#8E827A]">{filteredLogs.length} records</span></div></div>{filteredLogs.length ? <div className="hidden overflow-x-auto lg:block"><table className="w-full text-left"><thead className="bg-[#FBF9F7] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E827A]"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Progress</th><th className="px-5 py-4">Change</th><th className="px-5 py-4">Work summary</th><th className="px-5 py-4">Workers</th><th className="px-5 py-4">Machine hours</th><th className="px-5 py-4">Action</th></tr></thead><tbody className="divide-y divide-[#F1EBE6]">{filteredLogs.slice().reverse().map((log) => <ProgressRow key={log.id} log={log} />)}</tbody></table></div> : <EmptyState onClear={clearFilters} />}{filteredLogs.length > 0 && <div className="space-y-3 p-4 lg:hidden">{filteredLogs.slice().reverse().map((log) => <ProgressCard key={log.id} log={log} />)}</div>}</section>
      {/* Starts the <ActivityTimeline> element to organize this part of the interface. */}
      <ActivityTimeline logs={filteredLogs} />
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div></AppShell>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressChart so this module can perform its named task when needed.
function ProgressChart({ logs }: { logs: ProjectLog[] }) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Stores the value in width so later lines can reuse this data or behavior for the current feature.
  const width = 900
  // Stores the value in height so later lines can reuse this data or behavior for the current feature.
  const height = 290
  // Stores the value in pad so later lines can reuse this data or behavior for the current feature.
  const pad = { top: 24, right: 24, bottom: 42, left: 44 }
  // Stores the value in chartWidth so later lines can reuse this data or behavior for the current feature.
  const chartWidth = width - pad.left - pad.right
  // Stores the value in chartHeight so later lines can reuse this data or behavior for the current feature.
  const chartHeight = height - pad.top - pad.bottom
  // Stores the value in points so later lines can reuse this data or behavior for the current feature.
  const points = logs.map((log, index) => ({ log, x: pad.left + (logs.length === 1 ? chartWidth / 2 : (index / (logs.length - 1)) * chartWidth), y: pad.top + chartHeight - (log.progress / 100) * chartHeight }))
  // Stores the value in line so later lines can reuse this data or behavior for the current feature.
  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  // Stores the value in area so later lines can reuse this data or behavior for the current feature.
  const area = points.length ? `${pad.left},${pad.top + chartHeight} ${line} ${pad.left + chartWidth},${pad.top + chartHeight}` : ''

  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="mb-5 flex items-start justify-between"><div><div className="flex items-center gap-2 text-[#9A5E3A]"><BarChart3 className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-[0.14em]">Progress chart</p></div><h2 className="mt-2 text-lg font-semibold">Cumulative project progress</h2><p className="mt-1 text-xs text-[#8E827A]">Hover a point to see the recorded date and progress.</p></div><span className="hidden rounded-full bg-[#F3E9E1] px-2.5 py-1 text-[10px] font-semibold text-[#9A5E3A] sm:inline-flex">0–100%</span></div>{logs.length > 0 ? <div className="overflow-x-auto"><svg className="h-auto min-w-[620px] w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cumulative project progress over time"><defs><linearGradient id="progress-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#B87A4F" stopOpacity="0.22" /><stop offset="100%" stopColor="#B87A4F" stopOpacity="0" /></linearGradient></defs>{[0, 25, 50, 75, 100].map((value) => { const y = pad.top + chartHeight - (value / 100) * chartHeight; return <g key={value}><line stroke="#EEE7E1" strokeDasharray="3 4" x1={pad.left} x2={width - pad.right} y1={y} y2={y} /><text fill="#A59A93" fontSize="11" x="8" y={y + 4}>{value}%</text></g> })}<polygon fill="url(#progress-fill)" points={area} /><polyline fill="none" points={line} stroke="#9A5E3A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />{points.map(({ log, x, y }, index) => <g key={log.id} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}><circle className="cursor-pointer" cx={x} cy={y} fill="white" r={activeIndex === index ? 7 : 5} stroke="#9A5E3A" strokeWidth="3" /><text fill="#8E827A" fontSize="11" textAnchor="middle" x={x} y={height - 13}>{formatShortDate(log.date)}</text>{activeIndex === index && <g><rect fill="#323232" height="48" rx="8" width="142" x={Math.min(Math.max(x - 71, 4), width - 146)} y={Math.max(y - 64, 4)} /><text fill="white" fontSize="11" textAnchor="middle" x={Math.min(Math.max(x, 75), width - 75)} y={Math.max(y - 42, 24)}>{formatDate(log.date)}</text><text fill="#E8B894" fontSize="13" fontWeight="bold" textAnchor="middle" x={Math.min(Math.max(x, 75), width - 75)} y={Math.max(y - 23, 43)}>{log.progress}% progress</text></g>}</g>)}</svg></div> : <EmptyState onClear={() => undefined} />}</section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ActivityTimeline so this module can perform its named task when needed.
function ActivityTimeline({ logs }: { logs: ProjectLog[] }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <section className="mt-5 rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="mb-6"><div className="flex items-center gap-2 text-[#9A5E3A]"><ClipboardList className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-[0.14em]">Project activity timeline</p></div><h2 className="mt-2 text-lg font-semibold">Daily site activity</h2><p className="mt-1 text-xs text-[#8E827A]">The same daily records shown in the chart and history table.</p></div>{logs.length ? <div className="space-y-5">{logs.slice().reverse().map((log) => <div className="relative flex gap-4" key={log.id}><div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E9E1] text-[#9A5E3A]"><CalendarDays className="h-4 w-4" /></div><div className="min-w-0 flex-1 border-b border-[#F1EBE6] pb-5 last:border-0"><div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center"><div><time className="text-xs font-semibold text-[#9A5E3A]">{formatDate(log.date)}</time><span className="ml-2 text-xs font-bold text-[#323232]">{log.progress}% progress</span></div><a className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#9A5E3A] hover:text-[#323232] sm:self-auto" href={`/projects/${log.projectId}/logs/${log.id}`}><Eye className="h-3.5 w-3.5" /> View report</a></div><p className="mt-2 text-sm leading-6 text-[#595552]">{log.summary}</p><div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#8E827A]"><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.workerCount} workers</span><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.machineryHours}h machinery</span><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.weather}</span></div></div></div>)}</div> : <EmptyState onClear={() => undefined} />}</section>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressRow so this module can perform its named task when needed.
function ProgressRow({ log }: { log: ProjectLog }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <tr className="hover:bg-[#FCFAF8]"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold">{formatDate(log.date)}</td><td className="px-5 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#F0E9E4]"><div className="h-full rounded-full bg-[#B87A4F]" style={{ width: `${log.progress}%` }} /></div><span className="text-xs font-bold">{log.progress}%</span></div></td><td className="px-5 py-4"><ProgressChange value={log.progressChange} /></td><td className="max-w-[280px] px-5 py-4"><p className="truncate text-sm text-[#595552]">{log.summary}</p></td><td className="px-5 py-4 text-sm text-[#595552]">{log.workerCount}</td><td className="px-5 py-4 text-sm text-[#595552]">{log.machineryHours}h</td><td className="px-5 py-4"><a className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A5E3A]" href={`/projects/${log.projectId}/logs/${log.id}`}><Eye className="h-3.5 w-3.5" /> View</a></td></tr>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressCard so this module can perform its named task when needed.
function ProgressCard({ log }: { log: ProjectLog }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <article className="rounded-xl bg-[#FBF9F7] p-4"><div className="flex justify-between gap-3"><div><p className="text-sm font-bold">{formatDate(log.date)}</p><p className="mt-1 text-xs text-[#595552]">{log.progress}% progress · {log.progressChange > 0 ? '+' : ''}{log.progressChange} pts</p></div><a className="text-[#9A5E3A]" href={`/projects/${log.projectId}/logs/${log.id}`} aria-label="View progress record"><Eye className="h-4 w-4" /></a></div><p className="mt-3 text-sm leading-5 text-[#595552]">{log.summary}</p><div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#8E827A]"><span>{log.workerCount} workers</span><span>·</span><span>{log.machineryHours}h machinery</span></div></article>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Metric so this module can perform its named task when needed.
function Metric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="rounded-2xl border border-[#E8E0DA] bg-white p-4 shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-xs text-[#8E827A]">{label}</span></div><p className="mt-3 text-xl font-bold">{value}</p><p className="mt-1 text-[11px] text-[#A59A93]">{detail}</p></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines DateInput so this module can perform its named task when needed.
function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <label className="text-[10px] font-bold uppercase tracking-wide text-[#8E827A]">{label}<input className="mt-1 block w-32 rounded-xl border border-[#E8E0DA] bg-white px-2.5 py-2 text-xs font-normal normal-case tracking-normal text-[#323232] outline-none focus:border-[#9A5E3A]" onChange={(event) => onChange(event.target.value)} type="date" value={value} /></label>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressChange so this module can perform its named task when needed.
function ProgressChange({ value }: { value: number }) {
  /* Checks this condition before continuing so the code can choose the correct path for the current state. */
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!value) return <span className="text-xs text-[#A59A93]">—</span>
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${value > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{value > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{value > 0 ? '+' : ''}{value} pts</span>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines EmptyState so this module can perform its named task when needed.
function EmptyState({ onClear }: { onClear: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <div className="p-8 text-center"><p className="text-sm font-semibold">No progress records match these dates.</p><button className="mt-3 text-xs font-semibold text-[#9A5E3A]" onClick={onClear} type="button">Clear date filters</button></div>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines TrendingIcon so this module can perform its named task when needed.
function TrendingIcon({ positive }: { positive: boolean }) {
  /* Returns the result so the caller or React receives the value or interface this function provides. */
  // Returns the result so the caller or React receives the value or interface this function provides.
  return positive ? <ArrowUpRight /> : <ArrowDownRight />
// Closes the current block or object so the grouped statements or settings end here.
}
