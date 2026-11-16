// Imports AlertTriangle, CheckCircle2, ClipboardCheck, Truck from lucide-react so this module can reuse that component, helper, or library.
import { AlertTriangle, CheckCircle2, ClipboardCheck, Truck } from 'lucide-react'
// Imports type  ActivityEntry from ../types/dailyLog so this module can reuse that component, helper, or library.
import type { ActivityEntry } from '../types/dailyLog'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ActivityTimelineProps {
  // Sets the entries field so the surrounding object or component receives this setting.
  entries: ActivityEntry[]
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in activityIcons so later lines can reuse this data or behavior for the current feature.
const activityIcons = {
  // Sets the update field so the surrounding object or component receives this setting.
  update: <TrendingIcon />,
  // Sets the delivery field so the surrounding object or component receives this setting.
  delivery: <Truck className="h-4 w-4" />,
  // Sets the issue field so the surrounding object or component receives this setting.
  issue: <AlertTriangle className="h-4 w-4" />,
  // Sets the approval field so the surrounding object or component receives this setting.
  approval: <ClipboardCheck className="h-4 w-4" />,
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines TrendingIcon so this module can perform its named task when needed.
function TrendingIcon() {
  /* Returns the result so the caller or React receives the value or interface this function provides. */
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <span className="text-sm font-bold">↗</span>
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ActivityTimeline so this module can perform its named task when needed.
export function ActivityTimeline({ entries }: ActivityTimelineProps) {
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
            {/* Starts the <CheckCircle2> element to organize this part of the interface. */}
            <CheckCircle2 className="h-4 w-4" />
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold">Activity timeline</h2>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mt-1 text-xs text-[#8E827A]">What happened on site today</p>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button className="text-xs font-semibold text-[#9A5E3A] hover:text-[#323232]" type="button">See all</button>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="space-y-4">
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {entries.map((entry) => (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="flex gap-3" key={entry.id}>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3E9E1] text-[#9A5E3A]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {activityIcons[entry.type]}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="min-w-0 flex-1 border-b border-[#F1EBE6] pb-4 last:border-0 last:pb-0">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-start justify-between gap-3">
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="text-sm font-medium text-[#323232]">{entry.title}</p>
                {/* Starts the <time> element to organize this part of the interface. */}
                <time className="shrink-0 text-[11px] text-[#A59A93]">{entry.time}</time>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs leading-5 text-[#8E827A]">{entry.description}</p>
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
