// Imports Cog, MoreHorizontal from lucide-react so this module can reuse that component, helper, or library.
import { Cog, MoreHorizontal } from 'lucide-react'
// Imports type  MachineryEntry from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { MachineryEntry } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface MachineryUsageProps {
  // Sets the entries field so the surrounding object or component receives this setting.
  entries: MachineryEntry[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles = {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'In use': 'bg-emerald-50 text-emerald-700',
  // Sets the Idle field so the surrounding object or component receives this setting.
  Idle: 'bg-slate-100 text-slate-600',
  // Sets the Maintenance field so the surrounding object or component receives this setting.
  Maintenance: 'bg-amber-50 text-amber-700',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines MachineryUsage so this module can perform its named task when needed.
export function MachineryUsage({ entries }: MachineryUsageProps) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <section className="rounded-2xl border border-[#E8E0DA] bg-white p-5 shadow-[0_8px_24px_rgba(50,50,50,0.04)]">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mb-5 flex items-start justify-between">
        {/* Starts the <div> element to organize this part of the interface. */}
        <div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex items-center gap-2 text-[#323232]">
            {/* Starts the <Cog> element to organize this part of the interface. */}
            <Cog className="h-4 w-4" />
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold">Machinery usage</h2>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mt-1 text-xs text-[#8E827A]">{entries.filter((entry) => entry.status === 'In use').length} machines active · {entries.reduce((total, entry) => total + entry.hours, 0)} hours logged</p>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button className="text-xs font-semibold text-[#9A5E3A] hover:text-[#323232]" type="button">View all</button>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="divide-y divide-[#F1EBE6]">
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {entries.map((entry) => (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={entry.id}>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F3EE] text-[#9A5E3A]">
              {/* Starts the <Cog> element to organize this part of the interface. */}
              <Cog className="h-4 w-4" />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="min-w-0 flex-1">
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="truncate text-sm font-medium text-[#323232]">{entry.name}</p>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="text-xs text-[#8E827A]">{entry.type} · {entry.operator}</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="text-right">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[entry.status]}`}>{entry.status}</span>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-[11px] text-[#8E827A]">{entry.hours}h</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <MoreHorizontal> element to organize this part of the interface. */}
            <MoreHorizontal className="h-4 w-4 text-[#B6AAA2]" />
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ))}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <section> element so later content is no longer part of this region. */}
    </section>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
