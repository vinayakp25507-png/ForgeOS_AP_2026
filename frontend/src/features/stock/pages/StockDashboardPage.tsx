// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Imports PackageSearch, AlertTriangle, IndianRupee, CheckCircle2 from lucide-react so this module can reuse that component, helper, or library.
import { PackageSearch, AlertTriangle, IndianRupee, CheckCircle2 } from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports type  Material from ../../materials/types/material so this module can reuse that component, helper, or library.
import type { Material } from '../../materials/types/material'
// Imports getStoredMaterials from ../../materials/data/materialStore so this module can reuse that component, helper, or library.
import { getStoredMaterials } from '../../materials/data/materialStore'
// Imports computeBalances, formatINR, formatQty from ../data/stockStore so this module can reuse that component, helper, or library.
import { computeBalances, formatINR, formatQty } from '../data/stockStore'

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

// Defines StockDashboardPage so this module can perform its named task when needed.
export function StockDashboardPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materials, setMaterials] = useState<Material[]>(() => getStoredMaterials())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projectFilter, setProjectFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [refreshKey, setRefreshKey] = useState(0)

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
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [])

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setMaterials(getStoredMaterials())
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [refreshKey])

  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  // Caches rows so its calculation is repeated only when its inputs change.
  const rows = useMemo(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    () => computeBalances(projectFilter === 'All' ? undefined : projectFilter),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [projectFilter, refreshKey]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  // Caches rowsWithValue so its calculation is repeated only when its inputs change.
  const rowsWithValue = useMemo(() => rows.map((row) => {
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = materials.find((m) => m.id === row.materialId)
    // Stores the value in rate so later lines can reuse this data or behavior for the current feature.
    const rate = material?.referenceRate
    // Returns the result so the caller or React receives the value or interface this function provides.
    return { ...row, rate, value: rate != null ? row.balance * rate : undefined }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [rows, materials])

  // Stores the value in lowStockRows so later lines can reuse this data or behavior for the current feature.
  const lowStockRows = rowsWithValue.filter((row) => row.isLow)
  // Stores the value in totalValue so later lines can reuse this data or behavior for the current feature.
  const totalValue = rowsWithValue.reduce((total, row) => total + (row.value ?? 0), 0)

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Materials Tracked', value: String(rows.length), icon: PackageSearch },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Low Stock Alerts', value: String(lowStockRows.length), icon: AlertTriangle },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock Value (at ref. rate)', value: formatINR(totalValue), icon: IndianRupee },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Healthy Items', value: String(rows.length - lowStockRows.length), icon: CheckCircle2 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/stock">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Stock / Available</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Available Stock</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Live balances per material against planned quantities, with low-stock alerts.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex gap-3">
            {/* Starts the <select> element to collect or display a value. */}
            <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 text-sm text-[#595552] outline-none">
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="All">All projects</option>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {projects.map((project) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={project.id} value={String(project.id)}>{project.code} — {project.name}</option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button onClick={() => setRefreshKey((key) => key + 1)} className="rounded-xl border border-[#C8BCB4] px-4 py-3 text-sm text-[#595552] hover:bg-[#F7F3EE]">
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              Refresh
            {/* Closes the <button> element so later content is no longer part of this region. */}
            </button>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
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
                    <h2 className="mt-3 text-2xl font-semibold text-[#323232]">{stat.value}</h2>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className={`rounded-xl p-3 ${stat.label === 'Low Stock Alerts' && lowStockRows.length > 0 ? 'bg-[#F8ECEA] text-[#9B625A]' : 'bg-[#F7F3EE] text-[#595552]'}`}><Icon size={21} /></div>
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

        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {lowStockRows.length > 0 && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <section className="rounded-2xl border border-[#EAD5D0] bg-[#F8ECEA] p-5">
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="flex items-center gap-2 text-sm font-semibold text-[#9B625A]">
              {/* Starts the <AlertTriangle> element to organize this part of the interface. */}
              <AlertTriangle size={16} /> {lowStockRows.length} material{lowStockRows.length > 1 ? 's' : ''} at or below the low-stock threshold
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#9B625A]/80">
              // Transforms each collection item so the corresponding values or interface elements can be produced.
              {lowStockRows.map((row) => `${row.materialName} (${formatQty(row.balance)} ${row.materialUnit} left)`).join(' · ')}
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
          {/* Closes the <section> element so later content is no longer part of this region. */}
          </section>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="border-b border-[#E8DCD4] p-5">
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold text-[#323232]">Balances by Material</h2>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-1 text-xs text-[#8E827A]">Balance bar shows available stock against the planned quantity</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[1040px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Material</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Total IN</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Total OUT</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Balance</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Planned</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium w-[220px]">Balance vs Planned</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Value</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Status</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {rowsWithValue.map((row) => {
                  // Stores the value in plannedPercent so later lines can reuse this data or behavior for the current feature.
                  const plannedPercent = row.plannedQty ? Math.min(100, (row.balance / row.plannedQty) * 100) : null
                  // Returns the result so the caller or React receives the value or interface this function provides.
                  return (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <tr key={row.materialId} className="hover:bg-[#F7F3EE]/60">
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        {/* Starts the <p> element to organize this part of the interface. */}
                        <p className="text-sm font-medium text-[#323232]">{row.materialName}</p>
                        {/* Starts the <p> element to organize this part of the interface. */}
                        <p className="mt-1 text-xs text-[#8E827A]">per {row.materialUnit}</p>
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#617858]">+{formatQty(row.totalIn)}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#9A7950]">−{formatQty(row.totalOut)}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm font-semibold text-[#323232]">{formatQty(row.balance)} {row.materialUnit}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{row.plannedQty != null ? `${formatQty(row.plannedQty)} ${row.materialUnit}` : 'No plan'}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {plannedPercent != null ? (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <div>
                            {/* Starts the <div> element to organize this part of the interface. */}
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F7F3EE]">
                              {/* Starts the <div> element to organize this part of the interface. */}
                              <div
                                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                className={`h-full rounded-full ${row.isLow ? 'bg-[#B87A4F]' : 'bg-[#617858]'}`}
                                /* Sets the style property so this element receives the data or behavior required by this screen. */
                                style={{ width: `${Math.max(2, plannedPercent)}%` }}
                              />
                            {/* Closes the <div> element so later content is no longer part of this region. */}
                            </div>
                            {/* Starts the <p> element to organize this part of the interface. */}
                            <p className="mt-1 text-xs text-[#8E827A]">{Math.round(plannedPercent)}% of plan in stock</p>
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        ) : (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <span className="text-xs text-[#8E827A]">—</span>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        )}
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4 text-sm text-[#595552]">{row.value != null ? formatINR(row.value) : '—'}</td>
                      {/* Starts the <td> element to organize this part of the interface. */}
                      <td className="px-5 py-4">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {row.isLow ? (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F8ECEA] px-2.5 py-1 text-xs font-medium text-[#9B625A]"><AlertTriangle size={12} /> Low stock</span>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        ) : (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <span className="rounded-full bg-[#E8EFE5] px-2.5 py-1 text-xs font-medium text-[#617858]">Healthy</span>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        )}
                      {/* Closes the <td> element so later content is no longer part of this region. */}
                      </td>
                    {/* Closes the <tr> element so later content is no longer part of this region. */}
                    </tr>
                  // Closes this function call or grouped expression so the surrounding code can continue.
                  )
                // Continues the component or data expression so its related values and behavior stay grouped together.
                })}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {rowsWithValue.length === 0 && <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-[#8E827A]">No stock activity found. Record a Stock IN entry to get started.</td></tr>}
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
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
