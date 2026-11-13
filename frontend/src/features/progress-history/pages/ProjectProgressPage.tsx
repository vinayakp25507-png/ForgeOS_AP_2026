<<<<<<< HEAD
import { ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays, ClipboardList, Eye, FilterX } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ProjectLog } from '../../daily-logs/types/projectLog'
import { AppShell } from '../../app-shell/components/AppShell'
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
import { getProjectLogs } from '../../daily-logs/data/projectLogStore'
=======
import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, BarChart3, CalendarDays, ClipboardList, FilterX, Users, Wrench } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
import { useProjects } from '../../projects/useProjects'
import { fetchAllDailyLogs } from '../../daily-logs/data/dailyLogApi'
import type { DailyLog } from '../../daily-logs/data/dailyLogApi'
import { ProjectOperationsReports } from '../components/ProjectOperationsReports'
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

interface ProjectProgressPageProps {
  projectId: string
}

<<<<<<< HEAD
const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const formatShortDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export function ProjectProgressPage({ projectId }: ProjectProgressPageProps) {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const allLogs = useMemo(() => getProjectLogs(projectId).sort((a, b) => a.date.localeCompare(b.date)), [projectId])
  const filteredLogs = useMemo(() => allLogs.filter((log) => (!fromDate || log.date >= fromDate) && (!toDate || log.date <= toDate)), [allLogs, fromDate, toDate])
  const newestLog = allLogs[allLogs.length - 1]
  const previousLog = allLogs[allLogs.length - 2]
  const totalIncrease = newestLog && allLogs[0] ? Number((newestLog.progress - allLogs[0].progress).toFixed(1)) : 0
  const hasFilters = Boolean(fromDate || toDate)

  const clearFilters = () => {
    setFromDate('')
    setToDate('')
  }

  return <AppShell currentPath={`/projects/${projectId}/progress`}><div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10"><Breadcrumbs current="Progress History" /><header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Green Valley Residency · {projectId}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Project Progress History</h1><p className="mt-2 text-sm text-[#8E827A]">Track cumulative progress and daily site activity over time.</p></div><div className="flex items-center gap-2"><DateInput label="From" value={fromDate} onChange={setFromDate} /><DateInput label="To" value={toDate} onChange={setToDate} />{hasFilters && <button className="mt-5 rounded-xl p-2 text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={clearFilters} type="button" aria-label="Clear date filters"><FilterX className="h-4 w-4" /></button>}</div></header>
      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Metric icon={<BarChart3 />} label="Current progress" value={`${newestLog?.progress ?? 0}%`} detail="Latest cumulative value" /><Metric icon={<ArrowUpRight />} label="Previous progress" value={`${previousLog?.progress ?? allLogs[0]?.progress ?? 0}%`} detail="Prior recorded value" /><Metric icon={<TrendingIcon positive={totalIncrease >= 0} />} label="Total increase" value={`${totalIncrease >= 0 ? '+' : ''}${totalIncrease} pts`} detail="Since first log" /><Metric icon={<ClipboardList />} label="Total daily logs" value={`${allLogs.length}`} detail="Recorded on project" /><Metric icon={<CalendarDays />} label="Last updated" value={newestLog ? formatDate(newestLog.date) : '—'} detail="Latest site record" /></section>
      <ProgressChart logs={filteredLogs} />
      <section className="mt-5 overflow-hidden rounded-2xl border border-[#E8E0DA] bg-white shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="border-b border-[#E8E0DA] px-5 py-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-semibold">Progress history</h2><p className="mt-1 text-xs text-[#8E827A]">Daily cumulative progress records</p></div><span className="text-xs text-[#8E827A]">{filteredLogs.length} records</span></div></div>{filteredLogs.length ? <div className="hidden overflow-x-auto lg:block"><table className="w-full text-left"><thead className="bg-[#FBF9F7] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E827A]"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Progress</th><th className="px-5 py-4">Change</th><th className="px-5 py-4">Work summary</th><th className="px-5 py-4">Workers</th><th className="px-5 py-4">Machine hours</th><th className="px-5 py-4">Action</th></tr></thead><tbody className="divide-y divide-[#F1EBE6]">{filteredLogs.slice().reverse().map((log) => <ProgressRow key={log.id} log={log} />)}</tbody></table></div> : <EmptyState onClear={clearFilters} />}{filteredLogs.length > 0 && <div className="space-y-3 p-4 lg:hidden">{filteredLogs.slice().reverse().map((log) => <ProgressCard key={log.id} log={log} />)}</div>}</section>
      <ActivityTimeline logs={filteredLogs} />
    </div></AppShell>
}

function ProgressChart({ logs }: { logs: ProjectLog[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const width = 900
  const height = 290
  const pad = { top: 24, right: 24, bottom: 42, left: 44 }
  const chartWidth = width - pad.left - pad.right
  const chartHeight = height - pad.top - pad.bottom
  const points = logs.map((log, index) => ({ log, x: pad.left + (logs.length === 1 ? chartWidth / 2 : (index / (logs.length - 1)) * chartWidth), y: pad.top + chartHeight - (log.progress / 100) * chartHeight }))
  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = points.length ? `${pad.left},${pad.top + chartHeight} ${line} ${pad.left + chartWidth},${pad.top + chartHeight}` : ''

  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="mb-5 flex items-start justify-between"><div><div className="flex items-center gap-2 text-[#9A5E3A]"><BarChart3 className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-[0.14em]">Progress chart</p></div><h2 className="mt-2 text-lg font-semibold">Cumulative project progress</h2><p className="mt-1 text-xs text-[#8E827A]">Hover a point to see the recorded date and progress.</p></div><span className="hidden rounded-full bg-[#F3E9E1] px-2.5 py-1 text-[10px] font-semibold text-[#9A5E3A] sm:inline-flex">0–100%</span></div>{logs.length > 0 ? <div className="overflow-x-auto"><svg className="h-auto min-w-[620px] w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cumulative project progress over time"><defs><linearGradient id="progress-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#B87A4F" stopOpacity="0.22" /><stop offset="100%" stopColor="#B87A4F" stopOpacity="0" /></linearGradient></defs>{[0, 25, 50, 75, 100].map((value) => { const y = pad.top + chartHeight - (value / 100) * chartHeight; return <g key={value}><line stroke="#EEE7E1" strokeDasharray="3 4" x1={pad.left} x2={width - pad.right} y1={y} y2={y} /><text fill="#A59A93" fontSize="11" x="8" y={y + 4}>{value}%</text></g> })}<polygon fill="url(#progress-fill)" points={area} /><polyline fill="none" points={line} stroke="#9A5E3A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />{points.map(({ log, x, y }, index) => <g key={log.id} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}><circle className="cursor-pointer" cx={x} cy={y} fill="white" r={activeIndex === index ? 7 : 5} stroke="#9A5E3A" strokeWidth="3" /><text fill="#8E827A" fontSize="11" textAnchor="middle" x={x} y={height - 13}>{formatShortDate(log.date)}</text>{activeIndex === index && <g><rect fill="#323232" height="48" rx="8" width="142" x={Math.min(Math.max(x - 71, 4), width - 146)} y={Math.max(y - 64, 4)} /><text fill="white" fontSize="11" textAnchor="middle" x={Math.min(Math.max(x, 75), width - 75)} y={Math.max(y - 42, 24)}>{formatDate(log.date)}</text><text fill="#E8B894" fontSize="13" fontWeight="bold" textAnchor="middle" x={Math.min(Math.max(x, 75), width - 75)} y={Math.max(y - 23, 43)}>{log.progress}% progress</text></g>}</g>)}</svg></div> : <EmptyState onClear={() => undefined} />}</section>
}

function ActivityTimeline({ logs }: { logs: ProjectLog[] }) {
  return <section className="mt-5 rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="mb-6"><div className="flex items-center gap-2 text-[#9A5E3A]"><ClipboardList className="h-4 w-4" /><p className="text-xs font-bold uppercase tracking-[0.14em]">Project activity timeline</p></div><h2 className="mt-2 text-lg font-semibold">Daily site activity</h2><p className="mt-1 text-xs text-[#8E827A]">The same daily records shown in the chart and history table.</p></div>{logs.length ? <div className="space-y-5">{logs.slice().reverse().map((log) => <div className="relative flex gap-4" key={log.id}><div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E9E1] text-[#9A5E3A]"><CalendarDays className="h-4 w-4" /></div><div className="min-w-0 flex-1 border-b border-[#F1EBE6] pb-5 last:border-0"><div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center"><div><time className="text-xs font-semibold text-[#9A5E3A]">{formatDate(log.date)}</time><span className="ml-2 text-xs font-bold text-[#323232]">{log.progress}% progress</span></div><a className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#9A5E3A] hover:text-[#323232] sm:self-auto" href={`/projects/${log.projectId}/logs/${log.id}`}><Eye className="h-3.5 w-3.5" /> View report</a></div><p className="mt-2 text-sm leading-6 text-[#595552]">{log.summary}</p><div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#8E827A]"><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.workerCount} workers</span><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.machineryHours}h machinery</span><span className="rounded-full bg-[#FBF9F7] px-2.5 py-1">{log.weather}</span></div></div></div>)}</div> : <EmptyState onClear={() => undefined} />}</section>
}

function ProgressRow({ log }: { log: ProjectLog }) {
  return <tr className="hover:bg-[#FCFAF8]"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold">{formatDate(log.date)}</td><td className="px-5 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#F0E9E4]"><div className="h-full rounded-full bg-[#B87A4F]" style={{ width: `${log.progress}%` }} /></div><span className="text-xs font-bold">{log.progress}%</span></div></td><td className="px-5 py-4"><ProgressChange value={log.progressChange} /></td><td className="max-w-[280px] px-5 py-4"><p className="truncate text-sm text-[#595552]">{log.summary}</p></td><td className="px-5 py-4 text-sm text-[#595552]">{log.workerCount}</td><td className="px-5 py-4 text-sm text-[#595552]">{log.machineryHours}h</td><td className="px-5 py-4"><a className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A5E3A]" href={`/projects/${log.projectId}/logs/${log.id}`}><Eye className="h-3.5 w-3.5" /> View</a></td></tr>
}

function ProgressCard({ log }: { log: ProjectLog }) {
  return <article className="rounded-xl bg-[#FBF9F7] p-4"><div className="flex justify-between gap-3"><div><p className="text-sm font-bold">{formatDate(log.date)}</p><p className="mt-1 text-xs text-[#595552]">{log.progress}% progress · {log.progressChange > 0 ? '+' : ''}{log.progressChange} pts</p></div><a className="text-[#9A5E3A]" href={`/projects/${log.projectId}/logs/${log.id}`} aria-label="View progress record"><Eye className="h-4 w-4" /></a></div><p className="mt-3 text-sm leading-5 text-[#595552]">{log.summary}</p><div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#8E827A]"><span>{log.workerCount} workers</span><span>·</span><span>{log.machineryHours}h machinery</span></div></article>
}

function Metric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-[#E8E0DA] bg-white p-4 shadow-[0_8px_24px_rgba(50,50,50,0.04)]"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-xs text-[#8E827A]">{label}</span></div><p className="mt-3 text-xl font-bold">{value}</p><p className="mt-1 text-[11px] text-[#A59A93]">{detail}</p></div>
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-[10px] font-bold uppercase tracking-wide text-[#8E827A]">{label}<input className="mt-1 block w-32 rounded-xl border border-[#E8E0DA] bg-white px-2.5 py-2 text-xs font-normal normal-case tracking-normal text-[#323232] outline-none focus:border-[#9A5E3A]" onChange={(event) => onChange(event.target.value)} type="date" value={value} /></label>
}

function ProgressChange({ value }: { value: number }) {
  if (!value) return <span className="text-xs text-[#A59A93]">—</span>
  return <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${value > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{value > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{value > 0 ? '+' : ''}{value} pts</span>
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return <div className="p-8 text-center"><p className="text-sm font-semibold">No progress records match these dates.</p><button className="mt-3 text-xs font-semibold text-[#9A5E3A]" onClick={onClear} type="button">Clear date filters</button></div>
}

function TrendingIcon({ positive }: { positive: boolean }) {
  return positive ? <ArrowUpRight /> : <ArrowDownRight />
=======
const noLogs: DailyLog[] = []

function dateLabel(value: string) {
  return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function ProjectProgressPage({ projectId }: ProjectProgressPageProps) {
  const { projects, isLoading: projectsLoading } = useProjects()
  const project = projects.find((entry) => String(entry.id) === projectId)
  const [loadResult, setLoadResult] = useState<{ key: string; logs: DailyLog[]; error: string | null } | null>(null)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const requestKey = `${projectId}:${fromDate}:${toDate}:${retryCount}`

  useEffect(() => {
    const controller = new AbortController()
    fetchAllDailyLogs(projectId, { from: fromDate || undefined, to: toDate || undefined }, controller.signal)
      .then((logs) => setLoadResult({ key: requestKey, logs, error: null }))
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setLoadResult({
            key: requestKey,
            logs: [],
            error: cause instanceof Error ? cause.message : 'Unable to load progress history.',
          })
        }
      })
    return () => controller.abort()
  }, [projectId, fromDate, toDate, retryCount, requestKey])

  const currentLoadResult = loadResult?.key === requestKey ? loadResult : null
  const logs = currentLoadResult?.logs ?? noLogs
  const error = currentLoadResult?.error ?? null
  const isLoading = !currentLoadResult
  const chronological = useMemo(() => logs.slice().sort((a, b) => a.logDate.localeCompare(b.logDate)), [logs])
  const latest = chronological.at(-1)
  const first = chronological[0]
  const previous = chronological.at(-2)
  const increase = latest && first ? Number((Number(latest.progressPercent) - Number(first.progressPercent)).toFixed(2)) : 0
  const chartPoints = useMemo(() => chronological.map((log, index) => ({
    log,
    x: chronological.length < 2 ? 450 : 40 + (index / (chronological.length - 1)) * 820,
    y: 240 - (Number(log.progressPercent) / 100) * 210,
  })), [chronological])
  const line = chartPoints.map((point) => `${point.x},${point.y}`).join(' ')
  const clearFilters = () => { setFromDate(''); setToDate('') }

  return <AppShell currentPath={`/projects/${projectId}/progress`}>
    <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">
      <Breadcrumbs current="Progress History" />
      <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">{project?.name ?? `Project ${projectId}`} · {project?.code ?? projectId}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Project Progress History</h1><p className="mt-2 text-sm text-[#8E827A]">Cumulative progress recorded in daily site logs.</p></div>
        <div className="flex items-center gap-2"><DateInput label="From" value={fromDate} onChange={setFromDate} /><DateInput label="To" value={toDate} onChange={setToDate} />{(fromDate || toDate) && <button className="mt-5 rounded-xl p-2 text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={clearFilters} type="button" aria-label="Clear date filters"><FilterX className="h-4 w-4" /></button>}</div>
      </header>

      {error && <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"><span className="flex items-center gap-2"><AlertCircle size={16} />{error}</span><button type="button" onClick={() => setRetryCount((count) => count + 1)} className="font-semibold underline">Retry</button></div>}

      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Metric icon={<BarChart3 />} label="Current progress" value={latest ? `${Number(latest.progressPercent)}%` : '—'} detail="Latest cumulative value" />
        <Metric icon={<ArrowUpRight />} label="Previous progress" value={previous ? `${Number(previous.progressPercent)}%` : first ? `${Number(first.progressPercent)}%` : '—'} detail="Prior recorded value" />
        <Metric icon={<ArrowUpRight />} label="Total increase" value={`${increase >= 0 ? '+' : ''}${increase} pts`} detail="Since first log" />
        <Metric icon={<ClipboardList />} label="Daily logs" value={isLoading || projectsLoading ? '—' : `${logs.length}`} detail="Recorded on project" />
        <Metric icon={<CalendarDays />} label="Last updated" value={latest ? dateLabel(latest.logDate) : '—'} detail="Latest site record" />
      </section>

      <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6">
        <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A5E3A]">Progress chart</p><h2 className="mt-2 text-lg font-semibold">Cumulative project progress</h2></div>
        {isLoading ? <p aria-live="polite" className="py-12 text-center text-sm text-[#8E827A]">Loading progress history…</p> : chronological.length ? <div className="overflow-x-auto"><svg className="h-auto min-w-[620px] w-full" viewBox="0 0 900 280" role="img" aria-label="Cumulative project progress over time">
          {[0, 25, 50, 75, 100].map((value) => { const y = 240 - value * 2.1; return <g key={value}><line stroke="#EEE7E1" strokeDasharray="3 4" x1="40" x2="870" y1={y} y2={y} /><text fill="#A59A93" fontSize="11" x="5" y={y + 4}>{value}%</text></g> })}
          {chartPoints.length > 1 && <polyline fill="none" points={line} stroke="#9A5E3A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />}
          {chartPoints.map(({ log, x, y }) => <g key={log.id}><circle cx={x} cy={y} fill="white" r="5" stroke="#9A5E3A" strokeWidth="3"><title>{dateLabel(log.logDate)}: {Number(log.progressPercent)}%</title></circle></g>)}
        </svg></div> : <p className="py-12 text-center text-sm text-[#8E827A]">No progress history is available for this date range.</p>}
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl border border-[#E8E0DA] bg-white shadow-[0_8px_24px_rgba(50,50,50,0.04)]">
        <div className="border-b border-[#E8E0DA] px-5 py-5"><h2 className="font-semibold">Progress history</h2><p className="mt-1 text-xs text-[#8E827A]">Daily cumulative progress and resource records</p></div>
        {isLoading ? <p className="p-8 text-center text-sm text-[#8E827A]">Loading records…</p> : logs.length ? <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="bg-[#FBF9F7] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E827A]"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Progress</th><th className="px-5 py-4">Work summary</th><th className="px-5 py-4">Workers</th><th className="px-5 py-4">Machine hours</th><th className="px-5 py-4">View</th></tr></thead><tbody className="divide-y divide-[#F1EBE6]">{chronological.slice().reverse().map((log, index, list) => {
          const nextOlder = list[index + 1]
          const change = nextOlder ? Number((Number(log.progressPercent) - Number(nextOlder.progressPercent)).toFixed(2)) : 0
          const workers = log.labourHeadCountTotal ?? log.labourEntries.reduce((sum, entry) => sum + entry.headCount, 0)
          return <tr key={log.id} className="hover:bg-[#FCFAF8]"><td className="whitespace-nowrap px-5 py-4 text-sm">{dateLabel(log.logDate)}</td><td className="px-5 py-4 text-sm font-semibold">{Number(log.progressPercent)}%</td><td className="max-w-lg px-5 py-4 text-sm text-[#595552]">{log.workSummary}<span className="mt-1 block text-xs text-[#8E827A]">{change > 0 ? '+' : ''}{change} pts</span></td><td className="px-5 py-4 text-sm"><span className="inline-flex items-center gap-1"><Users size={14} />{workers}</span></td><td className="px-5 py-4 text-sm"><span className="inline-flex items-center gap-1"><Wrench size={14} />{Number(log.machineryHoursTotal ?? 0)}h</span></td><td className="px-5 py-4"><a className="text-xs font-semibold text-[#9A5E3A]" href={`/projects/${projectId}/logs/${log.id}`}>Open log</a></td></tr>
        })}</tbody></table></div> : <p className="p-8 text-center text-sm text-[#8E827A]">No daily logs are available for this date range.</p>}
      </section>

      <ProjectOperationsReports projectId={projectId} fromDate={fromDate} toDate={toDate} />
    </div>
  </AppShell>
}

function Metric({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-[#E8E0DA] bg-white p-4"><div className="flex items-center gap-2 text-[#9A5E3A]"><span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-xs text-[#8E827A]">{label}</span></div><p className="mt-3 text-2xl font-bold">{value}</p><p className="mt-1 text-[11px] text-[#A59A93]">{detail}</p></div>
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-xs text-[#8E827A]">{label}<input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 block rounded-lg border border-[#E8E0DA] bg-white px-2 py-2 text-sm text-[#323232]" /></label>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}
