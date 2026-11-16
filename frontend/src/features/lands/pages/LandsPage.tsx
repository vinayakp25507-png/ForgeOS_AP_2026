// Imports useMemo, useState, useEffect from react so this module can reuse that component, helper, or library.
import { useMemo, useState, useEffect } from 'react'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Map, Plus, Search, Pencil, Trash2, X,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MapPin, Ruler, Building2, CheckCircle2
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Land = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the surveyNumber field so the surrounding object or component receives this setting.
  surveyNumber: string
  // Sets the location field so the surrounding object or component receives this setting.
  location: string
  // Sets the owner field so the surrounding object or component receives this setting.
  owner: string
  // Sets the area field so the surrounding object or component receives this setting.
  area: string
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: string
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Available' | 'Allocated' | 'Under Development'
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in initialLands so later lines can reuse this data or behavior for the current feature.
const initialLands: Land[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 1, name: 'Green Valley Land', surveyNumber: 'SV-101', location: 'Gurugram, Haryana', owner: 'ForgeOS Properties', area: '12', unit: 'Acres', status: 'Allocated' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 2, name: 'Skyline Commercial Plot', surveyNumber: 'SV-102', location: 'Delhi, India', owner: 'Skyline Developers', area: '8', unit: 'Acres', status: 'Under Development' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 3, name: 'Riverside Land', surveyNumber: 'SV-103', location: 'Noida, UP', owner: 'ForgeOS Properties', area: '15', unit: 'Acres', status: 'Available' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 4, name: 'Urban Square Plot', surveyNumber: 'SV-104', location: 'Jaipur, Rajasthan', owner: 'Urban Developers', area: '6', unit: 'Acres', status: 'Available' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in emptyForm so later lines can reuse this data or behavior for the current feature.
const emptyForm = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: '', surveyNumber: '', location: '',
  // Sets the owner field so the surrounding object or component receives this setting.
  owner: '', area: '', unit: 'Acres',
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Available' as Land['status'],
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles: Record<Land['status'], string> = {
  // Sets the Available field so the surrounding object or component receives this setting.
  Available: 'bg-[#E8EFE5] text-[#617858]',
  // Sets the Allocated field so the surrounding object or component receives this setting.
  Allocated: 'bg-[#F5EDE1] text-[#9A7950]',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Under Development': 'bg-[#F1EAF6] text-[#806B96]',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines LandsPage so this module can perform its named task when needed.
export function LandsPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [lands, setLands] = useState<Land[]>(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_lands')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return saved ? JSON.parse(saved) : initialLands
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialLands
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem('forgeos_lands', JSON.stringify(lands))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [lands])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [filter, setFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showForm, setShowForm] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editing, setEditing] = useState<Land | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [form, setForm] = useState(emptyForm)

  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  // Caches filteredLands so its calculation is repeated only when its inputs change.
  const filteredLands = useMemo(() => lands.filter((land) => {
    // Stores the value in query so later lines can reuse this data or behavior for the current feature.
    const query = search.toLowerCase()
    // Stores the value in matchesSearch so later lines can reuse this data or behavior for the current feature.
    const matchesSearch = `${land.name} ${land.surveyNumber} ${land.location} ${land.owner}`.toLowerCase().includes(query)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return matchesSearch && (filter === 'All' || land.status === filter)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [lands, search, filter])

  // Stores the value in openAdd so later lines can reuse this data or behavior for the current feature.
  const openAdd = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm(emptyForm)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openEdit so later lines can reuse this data or behavior for the current feature.
  const openEdit = (land: Land) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditing(land)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setForm({
      // Sets the name field so the surrounding object or component receives this setting.
      name: land.name,
      // Sets the surveyNumber field so the surrounding object or component receives this setting.
      surveyNumber: land.surveyNumber,
      // Sets the location field so the surrounding object or component receives this setting.
      location: land.location,
      // Sets the owner field so the surrounding object or component receives this setting.
      owner: land.owner,
      // Sets the area field so the surrounding object or component receives this setting.
      area: land.area,
      // Sets the unit field so the surrounding object or component receives this setting.
      unit: land.unit,
      // Sets the status field so the surrounding object or component receives this setting.
      status: land.status,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in saveLand so later lines can reuse this data or behavior for the current feature.
  const saveLand = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editing) {
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setLands((current) => current.map((land) =>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        land.id === editing.id ? { ...land, ...form } : land
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setLands((current) => [...current, {
        // Sets the id field so the surrounding object or component receives this setting.
        id: Date.now(),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...form,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in deleteLand so later lines can reuse this data or behavior for the current feature.
  const deleteLand = (id: number) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (window.confirm('Are you sure you want to delete this land record?')) {
      // Keeps only items matching this condition so the result contains relevant data.
      setLands((current) => current.filter((land) => land.id !== id))
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Total Lands', value: lands.length, icon: Map },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Available', value: lands.filter((l) => l.status === 'Available').length, icon: CheckCircle2 },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Allocated', value: lands.filter((l) => l.status === 'Allocated').length, icon: Building2 },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Under Development', value: lands.filter((l) => l.status === 'Under Development').length, icon: Ruler },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/lands">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Land Management</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Land Management</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Manage land records, ownership, locations and allocation status.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            {/* Starts the <Plus> element to organize this part of the interface. */}
            <Plus size={17} /> Add Land
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
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 sm:flex-row sm:items-center">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">Land Records</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">{filteredLands.length} land records found</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                {/* Starts the <Search> element to organize this part of the interface. */}
                <Search size={17} className="text-[#8E827A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search land..." className="w-full bg-transparent text-sm outline-none sm:w-48" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>All</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Available</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Allocated</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Under Development</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[900px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Land Details</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Location</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Ownership</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Area</th>
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
                {filteredLands.map((land) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={land.id} className="hover:bg-[#F7F3EE]/60">
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{land.name}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">{land.surveyNumber}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]"><span className="flex items-center gap-1"><MapPin size={14} />{land.location}</span></td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{land.owner}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{land.area} {land.unit}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[land.status]}`}>{land.status}</span></td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-end gap-2">
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button onClick={() => openEdit(land)} title="Edit land" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button onClick={() => deleteLand(land.id)} title="Delete land" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Trash2 size={16} /></button>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ))}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {filteredLands.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">No land records found.</td></tr>}
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
          <form onSubmit={saveLand} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Land Details' : 'Add New Land'}</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">Enter land information below.</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Land Name
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter land name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Survey / Plot Number
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.surveyNumber} onChange={(e) => setForm({ ...form, surveyNumber: e.target.value })} placeholder="e.g. SV-105" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Location
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Owner Name
                {/* Starts the <input> element to collect or display a value. */}
                <input required value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Enter owner name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-[1fr_120px] gap-3">
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Land Area
                  {/* Starts the <input> element to collect or display a value. */}
                  <input required type="number" min="0.01" step="0.01" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Enter area" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="text-sm font-medium text-[#595552]">Unit
                  {/* Starts the <select> element to collect or display a value. */}
                  <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-3 font-normal outline-none">
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option>Acres</option><option>Sq. Ft.</option><option>Sq. Yards</option><option>Hectares</option>
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                {/* Closes the <label> element so later content is no longer part of this region. */}
                </label>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-sm font-medium text-[#595552]">Land Status
                {/* Starts the <select> element to collect or display a value. */}
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Land['status'] })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>Available</option><option>Allocated</option><option>Under Development</option>
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
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Add Land'}</button>
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
