// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Boxes, Plus, Search, Pencil, X, CheckCircle2, Ban, PackageX,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports isAdmin from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { isAdmin } from '../../authentication/utils/permissions'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MATERIAL_CATEGORIES,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MATERIAL_UNITS,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../types/material'
// Imports type  Material, MaterialUnit from ../types/material so this module can reuse that component, helper, or library.
import type { Material, MaterialUnit } from '../types/material'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  addMaterial,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredMaterials,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  saveStoredMaterials,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  setMaterialStatus,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateMaterial,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../data/materialStore'

// Stores the value in emptyForm so later lines can reuse this data or behavior for the current feature.
const emptyForm = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: '',
  // Sets the category field so the surrounding object or component receives this setting.
  category: MATERIAL_CATEGORIES[0],
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: 'Bag' as MaterialUnit,
  // Sets the referenceRate field so the surrounding object or component receives this setting.
  referenceRate: '',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines MaterialsPage so this module can perform its named task when needed.
export function MaterialsPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materials, setMaterials] = useState<Material[]>(() => getStoredMaterials())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [categoryFilter, setCategoryFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [statusFilter, setStatusFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showForm, setShowForm] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editing, setEditing] = useState<Material | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [form, setForm] = useState(emptyForm)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [formError, setFormError] = useState('')

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    saveStoredMaterials(materials)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [materials])

  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  // Caches filteredMaterials so its calculation is repeated only when its inputs change.
  const filteredMaterials = useMemo(() => materials.filter((material) => {
    // Stores the value in query so later lines can reuse this data or behavior for the current feature.
    const query = search.toLowerCase()
    // Stores the value in matchesSearch so later lines can reuse this data or behavior for the current feature.
    const matchesSearch = `${material.name} ${material.category}`.toLowerCase().includes(query)
    // Stores the value in matchesCategory so later lines can reuse this data or behavior for the current feature.
    const matchesCategory = categoryFilter === 'All' || material.category === categoryFilter
    // Stores the value in matchesStatus so later lines can reuse this data or behavior for the current feature.
    const matchesStatus = statusFilter === 'All' || material.status === statusFilter
    // Returns the result so the caller or React receives the value or interface this function provides.
    return matchesSearch && matchesCategory && matchesStatus
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [materials, search, categoryFilter, statusFilter])

  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  // Caches categoriesInUse so its calculation is repeated only when its inputs change.
  const categoriesInUse = useMemo(
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    () => new Set(materials.map((m) => m.category)).size,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [materials]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Stores the value in openAdd so later lines can reuse this data or behavior for the current feature.
  const openAdd = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm(emptyForm)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openEdit so later lines can reuse this data or behavior for the current feature.
  const openEdit = (material: Material) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(material)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({
      // Sets the name field so the surrounding object or component receives this setting.
      name: material.name,
      // Sets the category field so the surrounding object or component receives this setting.
      category: material.category,
      // Sets the unit field so the surrounding object or component receives this setting.
      unit: material.unit,
      // Sets the referenceRate field so the surrounding object or component receives this setting.
      referenceRate: material.referenceRate != null ? String(material.referenceRate) : '',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in saveMaterial so later lines can reuse this data or behavior for the current feature.
  const saveMaterial = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setFormError('')

    // Stores the value in payload so later lines can reuse this data or behavior for the current feature.
    const payload = {
      // Sets the name field so the surrounding object or component receives this setting.
      name: form.name,
      // Sets the category field so the surrounding object or component receives this setting.
      category: form.category,
      // Sets the unit field so the surrounding object or component receives this setting.
      unit: form.unit,
      // Sets the referenceRate field so the surrounding object or component receives this setting.
      referenceRate: form.referenceRate.trim() ? Number(form.referenceRate) : undefined,
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editing) {
      // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
      const updated = updateMaterial(editing.id, payload)
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (!updated) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        setFormError('A material with this name already exists. Names must be unique.')
        // Returns the result so the caller or React receives the value or interface this function provides.
        return
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setMaterials((current) => current.map((m) => (m.id === updated.id ? updated : m)))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Stores the value in created so later lines can reuse this data or behavior for the current feature.
      const created = addMaterial(payload)
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (!created) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        setFormError('A material with this name already exists. Names must be unique.')
        // Returns the result so the caller or React receives the value or interface this function provides.
        return
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setMaterials((current) => [created, ...current])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in toggleStatus so later lines can reuse this data or behavior for the current feature.
  const toggleStatus = (material: Material) => {
    // Stores the value in nextStatus so later lines can reuse this data or behavior for the current feature.
    const nextStatus = material.status === 'Active' ? 'Inactive' : 'Active'
    // Stores the value in action so later lines can reuse this data or behavior for the current feature.
    const action = nextStatus === 'Inactive' ? 'deactivate' : 'reactivate'
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (window.confirm(`Are you sure you want to ${action} "${material.name}"?`)) {
      // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
      const updated = setMaterialStatus(material.id, nextStatus)
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (updated) {
        // Transforms each collection item so the corresponding values or interface elements can be produced.
        setMaterials((current) => current.map((m) => (m.id === updated.id ? updated : m)))
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Total Materials', value: materials.length, icon: Boxes },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Active', value: materials.filter((m) => m.status === 'Active').length, icon: CheckCircle2 },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Inactive', value: materials.filter((m) => m.status === 'Inactive').length, icon: PackageX },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Categories', value: categoriesInUse, icon: Boxes },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/materials">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Materials</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Materials Master</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Central catalogue of construction materials with units and reference rates.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            {/* Starts the <Plus> element to organize this part of the interface. */}
            <Plus size={17} /> Add Material
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
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
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 lg:flex-row lg:items-center">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">Material Catalogue</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">{filteredMaterials.length} materials found</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                {/* Starts the <Search> element to organize this part of the interface. */}
                <Search size={17} className="text-[#8E827A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search material..." className="w-full bg-transparent text-sm outline-none sm:w-44" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>All</option>
                // Transforms each collection item so the corresponding values or interface elements can be produced.
                {MATERIAL_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>All</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Active</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Inactive</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[820px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Material</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Category</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Unit</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Reference Rate</th>
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
                {filteredMaterials.map((material) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={material.id} className={`hover:bg-[#F7F3EE]/60 ${material.status === 'Inactive' ? 'opacity-60' : ''}`}>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{material.name}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">{material.id}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{material.category}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{material.unit}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {material.referenceRate != null ? `₹${material.referenceRate.toLocaleString('en-IN')} / ${material.unit}` : '—'}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${material.status === 'Active' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F8ECEA] text-[#9B625A]'}`}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {material.status}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-end gap-2">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {isAdmin() ? (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <>
                            {/* Starts the <button> element to provide an action the user can activate. */}
                            <button onClick={() => openEdit(material)} title="Edit material" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                            {/* Starts the <button> element to provide an action the user can activate. */}
                            <button onClick={() => toggleStatus(material)} title={material.status === 'Active' ? 'Deactivate material' : 'Reactivate material'} className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]">
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              {material.status === 'Active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
                            {/* Closes the <button> element so later content is no longer part of this region. */}
                            </button>
                          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                          </>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        ) : (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <span className="text-xs text-[#8E827A]">View only</span>
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
                {filteredMaterials.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">No materials found.</td></tr>}
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
          <form onSubmit={saveMaterial} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Material' : 'Add New Material'}</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">Materials are shared across all projects.</p>
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
              <label className="text-sm font-medium text-[#595552]">Material Name
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. OPC 53 Grade Cement" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Category
                {/* Starts the <select> element to collect or display a value. */}
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {MATERIAL_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Unit
                {/* Starts the <select> element to collect or display a value. */}
                <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value as MaterialUnit })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {MATERIAL_UNITS.map((unit) => <option key={unit}>{unit}</option>)}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Reference Rate (₹ per unit, optional)
                {/* Starts the <input> element to collect or display a value. */}
                <input type="number" min="0" step="0.01" value={form.referenceRate} onChange={(e) => setForm({ ...form, referenceRate: e.target.value })} placeholder="e.g. 395" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Add Material'}</button>
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
