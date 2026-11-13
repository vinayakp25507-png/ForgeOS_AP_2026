<<<<<<< HEAD
import { AlertCircle, ArrowLeft, CalendarDays, Check, ChevronDown, ClipboardList, CloudSun, Plus, Save, Trash2, Users, Wrench } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell } from '../../app-shell/components/AppShell'
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
import { getProjectLogs, saveProjectLog } from '../data/projectLogStore'
import type { LabourRow, MachineryRow, ProjectLog, ProjectLogFormValues } from '../types/projectLog'
=======
import { useEffect, useState } from 'react'
import { AlertCircle, ArrowLeft, CalendarDays, Plus, Save, Trash2 } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { ApiError } from '../../../lib/api'
import { useProjects } from '../../projects/useProjects'
import {
  createDailyLog,
  fetchAllDailyLogs,
  fetchDailyLog,
  updateDailyLog,
  type DailyLog,
  type DailyLogInput,
} from '../data/dailyLogApi'
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

interface ProjectLogFormPageProps {
  projectId: string
  logId?: string
}

<<<<<<< HEAD
const trades = ['Mason', 'Helper', 'Carpenter', 'Bar Bender', 'Electrician', 'Plumber', 'Painter', 'Tiler', 'Other']
const weatherOptions = ['Clear', 'Cloudy', 'Rainy', 'Hot', 'Other']
const today = new Date().toISOString().slice(0, 10)

const emptyLabour = (): LabourRow => ({ id: `labour-${Date.now()}-${Math.random()}`, trade: 'Mason', customTrade: '', contractor: '', workers: 0, hours: 0, remarks: '' })
const emptyMachinery = (): MachineryRow => ({ id: `machine-${Date.now()}-${Math.random()}`, machine: '', operator: '', hours: 0, fuel: 0, remarks: '' })

