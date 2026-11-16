// Imports CalendarDays, ChevronRight, CloudSun, FileText, Plus from lucide-react so this module can reuse that component, helper, or library.
import { CalendarDays, ChevronRight, CloudSun, FileText, Plus } from 'lucide-react'
// Imports type  DailyLog from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { DailyLog } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface DailyLogsListProps {
  // Sets the logs field so the surrounding object or component receives this setting.
  logs: DailyLog[]
  // Sets the selectedId field so the surrounding object or component receives this setting.
  selectedId: string
  // Sets the onSelect field so the surrounding object or component receives this setting.
  onSelect: (id: string) => void
  // Sets the onCreate field so the surrounding object or component receives this setting.
  onCreate: () => void
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

// Defines DailyLogsList so this module can perform its named task when needed.
export function DailyLogsList({ logs, selectedId, onSelect, onCreate }: DailyLogsListProps) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <aside className="flex w-full shrink-0 flex-col border-b border-[#E8E0DA] bg-[#FBF9F7] lg:w-[330px] lg:border-b-0 lg:border-r">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="border-b border-[#E8E0DA] p-5">
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="mb-4 flex items-center justify-between">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">Site records</p>
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#323232]">Daily logs</h2>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button onClick={onCreate} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#323232] text-[#F7F3EE] transition hover:bg-[#9A5E3A]" type="button" aria-label="Create daily log">
            {/* Starts the <Plus> element to organize this part of the interface. */}
            <Plus className="h-4 w-4" />
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex items-center gap-2 rounded-xl border border-[#E8E0DA] bg-white px-3 py-2.5 text-xs text-[#8E827A]">
          {/* Starts the <CalendarDays> element to organize this part of the interface. */}
          <CalendarDays className="h-3.5 w-3.5" />
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          Jun 2024 · Riverside Residences
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="flex-1 overflow-auto p-3">
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {logs.map((log) => (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <button className={`mb-2 w-full rounded-xl border p-4 text-left transition ${selectedId === log.id ? 'border-[#CBA78F] bg-[#F3E9E1]' : 'border-transparent bg-transparent hover:border-[#E8E0DA] hover:bg-white'}`} key={log.id} onClick={() => onSelect(log.id)} type="button">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-start justify-between gap-2">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="text-sm font-semibold text-[#323232]">{new Date(`${log.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-xs text-[#8E827A]">{log.project}</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <ChevronRight> element to organize this part of the interface. */}
              <ChevronRight className={`h-4 w-4 ${selectedId === log.id ? 'text-[#9A5E3A]' : 'text-[#B6AAA2]'}`} />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mt-3 flex items-center justify-between">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[log.status]}`}>{log.status}</span>
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="text-xs font-medium text-[#595552]">{log.progress}% complete</span>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ))}
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#C8BCB4] px-4 py-3 text-xs font-semibold text-[#9A5E3A] hover:bg-white" onClick={onCreate} type="button">
          {/* Starts the <FileText> element to organize this part of the interface. */}
          <FileText className="h-3.5 w-3.5" /> Start a new log
        {/* Closes the <button> element so later content is no longer part of this region. */}
        </button>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="border-t border-[#E8E0DA] p-4">
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex items-center gap-3 rounded-xl bg-[#F3E9E1] p-3">
          {/* Starts the <CloudSun> element to organize this part of the interface. */}
          <CloudSun className="h-5 w-5 text-[#9A5E3A]" />
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs font-semibold text-[#323232]">Today on site</p>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-[11px] text-[#8E827A]">Clear · 28°C · Good conditions</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <aside> element so later content is no longer part of this region. */}
    </aside>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
