// Imports ChevronDown, MapPin from lucide-react so this module can reuse that component, helper, or library.
import { ChevronDown, MapPin } from 'lucide-react'

// Stores the value in defaultProjects so later lines can reuse this data or behavior for the current feature.
const defaultProjects = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-001', name: 'Green Valley Residency' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PRJ-002', name: 'Skyline Commercial Hub' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProjectSelectorProps {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  value?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  options?: Array<{ id: string; name: string }>
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  onChange?: (value: string) => void
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectSelector so this module can perform its named task when needed.
export function ProjectSelector({ value = defaultProjects[0].id, options = defaultProjects, onChange }: ProjectSelectorProps) {
  // Stores the value in selectedProject so later lines can reuse this data or behavior for the current feature.
  const selectedProject = options.find((project) => project.id === value) ?? options[0]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <label className="relative flex min-w-0 items-center gap-2 rounded-xl border border-[#E8E0DA] bg-white px-3 py-1.5 text-left shadow-[0_2px_8px_rgba(50,50,50,0.03)] hover:border-[#C8BCB4]">
      {/* Starts the <span> element to organize this part of the interface. */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3E9E1] text-[#9A5E3A]"><MapPin className="h-4 w-4" /></span>
      {/* Starts the <span> element to organize this part of the interface. */}
      <span className="min-w-0">
        {/* Starts the <span> element to organize this part of the interface. */}
        <span className="block truncate text-xs font-semibold text-[#323232]">{selectedProject.name}</span>
        {/* Starts the <span> element to organize this part of the interface. */}
        <span className="block text-[10px] font-medium tracking-wide text-[#8E827A]">{selectedProject.id}</span>
      {/* Closes the <span> element so later content is no longer part of this region. */}
      </span>
      {/* Starts the <select> element to collect or display a value. */}
      <select
        /* Provides aria-label accessibility information so assistive technology can describe the element. */
        aria-label="Select project"
        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
        /* Supplies the value shown by this form control so the user sees the current data. */
        value={selectedProject.id}
        /* Connects the Change event to its handler so the interface can respond to interaction. */
        onChange={(event) => onChange?.(event.target.value)}
      >
        // Transforms each collection item so the corresponding values or interface elements can be produced.
        {options.map((project) => <option value={project.id} key={project.id}>{project.name}</option>)}
      {/* Closes the <select> element so later content is no longer part of this region. */}
      </select>
      {/* Starts the <ChevronDown> element to organize this part of the interface. */}
      <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-[#8E827A]" aria-hidden="true" />
    {/* Closes the <label> element so later content is no longer part of this region. */}
    </label>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
