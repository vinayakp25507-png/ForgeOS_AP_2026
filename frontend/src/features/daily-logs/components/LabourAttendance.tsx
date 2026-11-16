// Imports Check, Clock3, Users, X from lucide-react so this module can reuse that component, helper, or library.
import { Check, Clock3, Users, X } from 'lucide-react'
// Imports type  LabourEntry from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { LabourEntry } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface LabourAttendanceProps {
  // Sets the entries field so the surrounding object or component receives this setting.
  entries: LabourEntry[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles = {
  // Sets the Present field so the surrounding object or component receives this setting.
  Present: 'bg-emerald-50 text-emerald-700',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Half day': 'bg-amber-50 text-amber-700',
  // Sets the Absent field so the surrounding object or component receives this setting.
  Absent: 'bg-rose-50 text-rose-700',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LabourAttendance so this module can perform its named task when needed.
export function LabourAttendance({ entries }: LabourAttendanceProps) {
  // Stores the value in presentCount so later lines can reuse this data or behavior for the current feature.
  const presentCount = entries.filter((entry) => entry.status === 'Present').length

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
            {/* Starts the <Users> element to organize this part of the interface. */}
            <Users className="h-4 w-4" />
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold">Labour attendance</h2>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mt-1 text-xs text-[#8E827A]">{presentCount} of {entries.length} workers present today</p>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button className="text-xs font-semibold text-[#9A5E3A] hover:text-[#323232]" type="button">View all</button>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="space-y-3">
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {entries.map((entry) => (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="flex items-center gap-3" key={entry.id}>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E9E1] text-xs font-bold text-[#9A5E3A]">
              // Transforms each collection item so the corresponding values or interface elements can be produced.
              {entry.name.split(' ').map((part) => part[0]).join('')}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="min-w-0 flex-1">
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="truncate text-sm font-medium text-[#323232]">{entry.name}</p>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="truncate text-xs text-[#8E827A]">{entry.trade} · {entry.company}</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="text-right">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[entry.status]}`}>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {entry.status === 'Present' ? <Check className="h-3 w-3" /> : entry.status === 'Absent' ? <X className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {entry.status}
              {/* Closes the <span> element so later content is no longer part of this region. */}
              </span>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-[11px] text-[#8E827A]">{entry.hours}h logged</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
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