export function ProjectLogFormPage({ projectId, logId }: ProjectLogFormPageProps) {
  const projectLogs = useMemo(() => getProjectLogs(projectId), [projectId])
  const existing = logId ? projectLogs.find((log) => log.id === logId) : undefined
  const previousProgress = projectLogs.filter((log) => log.id !== logId && log.date < (existing?.date ?? today)).sort((a, b) => b.date.localeCompare(a.date))[0]?.progress ?? 0
  const [values, setValues] = useState<ProjectLogFormValues>(() => existing ? toFormValues(existing) : {
    date: today,
    progress: previousProgress,
    summary: '',
    weather: 'Clear',
    issues: '',
    workerCount: 0,
    machineryHours: 0,
    status: 'Draft',
    labour: [emptyLabour()],
    machinery: [emptyMachinery()],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dirty, setDirty] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [saved, setSaved] = useState(false)

  const totalWorkers = values.labour.reduce((total, row) => total + Math.max(0, row.workers || 0), 0)
  const totalLabourHours = values.labour.reduce((total, row) => total + Math.max(0, row.workers || 0) * Math.max(0, row.hours || 0), 0)
  const totalMachineryHours = values.machinery.reduce((total, row) => total + Math.max(0, row.hours || 0), 0)
  const totalFuel = values.machinery.reduce((total, row) => total + Math.max(0, row.fuel || 0), 0)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirty && !saved) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirty, saved])

  const updateValues = (next: Partial<ProjectLogFormValues>) => {
    setValues((current) => ({ ...current, ...next }))
    setDirty(true)
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}
    if (!values.date) nextErrors.date = 'Log date is required.'
    else if (values.date > today) nextErrors.date = 'Date cannot be in the future.'
    else if (projectLogs.some((log) => log.id !== logId && log.date === values.date)) nextErrors.date = 'A daily log already exists for this project date.'
    if (values.progress < 0 || values.progress > 100 || !Number.isFinite(values.progress)) nextErrors.progress = 'Progress must be between 0 and 100.'
    else if (values.progress < previousProgress) nextErrors.progress = `Progress cannot be lower than the previous log (${previousProgress}%).`
    if (!values.summary.trim()) nextErrors.summary = 'Work summary is required.'
    if (totalWorkers <= 0) nextErrors.labour = 'Add at least one worker across the labour rows.'
    values.labour.forEach((row, index) => {
      if (row.workers < 0) nextErrors[`labour.${index}.workers`] = 'Workers must be zero or more.'
      if (row.hours < 0 || row.hours > 24) nextErrors[`labour.${index}.hours`] = 'Hours must be between 0 and 24.'
      if (row.trade === 'Other' && !row.customTrade.trim()) nextErrors[`labour.${index}.trade`] = 'Enter a custom trade.'
      if (row.workers > 0 && !row.contractor.trim()) nextErrors[`labour.${index}.contractor`] = 'Contractor name is required.'
    })
    values.machinery.forEach((row, index) => {
      if (row.hours < 0 || row.hours > 24) nextErrors[`machinery.${index}.hours`] = 'Hours must be between 0 and 24.'
      if (row.fuel < 0) nextErrors[`machinery.${index}.fuel`] = 'Fuel cannot be negative.'
      if (!row.machine.trim()) nextErrors[`machinery.${index}.machine`] = 'Machine name is required.'
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const previous = projectLogs.filter((log) => log.id !== logId && log.date < values.date).sort((a, b) => b.date.localeCompare(a.date))[0]
    const log: ProjectLog = {
      id: existing?.id ?? `${projectId.toLowerCase()}-log-${Date.now()}`,
      projectId,
      date: values.date,
      summary: values.summary.trim(),
      progress: values.progress,
      progressChange: Number((values.progress - (previous?.progress ?? 0)).toFixed(1)),
      workerCount: totalWorkers,
      machineryHours: totalMachineryHours,
      weather: values.weather,
      issues: values.issues.trim(),
      status: values.status,
      labour: values.labour,
      machinery: values.machinery,
    }
    saveProjectLog(log)
    setSaved(true)
    setDirty(false)
    setShowToast(true)
    window.setTimeout(() => {
      window.history.pushState({}, '', `/projects/${projectId}/logs`)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }, 900)
  }

  const handleCancel = () => {
    if (dirty && !saved && !window.confirm('You have unsaved changes. Leave without saving?')) return
    window.history.pushState({}, '', `/projects/${projectId}/logs`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return <AppShell currentPath={`/projects/${projectId}/logs`}><div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 lg:px-10"><Breadcrumbs current={logId ? 'Edit Daily Log' : 'Create Daily Log'} /><div className="mb-8 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Green Valley Residency · {projectId}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{logId ? 'Edit Daily Log' : 'Create Daily Log'}</h1><p className="mt-2 text-sm text-[#8E827A]">Record the day’s work, workforce, equipment, and site conditions.</p></div><button className="hidden items-center gap-2 rounded-xl border border-[#E8E0DA] bg-white px-3 py-2.5 text-xs font-semibold text-[#595552] hover:bg-[#FBF9F7] sm:flex" onClick={handleCancel} type="button"><ArrowLeft className="h-3.5 w-3.5" /> Back to logs</button></div>
      {Object.keys(errors).length > 0 && <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><div><p className="font-semibold">Please review the highlighted fields.</p><p className="mt-1 text-xs">Complete the required information before saving this daily log.</p></div></div>}
      <div className="space-y-5"><DailyInformation errors={errors} previousProgress={previousProgress} values={values} onChange={updateValues} /><LabourSection errors={errors} rows={values.labour} onChange={(labour) => updateValues({ labour })} totalHours={totalLabourHours} totalWorkers={totalWorkers} /><MachinerySection errors={errors} rows={values.machinery} onChange={(machinery) => updateValues({ machinery })} totalFuel={totalFuel} totalHours={totalMachineryHours} /><ReviewSection values={values} totalFuel={totalFuel} totalHours={totalMachineryHours} totalLabourHours={totalLabourHours} totalWorkers={totalWorkers} /></div>
      <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row"><button className="rounded-xl border border-[#E8E0DA] bg-white px-5 py-3 text-sm font-semibold text-[#595552] hover:bg-[#FBF9F7]" onClick={handleCancel} type="button">Cancel</button><button className="flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9A5E3A]" onClick={handleSubmit} type="button"><Save className="h-4 w-4" /> Save Daily Log</button></div>
      {showToast && <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#323232] px-4 py-3 text-sm font-semibold text-white shadow-xl"><Check className="h-4 w-4 text-emerald-300" /> Daily log saved successfully</div>}
    </div></AppShell>
}

function DailyInformation({ values, previousProgress, errors, onChange }: { values: ProjectLogFormValues; previousProgress: number; errors: Record<string, string>; onChange: (next: Partial<ProjectLogFormValues>) => void }) {
  return <FormSection icon={<ClipboardList />} title="Daily information" description="Capture the key site conditions and work completed today."><div className="grid gap-5 md:grid-cols-2"><Field label="Log date" required error={errors.date}><div className="relative"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-[#9A5E3A]" /><input className={inputClass(Boolean(errors.date), 'pl-9')} max={today} onChange={(event) => onChange({ date: event.target.value })} type="date" value={values.date} /></div></Field><Field label="Weather"><div className="relative"><CloudSun className="absolute left-3 top-3 h-4 w-4 text-[#9A5E3A]" /><select className={inputClass(false, 'pl-9')} onChange={(event) => onChange({ weather: event.target.value })} value={values.weather}>{weatherOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#8E827A]" /></div></Field><Field className="md:col-span-2" label="Cumulative project progress" required error={errors.progress}><div className="flex items-center gap-3"><input className="h-2 flex-1 cursor-pointer accent-[#9A5E3A]" max="100" min="0" onChange={(event) => onChange({ progress: Number(event.target.value) })} type="range" value={values.progress} /><div className="relative w-24"><input className={inputClass(Boolean(errors.progress), 'pr-8')} max="100" min="0" onChange={(event) => onChange({ progress: Number(event.target.value) })} type="number" value={values.progress} /><span className="absolute right-3 top-3 text-xs text-[#8E827A]">%</span></div></div><div className="mt-2 flex justify-between text-[11px] text-[#8E827A]"><span>Previous progress: {previousProgress}%</span><span>0–100%</span></div></Field><Field className="md:col-span-2" label="Work summary" required error={errors.summary}><textarea className={`${inputClass(Boolean(errors.summary), '')} min-h-28 resize-y`} onChange={(event) => onChange({ summary: event.target.value })} placeholder="Summarise completed work, inspections, deliveries, and next steps..." value={values.summary} /></Field><Field className="md:col-span-2" label="Issues or delays"><textarea className={`${inputClass(false, '')} min-h-24 resize-y`} onChange={(event) => onChange({ issues: event.target.value })} placeholder="Record blockers, incidents, weather delays, or safety observations..." value={values.issues} /></Field></div></FormSection>
}

function LabourSection({ rows, errors, onChange, totalWorkers, totalHours }: { rows: LabourRow[]; errors: Record<string, string>; onChange: (rows: LabourRow[]) => void; totalWorkers: number; totalHours: number }) {
  const update = (index: number, patch: Partial<LabourRow>) => onChange(rows.map((row, rowIndex) => rowIndex === index ? { ...row, ...patch } : row))
  return <FormSection icon={<Users />} title="Labour attendance" description="Add every trade and contractor working on site today."><div className="space-y-3">{rows.map((row, index) => <div className="rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] p-4" key={row.id}><div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A5E3A]">Worker group {index + 1}</p><button className="rounded-lg p-2 text-[#A59A93] hover:bg-rose-50 hover:text-rose-600" onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))} type="button" aria-label="Remove labour row"><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><RowSelect label="Trade" options={trades} value={row.trade} onChange={(trade) => update(index, { trade })} error={errors[`labour.${index}.trade`]} />{row.trade === 'Other' && <RowInput label="Custom trade" value={row.customTrade} onChange={(customTrade) => update(index, { customTrade })} error={errors[`labour.${index}.trade`]} />}<RowInput label="Contractor name" value={row.contractor} onChange={(contractor) => update(index, { contractor })} error={errors[`labour.${index}.contractor`]} /><RowInput label="Workers" type="number" value={row.workers} onChange={(workerValue) => update(index, { workers: Number(workerValue) })} error={errors[`labour.${index}.workers`]} /><RowInput label="Working hours" type="number" value={row.hours} onChange={(hours) => update(index, { hours: Number(hours) })} error={errors[`labour.${index}.hours`]} /><RowInput className="sm:col-span-2 lg:col-span-5" label="Remarks" value={row.remarks} onChange={(remarks) => update(index, { remarks })} /></div></div>)}</div>{errors.labour && <p className="mt-2 text-[11px] font-medium text-rose-600">{errors.labour}</p>}<button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#C8BCB4] px-3 py-2.5 text-xs font-semibold text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={() => onChange([...rows, emptyLabour()])} type="button"><Plus className="h-4 w-4" /> Add labour row</button><Totals items={[['Total workers', `${totalWorkers}`], ['Total labour hours', `${totalHours} hrs`]]} /></FormSection>
}

function MachinerySection({ rows, errors, onChange, totalHours, totalFuel }: { rows: MachineryRow[]; errors: Record<string, string>; onChange: (rows: MachineryRow[]) => void; totalHours: number; totalFuel: number }) {
  const update = (index: number, patch: Partial<MachineryRow>) => onChange(rows.map((row, rowIndex) => rowIndex === index ? { ...row, ...patch } : row))
  return <FormSection icon={<Wrench />} title="Machinery usage" description="Track equipment hours and fuel used during the workday."><div className="space-y-3">{rows.map((row, index) => <div className="rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] p-4" key={row.id}><div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A5E3A]">Machine {index + 1}</p><button className="rounded-lg p-2 text-[#A59A93] hover:bg-rose-50 hover:text-rose-600" onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))} type="button" aria-label="Remove machinery row"><Trash2 className="h-4 w-4" /></button></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"><RowInput className="lg:col-span-2" label="Machine name" value={row.machine} onChange={(machine) => update(index, { machine })} error={errors[`machinery.${index}.machine`]} /><RowInput label="Operator name" value={row.operator} onChange={(operator) => update(index, { operator })} /><RowInput label="Hours used" type="number" value={row.hours} onChange={(hours) => update(index, { hours: Number(hours) })} error={errors[`machinery.${index}.hours`]} /><RowInput label="Fuel (litres)" type="number" value={row.fuel} onChange={(fuel) => update(index, { fuel: Number(fuel) })} error={errors[`machinery.${index}.fuel`]} /><RowInput className="sm:col-span-2 lg:col-span-5" label="Remarks" value={row.remarks} onChange={(remarks) => update(index, { remarks })} /></div></div>)}</div><button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#C8BCB4] px-3 py-2.5 text-xs font-semibold text-[#9A5E3A] hover:bg-[#F3E9E1]" onClick={() => onChange([...rows, emptyMachinery()])} type="button"><Plus className="h-4 w-4" /> Add machinery row</button><Totals items={[['Total machinery hours', `${totalHours} hrs`], ['Total fuel consumption', `${totalFuel} L`]]} /></FormSection>
}

function ReviewSection({ values, totalWorkers, totalLabourHours, totalHours, totalFuel }: { values: ProjectLogFormValues; totalWorkers: number; totalLabourHours: number; totalHours: number; totalFuel: number }) {
  return <FormSection icon={<Check />} title="Review" description="Confirm the daily record before saving."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><ReviewItem label="Date" value={values.date || 'Not set'} /><ReviewItem label="Project progress" value={`${values.progress}%`} /><ReviewItem label="Total workers" value={`${totalWorkers}`} /><ReviewItem label="Labour hours" value={`${totalLabourHours} hrs`} /><ReviewItem label="Machinery hours" value={`${totalHours} hrs`} /><ReviewItem label="Fuel consumed" value={`${totalFuel} L`} /></div><div className="mt-4 rounded-xl bg-[#FBF9F7] p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8E827A]">Work summary</p><p className="mt-2 text-sm leading-6 text-[#595552]">{values.summary || 'No summary added yet.'}</p></div></FormSection>
}

function FormSection({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
  return <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)] sm:p-6"><div className="mb-5 flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3E9E1] text-[#9A5E3A]">{icon}</span><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-xs text-[#8E827A]">{description}</p></div></div>{children}</section>
}

function Field({ label, required, error, className = '', children }: { label: string; required?: boolean; error?: string; className?: string; children: ReactNode }) {
  return <label className={`block text-xs font-semibold text-[#595552] ${className}`}>{label}{required && <span className="ml-1 text-[#B15D4B]">*</span>}{children}{error && <span className="mt-1 block text-[11px] font-medium text-rose-600">{error}</span>}</label>
}

function RowInput({ label, value, onChange, type = 'text', error, className = '' }: { label: string; value: string | number; onChange: (value: string) => void; type?: string; error?: string; className?: string }) {
  return <label className={`block text-xs font-semibold text-[#595552] ${className}`}>{label}<input className={inputClass(Boolean(error), '')} min={type === 'number' ? '0' : undefined} onChange={(event) => onChange(event.target.value)} type={type} value={value} />{error && <span className="mt-1 block text-[11px] font-medium text-rose-600">{error}</span>}</label>
}

function RowSelect({ label, options, value, onChange, error }: { label: string; options: string[]; value: string; onChange: (value: string) => void; error?: string }) {
  return <label className="relative block text-xs font-semibold text-[#595552]">{label}<select className={inputClass(Boolean(error), 'pr-8')} onChange={(event) => onChange(event.target.value)} value={value}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-8 h-4 w-4 text-[#8E827A]" />{error && <span className="mt-1 block text-[11px] font-medium text-rose-600">{error}</span>}</label>
}

function Totals({ items }: { items: string[][] }) {
  return <div className="mt-5 grid gap-3 sm:grid-cols-2">{items.map(([label, value]) => <div className="rounded-xl bg-[#F3E9E1] px-4 py-3" key={label}><p className="text-[11px] text-[#8E827A]">{label}</p><p className="mt-1 text-lg font-bold text-[#9A5E3A]">{value}</p></div>)}</div>
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-[#FBF9F7] p-3"><p className="text-[11px] text-[#8E827A]">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>
}

function inputClass(hasError: boolean, extra: string) {
  return `mt-2 w-full rounded-xl border bg-[#FBF9F7] px-3 py-2.5 text-sm font-normal text-[#323232] outline-none focus:border-[#9A5E3A] ${hasError ? 'border-rose-300' : 'border-[#E8E0DA]'} ${extra}`
}

function toFormValues(log: ProjectLog): ProjectLogFormValues {
  return { date: log.date, progress: log.progress, summary: log.summary, weather: weatherOptions.includes(log.weather) ? log.weather : 'Other', issues: log.issues ?? '', status: 'Draft', workerCount: log.workerCount, machineryHours: log.machineryHours, labour: log.labour?.length ? log.labour : [emptyLabour()], machinery: log.machinery?.length ? log.machinery : [emptyMachinery()] }
=======
interface LabourDraft {
  key: string
  trade: string
  contractorName: string
  headCount: string
  hoursWorked: string
  remarks: string
}

interface MachineryDraft {
  key: string
  machineName: string
  operatorName: string
  hoursUsed: string
  fuelLitres: string
  remarks: string
}

interface FormValues {
  logDate: string
  progressPercent: string
  workSummary: string
  weather: string
  issues: string
  labourEntries: LabourDraft[]
  machineryEntries: MachineryDraft[]
}

const today = new Date()
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

function emptyValues(progress = 0): FormValues {
  return {
    logDate: localToday,
    progressPercent: String(progress),
    workSummary: '',
    weather: '',
    issues: '',
    labourEntries: [],
    machineryEntries: [],
  }
}

function blankLabour(): LabourDraft {
  return { key: crypto.randomUUID(), trade: '', contractorName: '', headCount: '', hoursWorked: '8', remarks: '' }
}

function blankMachinery(): MachineryDraft {
  return { key: crypto.randomUUID(), machineName: '', operatorName: '', hoursUsed: '', fuelLitres: '', remarks: '' }
}

function toValues(log: DailyLog): FormValues {
  return {
    logDate: log.logDate.slice(0, 10),
    progressPercent: String(Number(log.progressPercent)),
    workSummary: log.workSummary,
    weather: log.weather ?? '',
    issues: log.issues ?? '',
    labourEntries: log.labourEntries.map((entry) => ({
      key: String(entry.id),
      trade: entry.trade,
      contractorName: entry.contractorName ?? '',
      headCount: String(entry.headCount),
      hoursWorked: String(Number(entry.hoursWorked)),
      remarks: entry.remarks ?? '',
    })),
    machineryEntries: log.machineryEntries.map((entry) => ({
      key: String(entry.id),
      machineName: entry.machineName,
      operatorName: entry.operatorName ?? '',
      hoursUsed: String(Number(entry.hoursUsed)),
      fuelLitres: entry.fuelLitres == null ? '' : String(Number(entry.fuelLitres)),
      remarks: entry.remarks ?? '',
    })),
  }
}

function formatApiError(error: unknown) {
  if (!(error instanceof ApiError)) return error instanceof Error ? error.message : 'Unable to save the daily log.'
  if (error.status === 409) return `${error.message} Check the project and log date.`
  if (error.status === 422) return error.message
  if (error.status === 403) return `${error.message} Your account may not be assigned to this project or permitted to edit this log.`
  return error.message
}

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function ProjectLogFormPage({ projectId, logId }: ProjectLogFormPageProps) {
  const { projects } = useProjects()
  const project = projects.find((entry) => String(entry.id) === projectId)
  const [values, setValues] = useState<FormValues>(() => emptyValues())
  const [loadResult, setLoadResult] = useState<{ key: string; error: string | null } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const requestKey = `${projectId}:${logId ?? 'new'}:${retryCount}`

  useEffect(() => {
    const controller = new AbortController()
    const setLoadError = (cause: unknown) => setLoadResult({
      key: requestKey,
      error: formatApiError(cause),
    })
    if (logId) {
      fetchDailyLog(logId, controller.signal)
        .then((log) => {
          if (String(log.projectId) !== projectId) throw new Error('This log does not belong to the selected project.')
          setValues(toValues(log))
          setLoadResult({ key: requestKey, error: null })
        })
        .catch((cause: unknown) => {
          if (!controller.signal.aborted) setLoadError(cause)
        })
    } else {
      fetchAllDailyLogs(projectId, {}, controller.signal)
        .then((logs) => {
          if (controller.signal.aborted) return
          const previous = logs
            .filter((log) => log.logDate.slice(0, 10) < localToday)
            .sort((a, b) => b.logDate.localeCompare(a.logDate))[0]
          setValues(emptyValues(previous ? Number(previous.progressPercent) : 0))
          setLoadResult({ key: requestKey, error: null })
        })
        .catch((cause: unknown) => {
          if (!controller.signal.aborted) setLoadError(cause)
        })
    }
    return () => controller.abort()
  }, [projectId, logId, requestKey])

  const currentLoadResult = loadResult?.key === requestKey ? loadResult : null
  const isLoading = !currentLoadResult
  const displayError = error ?? currentLoadResult?.error ?? null

  const update = (patch: Partial<FormValues>) => setValues((current) => ({ ...current, ...patch }))
  const editRow = <T extends { key: string }>(rows: T[], key: string, patch: Partial<T>) =>
    rows.map((row) => row.key === key ? { ...row, ...patch } : row)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (values.logDate > localToday) {
      setError('Log date cannot be in the future.')
      return
    }
    const progress = Number(values.progressPercent)
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
      setError('Progress must be a number from 0 to 100.')
      return
    }
    if (!values.workSummary.trim()) {
      setError('Work summary is required.')
      return
    }

    const labourEntries: DailyLogInput['labourEntries'] = []
    for (const [index, row] of values.labourEntries.entries()) {
      if (!row.trade.trim() && !row.contractorName.trim() && !row.headCount.trim() && !row.remarks.trim()) continue
      const headCount = Number(row.headCount)
      const hoursWorked = Number(row.hoursWorked)
      if (!row.trade.trim() || !Number.isInteger(headCount) || headCount <= 0 || !Number.isFinite(hoursWorked) || hoursWorked < 0 || hoursWorked > 24) {
        setError(`Labour group ${index + 1} needs a trade, positive whole-number headcount, and hours from 0 to 24.`)
        return
      }
      labourEntries.push({
        trade: row.trade.trim(),
        ...(row.contractorName.trim() ? { contractorName: row.contractorName.trim() } : {}),
        headCount,
        hoursWorked,
        ...(row.remarks.trim() ? { remarks: row.remarks.trim() } : {}),
      })
    }

    const machineryEntries: DailyLogInput['machineryEntries'] = []
    for (const [index, row] of values.machineryEntries.entries()) {
      if (!row.machineName.trim() && !row.operatorName.trim() && !row.hoursUsed.trim() && !row.fuelLitres.trim() && !row.remarks.trim()) continue
      const hoursUsed = Number(row.hoursUsed)
      const fuelLitres = row.fuelLitres === '' ? undefined : Number(row.fuelLitres)
      if (!row.machineName.trim() || !Number.isFinite(hoursUsed) || hoursUsed < 0 || hoursUsed > 24 || (fuelLitres !== undefined && (!Number.isFinite(fuelLitres) || fuelLitres < 0))) {
        setError(`Machinery entry ${index + 1} needs a machine name, hours from 0 to 24, and non-negative fuel quantity.`)
        return
      }
      machineryEntries.push({
        machineName: row.machineName.trim(),
        ...(row.operatorName.trim() ? { operatorName: row.operatorName.trim() } : {}),
        hoursUsed,
        ...(fuelLitres !== undefined ? { fuelLitres } : {}),
        ...(row.remarks.trim() ? { remarks: row.remarks.trim() } : {}),
      })
    }

    const payload: DailyLogInput = {
      logDate: values.logDate,
      progressPercent: progress,
      workSummary: values.workSummary.trim(),
      ...(values.weather.trim() ? { weather: values.weather.trim() } : {}),
      ...(values.issues.trim() ? { issues: values.issues.trim() } : {}),
      labourEntries,
      machineryEntries,
    }

    setIsSaving(true)
    try {
      const saved = logId
        ? await updateDailyLog(logId, payload)
        : await createDailyLog(projectId, payload)
      setSuccess(logId ? 'Daily log updated successfully.' : 'Daily log created successfully.')
      navigate(`/projects/${projectId}/logs/${saved.id}?saved=${logId ? 'updated' : 'created'}`)
    } catch (cause) {
      setError(formatApiError(cause))
    } finally {
      setIsSaving(false)
    }
  }

  return <AppShell currentPath={`/projects/${projectId}/logs`}>
    <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 lg:px-10">
      <button type="button" onClick={() => navigate(`/projects/${projectId}/logs`)} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#8E827A] hover:text-[#323232]"><ArrowLeft size={16} /> Back to logs</button>
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">{project?.name ?? `Project ${projectId}`} · {project?.code ?? projectId}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{logId ? 'Edit Daily Log' : 'Create Daily Log'}</h1>
        <p className="mt-2 text-sm text-[#8E827A]">Record work, progress, labour groups, and machinery used on site.</p>
      </div>

      {displayError && <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><p>{displayError}</p></div>}
      {success && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{success}</p>}

      {isLoading ? <div aria-live="polite" className="rounded-2xl border border-[#E8E0DA] bg-white p-8 text-sm text-[#8E827A]">Loading daily log…</div> : currentLoadResult?.error && (
        <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="rounded-xl bg-[#323232] px-4 py-2.5 text-sm font-semibold text-white">Retry</button>
      )}
      {!isLoading && !(currentLoadResult?.error && logId) && <form onSubmit={submit} className="space-y-5">
        <section className="rounded-2xl border border-[#E8E0DA] bg-white p-6">
          <h2 className="mb-5 font-semibold">Daily information</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-[#595552]">Log date
              <span className="relative mt-2 block"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-[#9A5E3A]" /><input required type="date" max={localToday} value={values.logDate} onChange={(event) => update({ logDate: event.target.value })} className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#9A5E3A]" /></span>
            </label>
            <label className="text-sm font-medium text-[#595552]">Cumulative project progress (%)
              <input required type="number" min="0" max="100" step="0.01" value={values.progressPercent} onChange={(event) => update({ progressPercent: event.target.value })} className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-3 text-sm outline-none focus:border-[#9A5E3A]" />
            </label>
            <label className="text-sm font-medium text-[#595552] md:col-span-2">Work summary
              <textarea required maxLength={5000} value={values.workSummary} onChange={(event) => update({ workSummary: event.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] p-3 text-sm outline-none focus:border-[#9A5E3A]" placeholder="Summarise work completed, inspections, deliveries, and next steps..." />
            </label>
            <label className="text-sm font-medium text-[#595552]">Weather
              <input maxLength={150} value={values.weather} onChange={(event) => update({ weather: event.target.value })} className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-3 text-sm outline-none focus:border-[#9A5E3A]" placeholder="Optional" />
            </label>
            <label className="text-sm font-medium text-[#595552]">Issues or delays
              <input maxLength={5000} value={values.issues} onChange={(event) => update({ issues: event.target.value })} className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-3 text-sm outline-none focus:border-[#9A5E3A]" placeholder="Optional" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E8E0DA] bg-white p-6">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">Labour attendance</h2><p className="mt-1 text-xs text-[#8E827A]">Record headcount by trade or contractor; individual attendance statuses are not supported.</p></div><button type="button" onClick={() => update({ labourEntries: [...values.labourEntries, blankLabour()] })} className="inline-flex items-center gap-1 rounded-lg border border-[#E8E0DA] px-3 py-2 text-xs font-semibold text-[#9A5E3A]"><Plus size={14} /> Add group</button></div>
          {values.labourEntries.length === 0 ? <p className="mt-5 text-sm text-[#8E827A]">No labour groups added.</p> : <div className="mt-4 space-y-3">{values.labourEntries.map((row) => <div key={row.key} className="grid gap-3 rounded-xl bg-[#FBF9F7] p-4 sm:grid-cols-2 lg:grid-cols-5">
            <Field label="Trade"><input value={row.trade} onChange={(event) => update({ labourEntries: editRow(values.labourEntries, row.key, { trade: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Contractor"><input value={row.contractorName} onChange={(event) => update({ labourEntries: editRow(values.labourEntries, row.key, { contractorName: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Headcount"><input type="number" min="1" step="1" value={row.headCount} onChange={(event) => update({ labourEntries: editRow(values.labourEntries, row.key, { headCount: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Hours worked (0–24)"><input type="number" min="0" max="24" step="0.25" value={row.hoursWorked} onChange={(event) => update({ labourEntries: editRow(values.labourEntries, row.key, { hoursWorked: event.target.value }) })} className={inputClass} /></Field>
            <div className="flex items-end gap-2"><Field label="Remarks" className="min-w-0 flex-1"><input value={row.remarks} onChange={(event) => update({ labourEntries: editRow(values.labourEntries, row.key, { remarks: event.target.value }) })} className={inputClass} /></Field><button type="button" aria-label="Remove labour group" onClick={() => update({ labourEntries: values.labourEntries.filter((entry) => entry.key !== row.key) })} className="mb-1 rounded-lg p-2 text-rose-700 hover:bg-rose-50"><Trash2 size={16} /></button></div>
          </div>)}</div>}
        </section>

        <section className="rounded-2xl border border-[#E8E0DA] bg-white p-6">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">Machinery usage</h2><p className="mt-1 text-xs text-[#8E827A]">Record each machine, operating hours, and optional fuel quantity.</p></div><button type="button" onClick={() => update({ machineryEntries: [...values.machineryEntries, blankMachinery()] })} className="inline-flex items-center gap-1 rounded-lg border border-[#E8E0DA] px-3 py-2 text-xs font-semibold text-[#9A5E3A]"><Plus size={14} /> Add machine</button></div>
          {values.machineryEntries.length === 0 ? <p className="mt-5 text-sm text-[#8E827A]">No machinery entries added.</p> : <div className="mt-4 space-y-3">{values.machineryEntries.map((row) => <div key={row.key} className="grid gap-3 rounded-xl bg-[#FBF9F7] p-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Machine name"><input value={row.machineName} onChange={(event) => update({ machineryEntries: editRow(values.machineryEntries, row.key, { machineName: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Operator"><input value={row.operatorName} onChange={(event) => update({ machineryEntries: editRow(values.machineryEntries, row.key, { operatorName: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Hours used (0–24)"><input type="number" min="0" max="24" step="0.25" value={row.hoursUsed} onChange={(event) => update({ machineryEntries: editRow(values.machineryEntries, row.key, { hoursUsed: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Fuel litres"><input type="number" min="0" step="0.01" value={row.fuelLitres} onChange={(event) => update({ machineryEntries: editRow(values.machineryEntries, row.key, { fuelLitres: event.target.value }) })} className={inputClass} /></Field>
            <Field label="Remarks"><input value={row.remarks} onChange={(event) => update({ machineryEntries: editRow(values.machineryEntries, row.key, { remarks: event.target.value }) })} className={inputClass} /></Field>
            <div className="flex items-end"><button type="button" onClick={() => update({ machineryEntries: values.machineryEntries.filter((entry) => entry.key !== row.key) })} className="mb-1 inline-flex items-center gap-2 rounded-lg p-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"><Trash2 size={15} /> Remove entry</button></div>
          </div>)}</div>}
        </section>

        <div className="flex justify-end gap-3"><button type="button" onClick={() => navigate(`/projects/${projectId}/logs`)} className="rounded-xl border border-[#E8E0DA] bg-white px-5 py-3 text-sm font-semibold text-[#595552]">Cancel</button><button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} /> {isSaving ? 'Saving…' : logId ? 'Save changes' : 'Create daily log'}</button></div>
      </form>}
    </div>
  </AppShell>
}

const inputClass = 'mt-1 w-full rounded-lg border border-[#E8E0DA] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9A5E3A]'

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return <label className={`block text-xs font-medium text-[#595552] ${className}`}>{label}{children}</label>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}
