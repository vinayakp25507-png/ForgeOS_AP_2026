// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ClipboardCheck, Plus, Search, Pencil, Trash2, X, IndianRupee, TrendingUp,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports type  Material, MaterialPlan from ../types/material so this module can reuse that component, helper, or library.
import type { Material, MaterialPlan } from '../types/material'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredMaterials,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredPlans,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getProjectProgress,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  setProjectProgress,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  removePlan,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  upsertPlan,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../data/materialStore'
// Imports formatINR, formatQty from ../../stock/data/stockStore so this module can reuse that component, helper, or library.
import { formatINR, formatQty } from '../../stock/data/stockStore'

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
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold'
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in emptyForm so later lines can reuse this data or behavior for the current feature.
const emptyForm = {
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: '',
  // Sets the plannedQty field so the surrounding object or component receives this setting.
  plannedQty: '',
  // Sets the plannedRate field so the surrounding object or component receives this setting.
  plannedRate: '',
  // Sets the lowStockThreshold field so the surrounding object or component receives this setting.
  lowStockThreshold: '',
  // Sets the wastageThreshold field so the surrounding object or component receives this setting.
  wastageThreshold: '',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines MaterialPlanningPage so this module can perform its named task when needed.
export function MaterialPlanningPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedProjectId, setSelectedProjectId] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materials] = useState<Material[]>(() => getStoredMaterials())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [plans, setPlans] = useState<MaterialPlan[]>(() => getStoredPlans())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [progress, setProgress] = useState(0)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [progressInput, setProgressInput] = useState('0')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showForm, setShowForm] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editing, setEditing] = useState<MaterialPlan | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [form, setForm] = useState(emptyForm)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [formError, setFormError] = useState('')

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_projects')
      // Stores the value in parsed so later lines can reuse this data or behavior for the current feature.
      const parsed: Project[] = saved ? JSON.parse(saved) : []
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setProjects(parsed)
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (parsed.length > 0 && parsed.some((p) => String(p.id) === selectedProjectId) === false) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        setSelectedProjectId(String(parsed[0].id))
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setProjects([])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [])

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedProjectId) return
    // Stores the value in value so later lines can reuse this data or behavior for the current feature.
    const value = getProjectProgress(selectedProjectId)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setProgress(value)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setProgressInput(String(value))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [selectedProjectId])

  // Stores the value in selectedProject so later lines can reuse this data or behavior for the current feature.
  const selectedProject = projects.find((p) => String(p.id) === selectedProjectId)

  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  // Caches projectPlans so its calculation is repeated only when its inputs change.
  const projectPlans = useMemo(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    () => plans
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((plan) => plan.projectId === selectedProjectId)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .sort((a, b) => {
        // Stores the value in ma so later lines can reuse this data or behavior for the current feature.
        const ma = materials.find((m) => m.id === a.materialId)?.name ?? ''
        // Stores the value in mb so later lines can reuse this data or behavior for the current feature.
        const mb = materials.find((m) => m.id === b.materialId)?.name ?? ''
        // Returns the result so the caller or React receives the value or interface this function provides.
        return ma.localeCompare(mb)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [plans, selectedProjectId, materials]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  // Caches filteredPlans so its calculation is repeated only when its inputs change.
  const filteredPlans = useMemo(() => projectPlans.filter((plan) => {
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = materials.find((m) => m.id === plan.materialId)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return `${material?.name ?? plan.materialId}`.toLowerCase().includes(search.toLowerCase())
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [projectPlans, materials, search])

  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  // Caches plannedValue so its calculation is repeated only when its inputs change.
  const plannedValue = useMemo(() => projectPlans.reduce((total, plan) => (
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    total + plan.plannedQty * (plan.plannedRate ?? 0)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ), 0), [projectPlans])

  // Stores the value in saveProgress so later lines can reuse this data or behavior for the current feature.
  const saveProgress = () => {
    // Stores the value in value so later lines can reuse this data or behavior for the current feature.
    const value = Number(progressInput)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (Number.isNaN(value) || value < 0 || value > 100) return
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setProjectProgress(selectedProjectId, value)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setProgress(value)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openAdd so later lines can reuse this data or behavior for the current feature.
  const openAdd = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({ ...emptyForm, materialId: '' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openEdit so later lines can reuse this data or behavior for the current feature.
  const openEdit = (plan: MaterialPlan) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(plan)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({
      // Sets the materialId field so the surrounding object or component receives this setting.
      materialId: plan.materialId,
      // Sets the plannedQty field so the surrounding object or component receives this setting.
      plannedQty: String(plan.plannedQty),
      // Sets the plannedRate field so the surrounding object or component receives this setting.
      plannedRate: plan.plannedRate != null ? String(plan.plannedRate) : '',
      // Sets the lowStockThreshold field so the surrounding object or component receives this setting.
      lowStockThreshold: plan.lowStockThreshold != null ? String(plan.lowStockThreshold) : '',
      // Sets the wastageThreshold field so the surrounding object or component receives this setting.
      wastageThreshold: plan.wastageThreshold != null ? String(plan.wastageThreshold) : '',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in savePlan so later lines can reuse this data or behavior for the current feature.
  const savePlan = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')

    // Stores the value in plannedQty so later lines can reuse this data or behavior for the current feature.
    const plannedQty = Number(form.plannedQty)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!Number.isFinite(plannedQty) || plannedQty <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFormError('Planned quantity must be greater than 0.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!editing && projectPlans.some((p) => p.materialId === form.materialId)) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFormError('This material is already planned for the project. Edit the existing row instead.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
    const saved = upsertPlan(selectedProjectId, form.materialId, {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      plannedQty,
      // Sets the plannedRate field so the surrounding object or component receives this setting.
      plannedRate: form.plannedRate.trim() ? Number(form.plannedRate) : undefined,
      // Sets the lowStockThreshold field so the surrounding object or component receives this setting.
      lowStockThreshold: form.lowStockThreshold.trim() ? Number(form.lowStockThreshold) : undefined,
      // Sets the wastageThreshold field so the surrounding object or component receives this setting.
      wastageThreshold: form.wastageThreshold.trim() ? Number(form.wastageThreshold) : undefined,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPlans(getStoredPlans())
    // Continues the component or data expression so its related values and behavior stay grouped together.
    void saved
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in deletePlan so later lines can reuse this data or behavior for the current feature.
  const deletePlan = (plan: MaterialPlan) => {
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = materials.find((m) => m.id === plan.materialId)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (window.confirm(`Remove "${material?.name ?? plan.materialId}" from this project's plan?`)) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      removePlan(plan.id)
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setPlans(getStoredPlans())
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Materials Planned', value: projectPlans.length, icon: ClipboardCheck },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Planned Value', value: plannedValue > 0 ? formatINR(plannedValue) : '—', icon: IndianRupee },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Site Progress', value: `${progress}%`, icon: TrendingUp },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/material-planning">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Materials / Planning</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Project Material Planning</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Plan material quantities, rates and thresholds per project. Plans drive stock and wastage tracking.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Starts the <select> element to collect or display a value. */}
            <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 text-sm text-[#595552] outline-none">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {projects.length === 0 && <option value="">No projects found</option>}
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {projects.map((project) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={project.id} value={String(project.id)}>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {project.code} — {project.name}
                {/* Closes the <option> element so later content is no longer part of this region. */}
                </option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button onClick={openAdd} disabled={!selectedProjectId} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E] disabled:opacity-50">
              {/* Starts the <Plus> element to organize this part of the interface. */}
              <Plus size={17} /> Plan Material
            {/* Closes the <button> element so later content is no longer part of this region. */}
            </button>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {selectedProject && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#C8BCB4]/70 bg-[#E8DCD4] p-5 sm:flex-row sm:items-center">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">{selectedProject.code} · {selectedProject.name}</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#595552]">{selectedProject.location} · PM: {selectedProject.manager} · Status: {selectedProject.status}</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-3 rounded-xl bg-white p-3">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Site progress %
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="number"
                  /* Sets the min property so this element receives the data or behavior required by this screen. */
                  min="0"
                  /* Sets the max property so this element receives the data or behavior required by this screen. */
                  max="100"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={progressInput}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setProgressInput(e.target.value)}
                  /* Connects the Blur event to its handler so the interface can respond to interaction. */
                  onBlur={saveProgress}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="ml-3 w-20 rounded-lg border border-[#C8BCB4] px-3 py-2 font-normal outline-none"
                />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="text-xs text-[#8E827A]">Used as the wastage baseline<br />(expected = planned × progress%)</span>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <section> element so later content is no longer part of this region. */}
          </section>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                    <h2 className="mt-3 text-2xl font-semibold text-[#323232]">{stat.value}</h2>
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
              <h2 className="font-semibold text-[#323232]">Planned Materials</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">{filteredPlans.length} materials planned for this project</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
              {/* Starts the <Search> element to organize this part of the interface. */}
              <Search size={17} className="text-[#8E827A]" />
              {/* Starts the <input> element to collect or display a value. */}
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search planned material..." className="w-full bg-transparent text-sm outline-none sm:w-52" />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[980px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Material</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Planned Qty</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Planned Rate</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Planned Value</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Low-Stock Alert At</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Wastage Limit</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filteredPlans.map((plan) => {
                  // Stores the value in material so later lines can reuse this data or behavior for the current feature.
                  const material = materials.find((m) => m.id === plan.materialId)
                  // Returns the result so the caller or React receives the value or interface this function provides.
                  return (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <tr key={plan.id} className="hover:bg-[#F7F3EE]/60">
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        {/* Starts the <p> element to organize this part of the interface. */}
                        <p className="text-sm font-medium text-[#323232]">{material?.name ?? plan.materialId}</p>
                        {/* Starts the <p> element to organize this part of the interface. */}
                        <p className="mt-1 text-xs text-[#8E827A]">{material?.category ?? ''}</p>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{formatQty(plan.plannedQty)} {material?.unit ?? ''}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{plan.plannedRate != null ? formatINR(plan.plannedRate) : '—'}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{plan.plannedRate != null ? formatINR(plan.plannedQty * plan.plannedRate) : '—'}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {plan.lowStockThreshold != null ? `${formatQty(plan.lowStockThreshold)} ${material?.unit ?? ''}` : '—'}
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="rounded-full bg-[#F5EDE1] px-2.5 py-1 text-xs font-medium text-[#9A7950]">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {plan.wastageThreshold != null ? `${plan.wastageThreshold}%` : '10% default'}
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        {/* Starts the <div> element to organize this part of the interface. */}
                        <div className="flex justify-end gap-2">
                          {/* Starts the <button> element to provide an action the user can activate. */}
                          <button onClick={() => openEdit(plan)} title="Edit plan" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                          {/* Starts the <button> element to provide an action the user can activate. */}
                          <button onClick={() => deletePlan(plan)} title="Remove plan" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Trash2 size={16} /></button>
                        {/* Closes the <div> element so later content is no longer part of this region. */}
                        </div>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                    {/* Closes the <tr> element so later content is no longer part of this region. */}
                    </tr>
                  // Closes this function call or grouped expression so the surrounding code can continue.
                  )
                // Continues the component or data expression so its related values and behavior stay grouped together.
                })}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {filteredPlans.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-[#8E827A]">No materials planned for this project yet.</td></tr>}
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
          <form onSubmit={savePlan} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Planned Material' : 'Plan a Material'}</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">{selectedProject?.code} — {selectedProject?.name}</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            // Continues the component or data expression so its related values and behavior stay grouped together.
            {formError && (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <p className="rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]">{formError}</p>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552] sm:col-span-2">Material
                {/* Starts the <select> element to collect or display a value. */}
                <select
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  required
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={form.materialId}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setForm({ ...form, materialId: e.target.value })}
                  /* Controls whether the element can be used, preventing actions that are not currently available. */
                  disabled={editing != null}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none disabled:bg-[#F7F3EE]"
                >
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="" disabled>Select material</option>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {materials
                    // Keeps only items matching this condition so the result contains relevant data.
                    .filter((m) => m.status === 'Active')
                    // Keeps only items matching this condition so the result contains relevant data.
                    .filter((m) => editing != null || !projectPlans.some((p) => p.materialId === m.id))
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    .map((m) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ))}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Planned Quantity
                {/* Starts the <input> element to collect or display a value. */}
                <input required type="number" min="0.01" step="0.01" value={form.plannedQty} onChange={(e) => setForm({ ...form, plannedQty: e.target.value })} placeholder="e.g. 8000" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Planned Rate (₹ per unit, optional)
                {/* Starts the <input> element to collect or display a value. */}
                <input type="number" min="0" step="0.01" value={form.plannedRate} onChange={(e) => setForm({ ...form, plannedRate: e.target.value })} placeholder="e.g. 395" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Low-Stock Alert At (qty, optional)
                {/* Starts the <input> element to collect or display a value. */}
                <input type="number" min="0" step="0.01" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: e.target.value })} placeholder="e.g. 800" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Wastage Limit (%, optional)
                {/* Starts the <input> element to collect or display a value. */}
                <input type="number" min="0" max="100" step="0.5" value={form.wastageThreshold} onChange={(e) => setForm({ ...form, wastageThreshold: e.target.value })} placeholder="Default 10%" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Add to Plan'}</button>
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
