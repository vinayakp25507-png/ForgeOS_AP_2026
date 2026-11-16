// Imports Edit3, FileText, MapPin, Plus from lucide-react so this module can reuse that component, helper, or library.
import { Edit3, FileText, MapPin, Plus } from 'lucide-react'
// Imports useState from react so this module can reuse that component, helper, or library.
import { useState } from 'react'
// Imports ActivityTimeline from ./ActivityTimeline so this module can reuse that component, helper, or library.
import { ActivityTimeline } from './ActivityTimeline'
// Imports DailyLogForm from ./DailyLogForm so this module can reuse that component, helper, or library.
import { DailyLogForm } from './DailyLogForm'
// Imports DailyLogsList from ./DailyLogsList so this module can reuse that component, helper, or library.
import { DailyLogsList } from './DailyLogsList'
// Imports LabourAttendance from ./LabourAttendance so this module can reuse that component, helper, or library.
import { LabourAttendance } from './LabourAttendance'
// Imports MachineryUsage from ./MachineryUsage so this module can reuse that component, helper, or library.
import { MachineryUsage } from './MachineryUsage'
// Imports ProgressHistory from ./ProgressHistory so this module can reuse that component, helper, or library.
import { ProgressHistory } from './ProgressHistory'
// Imports type  DailyLog from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { DailyLog } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface DailyLogsShellProps {
  // Sets the initialLogs field so the surrounding object or component receives this setting.
  initialLogs: DailyLog[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines DailyLogsShell so this module can perform its named task when needed.
export function DailyLogsShell({ initialLogs }: DailyLogsShellProps) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [logs, setLogs] = useState(initialLogs)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedId, setSelectedId] = useState(initialLogs[0]?.id ?? '')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [isCreating, setIsCreating] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editingId, setEditingId] = useState<string | null>(null)
  // Stores the value in selectedLog so later lines can reuse this data or behavior for the current feature.
  const selectedLog = logs.find((log) => log.id === selectedId) ?? logs[0]

  // Stores the value in handleSave so later lines can reuse this data or behavior for the current feature.
  const handleSave = (summary: string) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editingId) {
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setLogs((currentLogs) => currentLogs.map((log) => log.id === editingId ? { ...log, summary } : log))
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setIsCreating(false)
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setEditingId(null)
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in newLog so later lines can reuse this data or behavior for the current feature.
    const newLog: DailyLog = {
      // Sets the id field so the surrounding object or component receives this setting.
      id: `log-${Date.now()}`,
      // Sets the date field so the surrounding object or component receives this setting.
      date: '2024-06-19',
      // Sets the project field so the surrounding object or component receives this setting.
      project: 'Riverside Residences',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: 'Not recorded',
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'Draft',
      // Continues the component or data expression so its related values and behavior stay grouped together.
      summary,
      // Sets the progress field so the surrounding object or component receives this setting.
      progress: selectedLog?.progress ?? 68,
      // Sets the labour field so the surrounding object or component receives this setting.
      labour: [],
      // Sets the machinery field so the surrounding object or component receives this setting.
      machinery: [],
      // Sets the progressHistory field so the surrounding object or component receives this setting.
      progressHistory: [],
      // Sets the activity field so the surrounding object or component receives this setting.
      activity: [],
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setLogs((currentLogs) => [newLog, ...currentLogs])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedId(newLog.id)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setIsCreating(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (isCreating) {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return (
      // Continues the component or data expression so its related values and behavior stay grouped together.
      <div className="min-h-screen bg-[#F7F3EE] text-[#323232]">
        {/* Starts the <DailyLogForm> element to organize this part of the interface. */}
        <DailyLogForm initialSummary={editingId ? selectedLog?.summary : undefined} isEditing={Boolean(editingId)} onCancel={() => { setIsCreating(false); setEditingId(null) }} onSave={handleSave} />
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    // Closes this function call or grouped expression so the surrounding code can continue.
    )
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="min-h-screen bg-[#F7F3EE] text-[#323232]">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="w-full shrink-0 shadow-sm lg:w-[330px] lg:shadow-none">
          {/* Starts the <DailyLogsList> element to organize this part of the interface. */}
          <DailyLogsList logs={logs} onCreate={() => { setEditingId(null); setIsCreating(true) }} onSelect={setSelectedId} selectedId={selectedId} />
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        {selectedLog ? <main className="min-w-0 flex-1">
          {/* Starts the <header> element to organize this part of the interface. */}
          <header className="border-b border-[#E8E0DA] bg-[#F7F3EE] px-6 py-6 lg:px-10">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mx-auto flex max-w-5xl items-start justify-between gap-5">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="mb-3 flex items-center gap-2 text-xs text-[#8E827A]">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span>Projects</span><span>/</span><span>Riverside Residences</span><span>/</span><span className="font-medium text-[#595552]">Daily logs</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex items-center gap-3">
                  {/* Starts the <h1> element to organize this part of the interface. */}
                  <h1 className="text-2xl font-bold tracking-tight text-[#323232]">Wednesday, June 18</h1>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">{selectedLog.status}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#8E827A]"><MapPin className="h-3.5 w-3.5" /> Riverside Residences · Tower A</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2">
                {/* Starts the <button> element to provide an action the user can activate. */}
                <button className="hidden items-center gap-2 rounded-xl border border-[#E8E0DA] bg-white px-3 py-2.5 text-xs font-semibold text-[#595552] hover:border-[#C8BCB4] sm:flex" type="button"><FileText className="h-3.5 w-3.5" /> Export</button>
                {/* Starts the <button> element to provide an action the user can activate. */}
                <button className="flex items-center gap-2 rounded-xl bg-[#323232] px-3 py-2.5 text-xs font-semibold text-[#F7F3EE] hover:bg-[#9A5E3A]" onClick={() => { setEditingId(selectedLog.id); setIsCreating(true) }} type="button"><Edit3 className="h-3.5 w-3.5" /> Edit log</button>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <header> element so later content is no longer part of this region. */}
          </header>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="mx-auto max-w-5xl space-y-5 p-6 lg:p-10">
            {/* Starts the <section> element to group related content into a meaningful region. */}
            <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5E3A]">Site summary</p>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#595552]">{selectedLog.summary}</p>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="shrink-0 sm:text-right"><p className="text-3xl font-bold text-[#323232]">{selectedLog.progress}%</p><p className="text-xs text-[#8E827A]">overall progress</p></div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#F0E9E4]"><div className="h-full rounded-full bg-[#9A5E3A]" style={{ width: `${selectedLog.progress}%` }} /></div>
            {/* Closes the <section> element so later content is no longer part of this region. */}
            </section>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid gap-5 xl:grid-cols-2">
              {/* Starts the <LabourAttendance> element to organize this part of the interface. */}
              <LabourAttendance entries={selectedLog.labour} />
              {/* Starts the <MachineryUsage> element to organize this part of the interface. */}
              <MachineryUsage entries={selectedLog.machinery} />
              {/* Starts the <ProgressHistory> element to organize this part of the interface. */}
              <ProgressHistory entries={selectedLog.progressHistory} />
              {/* Starts the <ActivityTimeline> element to organize this part of the interface. */}
              <ActivityTimeline entries={selectedLog.activity} />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        </main> : <EmptyState onCreate={() => setIsCreating(true)} />}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines EmptyState so this module can perform its named task when needed.
function EmptyState({ onCreate }: { onCreate: () => void }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <main className="flex flex-1 items-center justify-center p-8"><div className="text-center"><h1 className="text-2xl font-bold">No daily log selected</h1><p className="mt-2 text-sm text-[#8E827A]">Create a site record to start tracking today’s operations.</p><button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#323232] px-4 py-3 text-sm font-semibold text-white" onClick={onCreate} type="button"><Plus className="h-4 w-4" /> Create daily log</button></div></main>
// Closes the current block or object so the grouped statements or settings end here.
}
