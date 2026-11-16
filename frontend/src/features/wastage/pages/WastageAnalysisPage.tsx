// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Imports TrendingUp, AlertTriangle, CheckCircle2, IndianRupee from lucide-react so this module can reuse that component, helper, or library.
import { TrendingUp, AlertTriangle, CheckCircle2, IndianRupee } from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports computeWastage, formatINR, formatQty from ../../stock/data/stockStore so this module can reuse that component, helper, or library.
import { computeWastage, formatINR, formatQty } from '../../stock/data/stockStore'
// Imports type  WastageRow, WastageStatus from ../../stock/types/stock so this module can reuse that component, helper, or library.
import type { WastageRow, WastageStatus } from '../../stock/types/stock'

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

// Stores the value in statusStyles so later lines can reuse this data or behavior for the current feature.
const statusStyles: Record<WastageStatus, string> = {
  // Sets the OK field so the surrounding object or component receives this setting.
  OK: 'bg-[#E8EFE5] text-[#617858]',
  // Sets the OVERRUN field so the surrounding object or component receives this setting.
  OVERRUN: 'bg-[#F8ECEA] text-[#9B625A]',
  // Sets the NO_BASELINE field so the surrounding object or component receives this setting.
  NO_BASELINE: 'bg-[#F5EDE1] text-[#9A7950]',
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines WastageAnalysisPage so this module can perform its named task when needed.
export function WastageAnalysisPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projectFilter, setProjectFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [statusFilter, setStatusFilter] = useState('All')
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
    () => computeWastage(projectFilter === 'All' ? undefined : projectFilter),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [projectFilter, refreshKey]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

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
  const filtered = useMemo(
    // Keeps only items matching this condition so the result contains relevant data.
    () => rows.filter((row) => statusFilter === 'All' || row.status === statusFilter),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    [rows, statusFilter]
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Stores the value in overrunRows so later lines can reuse this data or behavior for the current feature.
  const overrunRows = rows.filter((row) => row.status === 'OVERRUN')
  // Stores the value in totalEstimatedLoss so later lines can reuse this data or behavior for the current feature.
  const totalEstimatedLoss = rows.reduce((total, row) => total + row.estimatedLoss, 0)
  // Stores the value in worstOverrun so later lines can reuse this data or behavior for the current feature.
  const worstOverrun = rows.reduce<WastageRow | null>((worst, row) => (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    worst == null || row.overrunPercent > worst.overrunPercent ? row : worst
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ), null)

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Overrun Materials', value: String(overrunRows.length), icon: AlertTriangle },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Total Estimated Loss', value: totalEstimatedLoss > 0 ? formatINR(totalEstimatedLoss) : '₹0', icon: IndianRupee },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Materials Tracked', value: String(rows.length), icon: TrendingUp },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Worst Overrun', value: worstOverrun ? `${Math.round(worstOverrun.overrunPercent)}%` : '—', icon: CheckCircle2 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/wastage">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Stock / Wastage</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Wastage Analysis</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Progress-adjusted consumption vs plan, across every project and material.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex gap-3">
            {/* Starts the <select> element to collect or display a value. */}
            <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 text-sm text-[#595552] outline-none">
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="All">All projects (portfolio)</option>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {projects.map((project) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={project.id} value={String(project.id)}>{project.code} — {project.name}</option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>
            {/* Starts the <select> element to collect or display a value. */}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 text-sm text-[#595552] outline-none">
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="All">All statuses</option>
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="OVERRUN">OVERRUN</option>
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="OK">OK</option>
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="NO_BASELINE">NO_BASELINE</option>
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
        <section className="rounded-2xl border border-[#C8BCB4]/70 bg-[#E8DCD4] p-5 text-sm text-[#595552]">
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="font-semibold text-[#323232]">How status is calculated</p>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mt-2">
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            Expected-to-date = planned quantity × site progress %. Consumption above that is an overrun.
            /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            A material flags <span className="font-medium text-[#9B625A]">OVERRUN</span> when the overrun reaches its wastage threshold (default 10%).
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="font-medium text-[#9A7950]"> NO_BASELINE</span> means stock was consumed without a material plan.
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            Estimated loss = overrun quantity × planned rate. Recorded wastage counts DAMAGED and LOST stock OUT entries.
          {/* Closes the <p> element so later content is no longer part of this region. */}
          </p>
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
                  <div className={`rounded-xl p-3 ${stat.label === 'Overrun Materials' && overrunRows.length > 0 ? 'bg-[#F8ECEA] text-[#9B625A]' : 'bg-[#F7F3EE] text-[#595552]'}`}><Icon size={21} /></div>
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
          <div className="border-b border-[#E8DCD4] p-5">
            {/* Starts the <h2> element to organize this part of the interface. */}
            <h2 className="font-semibold text-[#323232]">Per-Material Wastage</h2>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-1 text-xs text-[#8E827A]">Sorted by estimated loss, then overrun % — worst offenders first</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[1180px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Project</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Material</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Progress</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Planned</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Expected-to-date</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Consumed</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Overrun</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Recorded Wastage</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Est. Loss</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Status</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filtered.map((row) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={`${row.projectId}-${row.materialId}`} className="hover:bg-[#F7F3EE]/60">
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{row.projectCode}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">{row.projectName}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{row.materialName}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">per {row.materialUnit}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{row.progressPercent}%</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{row.plannedQty > 0 ? formatQty(row.plannedQty) : '—'}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{row.plannedQty > 0 ? formatQty(row.expectedToDate) : '—'}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm font-medium text-[#323232]">{formatQty(row.consumed)}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {row.overrunQty > 0 ? (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <span className="font-medium text-[#9B625A]">{formatQty(row.overrunQty)} ({Math.round(row.overrunPercent)}%)</span>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      ) : (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <span className="text-[#617858]">—</span>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      )}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {row.recordedWastageQty > 0 ? `${formatQty(row.recordedWastageQty)} ${row.materialUnit}` : '—'}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm font-medium text-[#9B625A]">{row.estimatedLoss > 0 ? formatINR(row.estimatedLoss) : '—'}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`} title={row.status === 'OVERRUN' ? `Exceeds ${row.wastageThreshold}% threshold` : undefined}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {row.status}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ))}
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {filtered.length === 0 && <tr><td colSpan={10} className="px-5 py-12 text-center text-sm text-[#8E827A]">No wastage data for the current selection.</td></tr>}
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
