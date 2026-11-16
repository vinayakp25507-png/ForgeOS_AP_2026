// Imports useMemo, useState, useEffect from react so this module can reuse that component, helper, or library.
import {useMemo, useState, useEffect} from 'react'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  FolderKanban, Plus, Search, Pencil, Trash2, X,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MapPin, CalendarDays, Users, Wallet
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports getCurrentRole, getCurrentUser from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { getCurrentRole, getCurrentUser } from '../../authentication/utils/permissions'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Project = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the code field so the surrounding object or component receives this setting.
  code: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the location field so the surrounding object or component receives this setting.
  location: string
  // Sets the manager field so the surrounding object or component receives this setting.
  manager: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  managerEmail?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createdByEmail?: string
  // Sets the budget field so the surrounding object or component receives this setting.
  budget: string
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: string
  // Sets the endDate field so the surrounding object or component receives this setting.
  endDate: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold'
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in initialProjects so later lines can reuse this data or behavior for the current feature.
const initialProjects: Project[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 1, code: 'PRJ-001', name: 'Green Valley Residency', location: 'Gurugram, Haryana', manager: 'Aarav Sharma', budget: '₹2.5 Cr', startDate: '2026-01-10', endDate: '2026-12-20', status: 'In Progress' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 2, code: 'PRJ-002', name: 'Skyline Commercial Hub', location: 'Delhi, India', manager: 'Priya Mehta', budget: '₹4.2 Cr', startDate: '2026-02-01', endDate: '2027-03-15', status: 'In Progress' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 3, code: 'PRJ-003', name: 'Riverside Heights', location: 'Noida, UP', manager: 'Rohan Verma', budget: '₹1.8 Cr', startDate: '2025-06-01', endDate: '2026-08-30', status: 'Completed' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 4, code: 'PRJ-004', name: 'Urban Square', location: 'Jaipur, Rajasthan', manager: 'Neha Kapoor', budget: '₹3.1 Cr', startDate: '2026-09-01', endDate: '2027-10-30', status: 'Planning' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in emptyForm so later lines can reuse this data or behavior for the current feature.
const emptyForm = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: '', location: '', manager: '', managerEmail: '', budget: '',
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: '', endDate: '', status: 'Planning' as Project['status'],
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles: Record<Project['status'], string> = {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Planning': 'bg-[#F1EAF6] text-[#806B96]',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'In Progress': 'bg-[#F5EDE1] text-[#9A7950]',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Completed': 'bg-[#E8EFE5] text-[#617858]',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'On Hold': 'bg-[#F8ECEA] text-[#9B625A]',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectsPage so this module can perform its named task when needed.
export function ProjectsPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_projects')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return saved ? JSON.parse(saved) as Project[] : initialProjects
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialProjects
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem('forgeos_projects', JSON.stringify(projects))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [projects])

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [filter, setFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showForm, setShowForm] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editing, setEditing] = useState<Project | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [form, setForm] = useState(emptyForm)

  // Stores the value in currentUser so later lines can reuse this data or behavior for the current feature.
  const currentUser = getCurrentUser()
  // Stores the value in currentRole so later lines can reuse this data or behavior for the current feature.
  const currentRole = getCurrentRole()

  // Stores the value in registeredUsers so later lines can reuse this data or behavior for the current feature.
  const registeredUsers = (() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = JSON.parse(localStorage.getItem('forgeos_users') || '[]')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return Array.isArray(saved) ? saved : []
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return []
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })()

  // Stores the value in currentProfile so later lines can reuse this data or behavior for the current feature.
  const currentProfile = registeredUsers.find((user: any) =>
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    String(user.email || '').trim().toLowerCase() ===
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    String(currentUser?.email || '').trim().toLowerCase()
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
  // Stores the value in currentUserName so later lines can reuse this data or behavior for the current feature.
  const currentUserName = String(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    currentUser?.name || currentProfile?.name || ''
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ).trim()
  // Stores the value in currentUserEmail so later lines can reuse this data or behavior for the current feature.
  const currentUserEmail = String(currentUser?.email || '').trim().toLowerCase()

  // Stores the value in managerOptions so later lines can reuse this data or behavior for the current feature.
  const managerOptions = Array.from(new Set([
    // Continues the component or data expression so its related values and behavior stay grouped together.
    'Aarav Sharma', 'Priya Mehta', 'Rohan Verma', 'Neha Kapoor',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...registeredUsers
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((user: any) =>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ['project manager', 'pm'].includes(String(user.role || '').toLowerCase()) &&
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        String(user.status || 'Active').toLowerCase() === 'active'
      // Closes this function call or grouped expression so the surrounding code can continue.
      )
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      .map((user: any) => String(user.name || '').trim())
      // Keeps only items matching this condition so the result contains relevant data.
      .filter(Boolean),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]))

  // Stores the value in visibleProjects so later lines can reuse this data or behavior for the current feature.
  const visibleProjects = currentRole === 'Admin'
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ? projects
    // Keeps only items matching this condition so the result contains relevant data.
    : projects.filter((project: any) => {
        // Stores the value in assignedName so later lines can reuse this data or behavior for the current feature.
        const assignedName = String(project.manager || '').trim().toLowerCase()
        // Stores the value in assignedEmail so later lines can reuse this data or behavior for the current feature.
        const assignedEmail = String(project.managerEmail || '').trim().toLowerCase()
        // Returns the result so the caller or React receives the value or interface this function provides.
        return (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          (currentUserName !== '' && assignedName === currentUserName.toLowerCase()) ||
          // Continues the component or data expression so its related values and behavior stay grouped together.
          (currentUserEmail !== '' && (assignedEmail === currentUserEmail || String(project.createdByEmail || '').trim().toLowerCase() === currentUserEmail))
        // Closes this function call or grouped expression so the surrounding code can continue.
        )
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })

  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  // Caches filtered so its calculation is repeated only when its inputs change.
  const filtered = useMemo(() => visibleProjects.filter((project) => {
    // Stores the value in query so later lines can reuse this data or behavior for the current feature.
    const query = search.toLowerCase()
    // Stores the value in matchesSearch so later lines can reuse this data or behavior for the current feature.
    const matchesSearch = `${project.name} ${project.code} ${project.location} ${project.manager}`.toLowerCase().includes(query)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return matchesSearch && (filter === 'All' || project.status === filter)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [visibleProjects, search, filter])

  // Stores the value in openAdd so later lines can reuse this data or behavior for the current feature.
  const openAdd = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...emptyForm,
      // Sets the manager field so the surrounding object or component receives this setting.
      manager: currentRole === 'Project Manager' ? currentUserName : '',
      // Sets the managerEmail field so the surrounding object or component receives this setting.
      managerEmail: currentRole === 'Project Manager' ? currentUserEmail : '',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openEdit so later lines can reuse this data or behavior for the current feature.
  const openEdit = (project: Project) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(project)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({
      // Sets the name field so the surrounding object or component receives this setting.
      name: project.name,
      // Sets the location field so the surrounding object or component receives this setting.
      location: project.location,
      // Sets the manager field so the surrounding object or component receives this setting.
      manager: project.manager,
      // Sets the managerEmail field so the surrounding object or component receives this setting.
      managerEmail: project.managerEmail || '',
      // Sets the budget field so the surrounding object or component receives this setting.
      budget: project.budget,
      // Sets the startDate field so the surrounding object or component receives this setting.
      startDate: project.startDate,
      // Sets the endDate field so the surrounding object or component receives this setting.
      endDate: project.endDate,
      // Sets the status field so the surrounding object or component receives this setting.
      status: project.status,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in saveProject so later lines can reuse this data or behavior for the current feature.
  const saveProject = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()

    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.alert('Project end date cannot be earlier than its start date.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in duplicateName so later lines can reuse this data or behavior for the current feature.
    const duplicateName = projects.some((project) =>
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      project.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
      // Continues the component or data expression so its related values and behavior stay grouped together.
      project.id !== editing?.id
    // Closes this function call or grouped expression so the surrounding code can continue.
    )
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (duplicateName) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.alert('A project with this name already exists.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!form.name.trim() || !form.location.trim() || !form.manager.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.alert('Please complete all required project details.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editing) {
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setProjects((current) => current.map((p) =>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        p.id === editing.id ? { ...p, ...form } : p
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Stores the value in enteredEmail so later lines can reuse this data or behavior for the current feature.
      const enteredEmail = String(form.managerEmail || '').trim().toLowerCase()
      // Stores the value in assignedProfile so later lines can reuse this data or behavior for the current feature.
      const assignedProfile = registeredUsers.find((user: any) =>
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        enteredEmail && String(user.email || '').trim().toLowerCase() === enteredEmail
      // Closes this function call or grouped expression so the surrounding code can continue.
      )
      // Stores the value in assignedManager so later lines can reuse this data or behavior for the current feature.
      const assignedManager = String(form.manager || assignedProfile?.name || '').trim()

      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (!assignedManager) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        window.alert(currentRole === 'Project Manager'
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ? 'Your account name is missing. Please ask the Administrator to update your user profile.'
          // Continues the component or data expression so its related values and behavior stay grouped together.
          : 'Please enter a Project Manager name or registered email.')
        // Returns the result so the caller or React receives the value or interface this function provides.
        return
      // Closes the current block or object so the grouped statements or settings end here.
      }

      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setProjects((current) => [...current, {
        // Sets the id field so the surrounding object or component receives this setting.
        id: Date.now(),
        // Sets the code field so the surrounding object or component receives this setting.
        code: `PRJ-${String(current.length + 1).padStart(3, '0')}`,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...form,
        // Sets the manager field so the surrounding object or component receives this setting.
        manager: assignedManager,
        // Sets the managerEmail field so the surrounding object or component receives this setting.
        managerEmail: String(assignedProfile?.email || enteredEmail || '').trim().toLowerCase(),
        // Sets the createdByEmail field so the surrounding object or component receives this setting.
        createdByEmail: currentUserEmail,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in deleteProject so later lines can reuse this data or behavior for the current feature.
  const deleteProject = (id: number) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (window.confirm('Are you sure you want to delete this project?')) {
      // Keeps only items matching this condition so the result contains relevant data.
      setProjects((current) => current.filter((p) => p.id !== id))
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Total Projects', value: visibleProjects.length, icon: FolderKanban },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'In Progress', value: visibleProjects.filter((p) => p.status === 'In Progress').length, icon: CalendarDays },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Completed', value: visibleProjects.filter((p) => p.status === 'Completed').length, icon: Users },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'On Hold', value: visibleProjects.filter((p) => p.status === 'On Hold').length, icon: Wallet },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/projects">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Projects</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Project Management</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Create, organize and monitor your construction projects.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          // Continues the component or data expression so its related values and behavior stay grouped together.
          {(currentRole === 'Admin' || currentRole === 'Project Manager') && <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            {/* Starts the <Plus> element to organize this part of the interface. */}
            <Plus size={17} /> Create Project
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>}
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {stats.map((stat) => {
            // Stores the value in Icon so later lines can reuse this data or behavior for the current feature.
            const Icon = stat.icon
            // Returns the result so the caller or React receives the value or interface this function provides.
            return (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <div key={stat.label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5 shadow-sm">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex items-center justify-between">
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div>
                    {/* Starts the <p> element to organize this part of the interface. */}
                    <p className="text-sm text-[#8E827A]">{stat.label}</p>
                    {/* Starts the <h2> element to organize this part of the interface. */}
                    <h2 className="mt-3 text-3xl font-semibold text-[#323232]">{stat.value}</h2>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="rounded-xl bg-[#F7F3EE] p-3 text-[#595552]"><Icon size={21} /></div>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            // Closes this function call or grouped expression so the surrounding code can continue.
            )
          // Continues the component or data expression so its related values and behavior stay grouped together.
          })}
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 sm:flex-row sm:items-center">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">{currentRole === 'Admin' ? 'All Projects' : 'My Projects'}</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">{filtered.length} projects found</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                {/* Starts the <Search> element to organize this part of the interface. */}
                <Search size={17} className="text-[#8E827A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full bg-transparent text-sm outline-none sm:w-48" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>All</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Planning</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>In Progress</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Completed</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>On Hold</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[950px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Project</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Location</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Project Manager</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Timeline</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Budget</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Status</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filtered.map((project) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={project.id} className="hover:bg-[#F7F3EE]/60">
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{project.name}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">{project.code}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]"><span className="flex items-center gap-1"><MapPin size={14} />{project.location}</span></td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {currentRole === 'Admin' ? (
// Continues the component or data expression so its related values and behavior stay grouped together.
<select
                        /* Supplies the value shown by this form control so the user sees the current data. */
                        value={project.manager}
                        /* Connects the Change event to its handler so the interface can respond to interaction. */
                        onChange={(e) => setProjects(current => current.map(p =>
                          /* Sets the p.id property so this element receives the data or behavior required by this screen. */
                          p.id === project.id ? { ...p, manager: e.target.value } : p
                        /* Continues the component or data expression so its related values and behavior stay grouped together. */
                        ))}
                        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                        className="max-w-[170px] rounded-lg border border-[#C8BCB4] bg-white px-2 py-2 text-sm text-[#595552] outline-none"
                        /* Provides aria-label accessibility information so assistive technology can describe the element. */
                        aria-label={`Reassign manager for ${project.name}`}
                      >
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {managerOptions.map((manager) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <option key={manager} value={manager}>{manager}</option>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                      {/* Closes the <select> element so later content is no longer part of this region. */}
                      </select>

                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      ) : (

                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <span className="text-sm text-[#595552]">{project.manager}</span>

                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      )}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-xs text-[#595552]">{project.startDate} – {project.endDate}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{project.budget}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}>{project.status}</span></td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-end gap-2">
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button onClick={() => { window.location.href = `/app/projects/${project.id}` }} title="View project details" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><span className="text-xs font-semibold">View</span></button>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {currentRole === 'Admin' && <button onClick={() => openEdit(project)} title="Edit project" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>}
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {(currentRole === 'Admin' ||
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          (currentRole === 'Project Manager' &&
                           // Continues the component or data expression so its related values and behavior stay grouped together.
                           (String(project.managerEmail || '').trim().toLowerCase() === currentUserEmail ||
                            // Calls this helper or component so the feature can perform the operation or render the control represented here.
                            String(project.createdByEmail || '').trim().toLowerCase() === currentUserEmail))) &&
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <button onClick={() => deleteProject(project.id)} title="Delete project" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Trash2 size={16} /></button>}
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ))}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-[#8E827A]">{currentRole === 'Admin' ? 'No projects yet. Use Create Project to add your first project.' : 'No projects are assigned to your account yet. Please ask an Administrator to assign you to a project.'}</td></tr>}
              {/* Closes the <tbody> element so later content is no longer part of this region. */}
              </tbody>
            {/* Closes the <table> element so later content is no longer part of this region. */}
            </table>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>

      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {showForm && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          {/* Starts the <form> element to group controls that submit related information. */}
          <form onSubmit={saveProject} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Project' : 'Create New Project'}</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">Enter the project details below.</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Project Name
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter project name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Location
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="text-sm font-medium text-[#595552]">
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label htmlFor="project-manager-name">Project Manager Name</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Gives the element a stable identifier for linking, lookup, or styling. */
                  id="project-manager-name"
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  required
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={form.manager}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setForm({ ...form, manager: e.target.value })}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="Enter manager name"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none read-only:bg-[#F7F3EE]"
                />
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {currentRole === 'Admin' && (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <p className="mt-1 text-xs font-normal text-[#8E827A]">Enter a custom name or select a registered manager below.</p>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {currentRole === 'Admin' && (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value=""
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => {
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      /* Stores the value in selected so later lines can reuse this data or behavior for the current feature. */
                      const selected = registeredUsers.find((user: any) => String(user.email || '') === e.target.value)
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      /* Checks this condition before continuing so the code can choose the correct path for the current state. */
                      if (selected) setForm({ ...form, manager: String(selected.name || ''), managerEmail: String(selected.email || '').toLowerCase() })
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    }}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none"
                  >
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="">Choose a registered Project Manager (optional)</option>
                    // Keeps only items matching this condition so the result contains relevant data.
                    {registeredUsers.filter((user: any) =>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      ['project manager', 'pm'].includes(String(user.role || '').toLowerCase()) &&
                      // Calls this helper or component so the feature can perform the operation or render the control represented here.
                      String(user.status || 'Active').toLowerCase() === 'active'
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    ).map((user: any) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={user.id} value={user.email}>{user.name} — {user.email}</option>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ))}
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label htmlFor="project-manager-email" className="mt-3 block">Project Manager Email (optional)</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Gives the element a stable identifier for linking, lookup, or styling. */
                  id="project-manager-email"
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="email"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={form.managerEmail || ''}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => {
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in value so later lines can reuse this data or behavior for the current feature. */
                    const value = e.target.value
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    /* Stores the value in matched so later lines can reuse this data or behavior for the current feature. */
                    const matched = registeredUsers.find((user: any) =>
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      String(user.email || '').trim().toLowerCase() === value.trim().toLowerCase()
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    /* Closes this function call or grouped expression so the surrounding code can continue. */
                    )
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    setForm({ ...form, managerEmail: value, ...(matched ? { manager: String(matched.name || '') } : {}) })
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  }}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="manager@example.com"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none read-only:bg-[#F7F3EE]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Estimated Budget
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. ₹2.5 Cr" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Start Date
                {/* Starts the <input> element to collect or display a value. */}
                <input required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">End Date
                {/* Starts the <input> element to collect or display a value. */}
                <input required type="date" min={form.startDate || undefined} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552] sm:col-span-2">Project Status
                {/* Starts the <select> element to collect or display a value. */}
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Project['status'] })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>Planning</option><option>In Progress</option><option>Completed</option><option>On Hold</option>
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Create Project'}</button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <form> element so later content is no longer part of this region. */}
          </form>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
