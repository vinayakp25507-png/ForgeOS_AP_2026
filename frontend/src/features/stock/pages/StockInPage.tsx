// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Imports ArrowDownToLine, X, Ban from lucide-react so this module can reuse that component, helper, or library.
import { ArrowDownToLine, X, Ban } from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports getCurrentUser, isAdmin from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { getCurrentUser, isAdmin } from '../../authentication/utils/permissions'
// Imports type  Material from ../../materials/types/material so this module can reuse that component, helper, or library.
import type { Material } from '../../materials/types/material'
// Imports getStoredMaterials from ../../materials/data/materialStore so this module can reuse that component, helper, or library.
import { getStoredMaterials } from '../../materials/data/materialStore'
// Imports getStoredVendors from ../../vendors/data/vendorStore so this module can reuse that component, helper, or library.
import { getStoredVendors } from '../../vendors/data/vendorStore'
// Imports type  StockTransaction from ../types/stock so this module can reuse that component, helper, or library.
import type { StockTransaction } from '../types/stock'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  addStockIn,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatDate,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatINR,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatQty,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredStockTransactions,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  todayISO,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  voidStockTransaction,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../data/stockStore'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Project = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the code field so the surrounding object or component receives this setting.
  code: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold'
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in emptyForm so later lines can reuse this data or behavior for the current feature.
const emptyForm = {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: '',
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: '',
  // Sets the quantity field so the surrounding object or component receives this setting.
  quantity: '',
  // Sets the date field so the surrounding object or component receives this setting.
  date: '',
  // Sets the vendorName field so the surrounding object or component receives this setting.
  vendorName: '',
  // Sets the challanNumber field so the surrounding object or component receives this setting.
  challanNumber: '',
  // Sets the rate field so the surrounding object or component receives this setting.
  rate: '',
  // Sets the billReference field so the surrounding object or component receives this setting.
  billReference: '',
  // Sets the notes field so the surrounding object or component receives this setting.
  notes: '',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines StockInPage so this module can perform its named task when needed.
export function StockInPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materials] = useState<Material[]>(() => getStoredMaterials())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [vendors, setVendors] = useState<string[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [transactions, setTransactions] = useState<StockTransaction[]>(() => getStoredStockTransactions())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [form, setForm] = useState(emptyForm)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [voidTarget, setVoidTarget] = useState<StockTransaction | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [voidReason, setVoidReason] = useState('')

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_projects')
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setProjects(saved ? JSON.parse(saved) : [])
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setProjects([])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    setVendors(getStoredVendors().map((vendor) => vendor.name))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [])

  // Stores the value in selectedMaterial so later lines can reuse this data or behavior for the current feature.
  const selectedMaterial = materials.find((m) => m.id === form.materialId)

  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  // Caches recentIn so its calculation is repeated only when its inputs change.
  const recentIn = useMemo(
    // Keeps only items matching this condition so the result contains relevant data.
    () => transactions.filter((tx) => tx.type === 'IN').slice(0, 10),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [transactions]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Stores the value in submitStockIn so later lines can reuse this data or behavior for the current feature.
  const submitStockIn = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFeedback(null)

    // Stores the value in project so later lines can reuse this data or behavior for the current feature.
    const project = projects.find((p) => String(p.id) === form.projectId)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!project || !selectedMaterial) return

    // Stores the value in quantity so later lines can reuse this data or behavior for the current feature.
    const quantity = Number(form.quantity)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!Number.isFinite(quantity) || quantity <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFeedback({ type: 'error', message: 'Quantity must be greater than 0.' })
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!form.date) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFeedback({ type: 'error', message: 'Please pick a delivery date.' })
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (form.date > todayISO()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFeedback({ type: 'error', message: 'Date cannot be in the future.' })
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in user so later lines can reuse this data or behavior for the current feature.
    const user = getCurrentUser()
    // Stores the value in recordedBy so later lines can reuse this data or behavior for the current feature.
    const recordedBy = `${user?.name ?? 'User'} (${isAdmin() ? 'Admin' : 'PM'})`

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    addStockIn({
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: String(project.id),
      // Sets the projectCode field so the surrounding object or component receives this setting.
      projectCode: project.code,
      // Sets the projectName field so the surrounding object or component receives this setting.
      projectName: project.name,
      // Sets the materialId field so the surrounding object or component receives this setting.
      materialId: selectedMaterial.id,
      // Sets the materialName field so the surrounding object or component receives this setting.
      materialName: selectedMaterial.name,
      // Sets the materialUnit field so the surrounding object or component receives this setting.
      materialUnit: selectedMaterial.unit,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      quantity,
      // Sets the date field so the surrounding object or component receives this setting.
      date: form.date,
      // Sets the vendorName field so the surrounding object or component receives this setting.
      vendorName: form.vendorName || undefined,
      // Sets the challanNumber field so the surrounding object or component receives this setting.
      challanNumber: form.challanNumber || undefined,
      // Sets the rate field so the surrounding object or component receives this setting.
      rate: form.rate.trim() ? Number(form.rate) : undefined,
      // Sets the billReference field so the surrounding object or component receives this setting.
      billReference: form.billReference || undefined,
      // Sets the notes field so the surrounding object or component receives this setting.
      notes: form.notes || undefined,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      recordedBy,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setTransactions(getStoredStockTransactions())
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({ ...emptyForm, projectId: form.projectId })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFeedback({
      // Sets the type field so the surrounding object or component receives this setting.
      type: 'success',
      // Sets the message field so the surrounding object or component receives this setting.
      message: `Recorded Stock IN of ${formatQty(quantity)} ${selectedMaterial.unit} ${selectedMaterial.name} for ${project.code}.`,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in confirmVoid so later lines can reuse this data or behavior for the current feature.
  const confirmVoid = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!voidTarget) return
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = voidStockTransaction(voidTarget.id, voidReason, isAdmin())
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (result.ok) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setTransactions(getStoredStockTransactions())
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setVoidTarget(null)
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setVoidReason('')
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFeedback({ type: 'success', message: `Entry ${voidTarget.id} has been voided.` })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setVoidTarget(null)
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setVoidReason('')
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setFeedback({ type: 'error', message: result.error })
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/stock-in">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Stock / IN</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Record Stock IN</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Log material deliveries into a project site with vendor and challan details.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <span> element to organize this part of the interface. */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFE5] px-4 py-2 text-sm font-medium text-[#617858]">
            {/* Starts the <ArrowDownToLine> element to organize this part of the interface. */}
            <ArrowDownToLine size={16} /> Stock received
          {/* Closes the <span> element so later content is no longer part of this region. */}
          </span>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {feedback && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <p className={`rounded-xl px-4 py-3 text-sm ${feedback.type === 'success' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F8ECEA] text-[#9B625A]'}`}>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            {feedback.message}
          {/* Closes the <p> element so later content is no longer part of this region. */}
          </p>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}

        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.35fr]">
          {/* Starts the <section> element to group related content into a meaningful region. */}
          <section className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-6 shadow-sm">
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold text-[#323232]">Delivery Details</h2>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-1 text-xs text-[#8E827A]">Fields marked optional can be left blank.</p>
            {/* Starts the <form> element to group controls that submit related information. */}
            <form onSubmit={submitStockIn} className="mt-5 space-y-4">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-sm font-medium text-[#595552]">Project
                {/* Starts the <select> element to collect or display a value. */}
                <select required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="" disabled>Select project</option>
                  {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                  {projects.map((project) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <option key={project.id} value={String(project.id)}>{project.code} — {project.name}</option>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>

              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-sm font-medium text-[#595552]">Material
                {/* Starts the <select> element to collect or display a value. */}
                <select required value={form.materialId} onChange={(e) => setForm({ ...form, materialId: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="" disabled>Select material</option>
                  {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                  {materials.filter((m) => m.status === 'Active').map((material) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <option key={material.id} value={material.id}>{material.name} ({material.unit})</option>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-4">
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Quantity {selectedMaterial ? `(${selectedMaterial.unit})` : ''}
                  {/* Starts the <input> element to collect or display a value. */}
                  <input required type="number" min="0.01" step="0.01" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Delivery Date
                  {/* Starts the <input> element to collect or display a value. */}
                  <input required type="date" max={todayISO()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-sm font-medium text-[#595552]">Vendor (optional)
                {/* Starts the <select> element to collect or display a value. */}
                <select value={form.vendorName} onChange={(e) => setForm({ ...form, vendorName: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="">— Not linked —</option>
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {vendors.map((name) => <option key={name}>{name}</option>)}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-4">
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Challan No. (optional)
                  {/* Starts the <input> element to collect or display a value. */}
                  <input value={form.challanNumber} onChange={(e) => setForm({ ...form, challanNumber: e.target.value })} placeholder="e.g. CH-8821" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Rate ₹/unit (optional)
                  {/* Starts the <input> element to collect or display a value. */}
                  <input type="number" min="0" step="0.01" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="e.g. 395" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-sm font-medium text-[#595552]">Linked Bill No. (optional)
                {/* Starts the <input> element to collect or display a value. */}
                <input value={form.billReference} onChange={(e) => setForm({ ...form, billReference: e.target.value })} placeholder="e.g. BILL-001" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>

              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-sm font-medium text-[#595552]">Notes (optional)
                {/* Starts the <textarea> element to collect or display a value. */}
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="Delivery remarks" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex justify-end gap-3 pt-2">
                {/* Starts the <button> element to provide an action the user can activate. */}
                <button type="button" onClick={() => setForm({ ...emptyForm })} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Reset</button>
                {/* Starts the <button> element to provide an action the user can activate. */}
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1E1E1E]">
                  {/* Starts the <ArrowDownToLine> element to organize this part of the interface. */}
                  <ArrowDownToLine size={16} /> Record Stock IN
                {/* Closes the <button> element so later content is no longer part of this region. */}
                </button>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <form> element so later content is no longer part of this region. */}
            </form>
          {/* Closes the <section> element so later content is no longer part of this region. */}
          </section>

          {/* Starts the <section> element to group related content into a meaningful region. */}
          <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="border-b border-[#E8DCD4] p-5">
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">Recent Stock IN</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">Latest {recentIn.length} deliveries across projects</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="overflow-x-auto">
              {/* Starts the <table> element to organize this part of the interface. */}
              <table className="w-full min-w-[760px] text-left">
                {/* Starts the <thead> element to organize this part of the interface. */}
                <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                  {/* Starts the <tr> element to organize this part of the interface. */}
                  <tr>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Date</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Project</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Material</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Qty</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Vendor / Challan</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 font-medium">Value</th>
                    {/* Starts the <th> element to organize this part of the interface. */}
                    <th className="px-5 py-4 text-right font-medium">Status</th>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                {/* Closes the <thead> element so later content is no longer part of this region. */}
                </thead>
                {/* Starts the <tbody> element to organize this part of the interface. */}
                <tbody className="divide-y divide-[#E8DCD4]">
                  {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                  {recentIn.map((tx) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <tr key={tx.id} className={`hover:bg-[#F7F3EE]/60 ${tx.voided ? 'opacity-50' : ''}`}>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{formatDate(tx.date)}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.projectCode}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm font-medium text-[#323232] line-through-offset-2">
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className={tx.voided ? 'line-through' : ''}>{tx.materialName}</span>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">+{formatQty(tx.quantity)} {tx.materialUnit}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.vendorName ?? '—'}{tx.challanNumber ? ` · ${tx.challanNumber}` : ''}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.rate != null ? formatINR(tx.quantity * tx.rate) : '—'}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        {/* Starts the <div> element to organize this part of the interface. */}
                        <div className="flex items-center justify-end gap-2">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {tx.voided ? (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <span className="rounded-full bg-[#F8ECEA] px-2.5 py-1 text-xs font-medium text-[#9B625A]" title={tx.voidReason}>Void</span>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          ) : (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="rounded-full bg-[#E8EFE5] px-2.5 py-1 text-xs font-medium text-[#617858]">Active</span>
                              {/* Starts the <button> element to provide an action the user can activate. */}
                              <button onClick={() => { setVoidTarget(tx); setVoidReason('') }} title="Void entry" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Ban size={15} /></button>
                            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                            </>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          )}
                        {/* Closes the <div> element so later content is no longer part of this region. */}
                        </div>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                    {/* Closes the <tr> element so later content is no longer part of this region. */}
                    </tr>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {recentIn.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-[#8E827A]">No stock IN entries yet.</td></tr>}
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
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>

      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {voidTarget && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          {/* Starts the <form> element to group controls that submit related information. */}
          <form onSubmit={confirmVoid} className="my-6 w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">Void Stock IN Entry</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">{voidTarget.id} · {formatQty(voidTarget.quantity)} {voidTarget.materialUnit} {voidTarget.materialName} · {voidTarget.projectCode}</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setVoidTarget(null)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="rounded-xl bg-[#F5EDE1] px-4 py-3 text-xs text-[#9A7950]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              Voiding keeps the row for audit but removes it from stock balances. Admin can void anytime; PM entries only within 48 hours.
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
            {/* Starts the <label> element to name a form control for users and assistive technology. */}
            <label className="block text-sm font-medium text-[#595552]">Reason (required)
              {/* Starts the <input> element to collect or display a value. */}
              <input required value={voidReason} onChange={(e) => setVoidReason(e.target.value)} placeholder="e.g. Duplicate challan entry" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
            {/* Closes the <label> element so later content is no longer part of this region. */}
            </label>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setVoidTarget(null)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#9B625A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#84504A]"><Ban size={15} /> Void Entry</button>
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
