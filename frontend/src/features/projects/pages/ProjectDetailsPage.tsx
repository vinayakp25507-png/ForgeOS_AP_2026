// Imports useMemo from react so this module can reuse that component, helper, or library.
import { useMemo } from 'react'
// Imports ArrowLeft, CalendarDays, MapPin, UserRound, Wallet from lucide-react so this module can reuse that component, helper, or library.
import { ArrowLeft, CalendarDays, MapPin, UserRound, Wallet } from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports getCurrentRole, getCurrentUser from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { getCurrentRole, getCurrentUser } from '../../authentication/utils/permissions'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface Project {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the code field so the surrounding object or component receives this setting.
  code: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the location field so the surrounding object or component receives this setting.
  location: string
  // Sets the manager field so the surrounding object or component receives this setting.
  manager: string
  // Sets the budget field so the surrounding object or component receives this setting.
  budget: number | string
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: string
  // Sets the endDate field so the surrounding object or component receives this setting.
  endDate: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectDetailsPage so this module can perform its named task when needed.
export function ProjectDetailsPage() {
  // Stores the value in projectId so later lines can reuse this data or behavior for the current feature.
  const projectId = window.location.pathname.split('/').filter(Boolean)[2]

  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  // Caches project so its calculation is repeated only when its inputs change.
  const project = useMemo(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_projects')
      // Stores the value in projects so later lines can reuse this data or behavior for the current feature.
      const projects: Project[] = saved ? JSON.parse(saved) : []
      // Stores the value in found so later lines can reuse this data or behavior for the current feature.
      const found = projects.find((item) => String(item.id) === String(projectId))
      // Stores the value in role so later lines can reuse this data or behavior for the current feature.
      const role = getCurrentRole()
      // Stores the value in user so later lines can reuse this data or behavior for the current feature.
      const user = getCurrentUser()
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (role === 'Admin') return found
      // Returns the result so the caller or React receives the value or interface this function provides.
      return found && String(found.manager).trim().toLowerCase() ===
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        String(user?.name ?? '').trim().toLowerCase() ? found : undefined
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return undefined
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [projectId])

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/projects">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-5xl space-y-6 p-5 sm:p-7 lg:p-8">
        {/* Starts the <button> element to provide an action the user can activate. */}
        <button
          /* Chooses the element’s browser behavior, such as a button action or input format. */
          type="button"
          /* Connects the Click event to its handler so the interface can respond to interaction. */
          onClick={() => { window.location.href = '/app/projects' }}
          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
          className="inline-flex items-center gap-2 text-sm font-medium text-[#595552] hover:text-[#323232]"
        >
          {/* Starts the <ArrowLeft> element to organize this part of the interface. */}
          <ArrowLeft size={17} /> Back to Projects
        {/* Closes the <button> element so later content is no longer part of this region. */}
        </button>

        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {!project ? (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <section className="rounded-2xl border border-[#C8BCB4] bg-white p-8">
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="text-xl font-semibold text-[#323232]">Project not found</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              This project is unavailable in the saved project list.
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
          {/* Closes the <section> element so later content is no longer part of this region. */}
          </section>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ) : (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <>
            {/* Starts the <section> element to group related content into a meaningful region. */}
            <section className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-6">
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="text-sm font-medium text-[#8E827A]">{project.code}</p>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <h1> element to organize this part of the interface. */}
                  <h1 className="text-2xl font-semibold text-[#323232]">{project.name}</h1>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#8E827A]">
                    {/* Starts the <MapPin> element to organize this part of the interface. */}
                    <MapPin size={16} /> {project.location}
                  {/* Closes the <p> element so later content is no longer part of this region. */}
                  </p>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="rounded-full bg-[#F7F3EE] px-3 py-1.5 text-sm font-medium text-[#595552]">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {project.status}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <section> element so later content is no longer part of this region. */}
            </section>

            {/* Starts the <section> element to group related content into a meaningful region. */}
            <section className="grid gap-4 sm:grid-cols-2">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {[
                // Continues the component or data expression so its related values and behavior stay grouped together.
                { label: 'Project Manager', value: project.manager, icon: UserRound },
                // Continues the component or data expression so its related values and behavior stay grouped together.
                { label: 'Budget', value: String(project.budget), icon: Wallet },
                // Continues the component or data expression so its related values and behavior stay grouped together.
                { label: 'Start Date', value: project.startDate, icon: CalendarDays },
                // Continues the component or data expression so its related values and behavior stay grouped together.
                { label: 'End Date', value: project.endDate, icon: CalendarDays },
              // Transforms each collection item so the corresponding values or interface elements can be produced.
              ].map(({ label, value, icon: Icon }) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div key={label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5">
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="flex items-center gap-2 text-sm text-[#8E827A]">
                    {/* Starts the <Icon> element to organize this part of the interface. */}
                    <Icon size={17} /> {label}
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="mt-3 font-semibold text-[#323232]">{value || 'Not specified'}</p>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <section> element so later content is no longer part of this region. */}
            </section>
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          </>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
