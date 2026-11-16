// Imports ArrowUpRight, TrendingUp from lucide-react so this module can reuse that component, helper, or library.
import { ArrowUpRight, TrendingUp } from 'lucide-react'
// Imports type  ProgressEntry from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { ProgressEntry } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProgressHistoryProps {
  // Sets the entries field so the surrounding object or component receives this setting.
  entries: ProgressEntry[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProgressHistory so this module can perform its named task when needed.
export function ProgressHistory({ entries }: ProgressHistoryProps) {
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
            {/* Starts the <TrendingUp> element to organize this part of the interface. */}
            <TrendingUp className="h-4 w-4" />
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold">Progress history</h2>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mt-1 text-xs text-[#8E827A]">Latest activity completion updates</p>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button className="text-xs font-semibold text-[#9A5E3A] hover:text-[#323232]" type="button">Open report</button>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="space-y-4">
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {entries.map((entry) => (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div key={entry.id}>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="mb-1.5 flex items-center justify-between gap-3">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="text-sm font-medium text-[#323232]">{entry.activity}</p>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="text-xs text-[#8E827A]">{entry.date} · {entry.note}</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="text-sm font-bold text-[#323232]">{entry.completion}%</span>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="h-1.5 overflow-hidden rounded-full bg-[#F0E9E4]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="h-full rounded-full bg-[#9A5E3A]" style={{ width: `${entry.completion}%` }} />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ))}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F7F3EE] px-3 py-2.5 text-xs text-[#595552]">
        {/* Starts the <ArrowUpRight> element to organize this part of the interface. */}
        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
        {/* Starts the <span> element to organize this part of the interface. */}
        <span>Overall project progress is up 4.2% this week.</span>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <section> element so later content is no longer part of this region. */}
    </section>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
