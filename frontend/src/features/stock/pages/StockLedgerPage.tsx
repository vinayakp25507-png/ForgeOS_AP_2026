// Imports useEffect, useMemo, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useMemo, useState } from 'react'
// Imports ScrollText, Search, Ban, X, ArrowDownToLine, ArrowUpFromLine from lucide-react so this module can reuse that component, helper, or library.
import { ScrollText, Search, Ban, X, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports isAdmin from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { isAdmin } from '../../authentication/utils/permissions'
// Imports type  Material from ../../materials/types/material so this module can reuse that component, helper, or library.
import type { Material } from '../../materials/types/material'
// Imports getStoredMaterials from ../../materials/data/materialStore so this module can reuse that component, helper, or library.
import { getStoredMaterials } from '../../materials/data/materialStore'
// Imports type  StockTransaction from ../types/stock so this module can reuse that component, helper, or library.
import type { StockTransaction } from '../types/stock'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatDate,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatINR,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  formatQty,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredStockTransactions,
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
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in PAGE_SIZE so later lines can reuse this data or behavior for the current feature.
const PAGE_SIZE = 15

// Defines StockLedgerPage so this module can perform its named task when needed.
export function StockLedgerPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projects, setProjects] = useState<Project[]>([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materials] = useState<Material[]>(() => getStoredMaterials())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [transactions, setTransactions] = useState<StockTransaction[]>(() => getStoredStockTransactions())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [projectFilter, setProjectFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [materialFilter, setMaterialFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [typeFilter, setTypeFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [fromDate, setFromDate] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [toDate, setToDate] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showVoided, setShowVoided] = useState(true)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [voidTarget, setVoidTarget] = useState<StockTransaction | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [voidReason, setVoidReason] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [error, setError] = useState('')

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
    setVisibleCount(PAGE_SIZE)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [showVoided, projectFilter, materialFilter, typeFilter, fromDate, toDate, search])

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
  const filtered = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return transactions
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (showVoided ? true : !tx.voided))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (projectFilter === 'All' ? true : tx.projectId === projectFilter))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (materialFilter === 'All' ? true : tx.materialId === materialFilter))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (typeFilter === 'All' ? true : tx.type === typeFilter))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (fromDate ? tx.date >= fromDate : true))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => (toDate ? tx.date <= toDate : true))
      // Keeps only items matching this condition so the result contains relevant data.
      .filter((tx) => {
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (!search.trim()) return true
        // Stores the value in query so later lines can reuse this data or behavior for the current feature.
        const query = search.toLowerCase()
        // Returns the result so the caller or React receives the value or interface this function provides.
        return `${tx.materialName} ${tx.projectName} ${tx.vendorName ?? ''} ${tx.challanNumber ?? ''} ${tx.notes ?? ''} ${tx.id}`.toLowerCase().includes(query)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.createdAt < b.createdAt ? 1 : -1))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [transactions, showVoided, projectFilter, materialFilter, typeFilter, fromDate, toDate, search])

  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  // Caches totals so its calculation is repeated only when its inputs change.
  const totals = useMemo(() => {
    // Stores the value in totalIn so later lines can reuse this data or behavior for the current feature.
    let totalIn = 0
    // Stores the value in totalOut so later lines can reuse this data or behavior for the current feature.
    let totalOut = 0
    // Stores the value in voidedCount so later lines can reuse this data or behavior for the current feature.
    let voidedCount = 0
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    for (const tx of filtered) {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (tx.voided) {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        voidedCount += 1
        // Continues the component or data expression so its related values and behavior stay grouped together.
        continue
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (tx.type === 'IN') totalIn += tx.quantity
      // Handles the alternative branch when the preceding condition was not met.
      else totalOut += tx.quantity
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Returns the result so the caller or React receives the value or interface this function provides.
    return { totalIn, totalOut, voidedCount }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [filtered])

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
      setError('')
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setError(result.error)
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVoidTarget(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVoidReason('')
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/stock-ledger">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Stock / Ledger</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Stock Ledger</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Complete transaction history. Voided rows are struck through and excluded from balances.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <span> element to organize this part of the interface. */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F1EAF6] px-4 py-2 text-sm font-medium text-[#806B96]">
            {/* Starts the <ScrollText> element to organize this part of the interface. */}
            <ScrollText size={16} /> {filtered.length} entries
          {/* Closes the <span> element so later content is no longer part of this region. */}
          </span>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        // Continues the component or data expression so its related values and behavior stay grouped together.
        {error && <p className="rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]">{error}</p>}

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {[
            // Continues the component or data expression so its related values and behavior stay grouped together.
            { label: 'Total IN (filtered)', value: formatQty(totals.totalIn), icon: ArrowDownToLine },
            // Continues the component or data expression so its related values and behavior stay grouped together.
            { label: 'Total OUT (filtered)', value: formatQty(totals.totalOut), icon: ArrowUpFromLine },
            // Continues the component or data expression so its related values and behavior stay grouped together.
            { label: 'Voided rows', value: String(totals.voidedCount), icon: Ban },
            // Continues the component or data expression so its related values and behavior stay grouped together.
            { label: 'Net movement', value: formatQty(totals.totalIn - totals.totalOut), icon: ScrollText },
          // Transforms each collection item so the corresponding values or interface elements can be produced.
          ].map((stat) => {
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
          <div className="flex flex-col gap-4 border-b border-[#E8DCD4] p-5 xl:flex-row xl:items-end xl:justify-between">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-xs font-medium text-[#8E827A]">Project
                {/* Starts the <select> element to collect or display a value. */}
                <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm font-normal text-[#595552] outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>All</option>
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
              <label className="text-xs font-medium text-[#8E827A]">Material
                {/* Starts the <select> element to collect or display a value. */}
                <select value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm font-normal text-[#595552] outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>All</option>
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {materials.map((material) => <option key={material.id} value={material.id}>{material.name}</option>)}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-xs font-medium text-[#8E827A]">Type
                {/* Starts the <select> element to collect or display a value. */}
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm font-normal text-[#595552] outline-none">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>All</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="IN">Stock IN</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="OUT">Stock OUT</option>
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-xs font-medium text-[#8E827A]">From date
                {/* Starts the <input> element to collect or display a value. */}
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#C8BCB4] px-3 py-2 text-sm font-normal text-[#595552] outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="text-xs font-medium text-[#8E827A]">To date
                {/* Starts the <input> element to collect or display a value. */}
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#C8BCB4] px-3 py-2 text-sm font-normal text-[#595552] outline-none" />
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="flex items-center gap-2 text-xs font-medium text-[#8E827A] xl:mt-5">
                {/* Starts the <input> element to collect or display a value. */}
                <input type="checkbox" checked={showVoided} onChange={(e) => setShowVoided(e.target.checked)} className="h-4 w-4" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Show voided entries
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
              {/* Starts the <Search> element to organize this part of the interface. */}
              <Search size={17} className="text-[#8E827A]" />
              {/* Starts the <input> element to collect or display a value. */}
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search challan, vendor, notes..." className="w-full bg-transparent text-sm outline-none xl:w-52" />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[1080px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Date</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Type</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Project</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Material</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Qty</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Rate</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Details</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Recorded By</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 text-right font-medium">Action</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filtered.slice(0, visibleCount).map((tx) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={tx.id} className={`hover:bg-[#F7F3EE]/60 ${tx.voided ? 'opacity-60' : ''}`}>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={tx.voided ? 'line-through' : ''}>{formatDate(tx.date)}</span>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="block text-xs text-[#8E827A]">{tx.id}</span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tx.type === 'IN' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F5EDE1] text-[#9A7950]'}`}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {tx.type === 'IN' ? <ArrowDownToLine size={12} /> : <ArrowUpFromLine size={12} />} {tx.type}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{tx.projectCode}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm font-medium text-[#323232]">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={tx.voided ? 'line-through' : ''}>{tx.materialName}</span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className={`px-5 py-4 text-sm ${tx.type === 'IN' ? 'text-[#617858]' : 'text-[#9A7950]'}`}>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {tx.type === 'IN' ? '+' : '−'}{formatQty(tx.quantity)} {tx.materialUnit}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{tx.rate != null ? formatINR(tx.rate) : '—'}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {tx.type === 'IN'
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        ? <span>{tx.vendorName ?? '—'}{tx.challanNumber ? ` · ${tx.challanNumber}` : ''}{tx.billReference ? ` · Bill ${tx.billReference}` : ''}</span>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        : <span>{tx.reason ?? '—'}{tx.notes ? ` · ${tx.notes}` : ''}</span>}
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{tx.recordedBy}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-end">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {tx.voided ? (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <span className="rounded-full bg-[#F8ECEA] px-2.5 py-1 text-xs font-medium text-[#9B625A]" title={tx.voidReason}>Voided</span>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        ) : (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <button onClick={() => { setVoidTarget(tx); setVoidReason('') }} title="Void entry" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Ban size={15} /></button>
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
                {filtered.length === 0 && <tr><td colSpan={9} className="px-5 py-12 text-center text-sm text-[#8E827A]">No ledger entries match the current filters.</td></tr>}
              {/* Closes the <tbody> element so later content is no longer part of this region. */}
              </tbody>
            {/* Closes the <table> element so later content is no longer part of this region. */}
            </table>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {visibleCount < filtered.length && (
            // Continues the component or data expression so its related values and behavior stay grouped together.
            <div className="border-t border-[#E8DCD4] p-4 text-center">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-xl border border-[#C8BCB4] px-5 py-2.5 text-sm text-[#595552] hover:bg-[#F7F3EE]">
                // Calls this helper or component so the feature can perform the operation or render the control represented here.
                Load more ({filtered.length - visibleCount} remaining)
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          // Continues the component or data expression so its related values and behavior stay grouped together.
          )}
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
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
                <h2 className="text-xl font-semibold text-[#323232]">Void Ledger Entry</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">{voidTarget.id} · {voidTarget.type} · {formatQty(voidTarget.quantity)} {voidTarget.materialUnit} {voidTarget.materialName}</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setVoidTarget(null)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="rounded-xl bg-[#F5EDE1] px-4 py-3 text-xs text-[#9A7950]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              Voiding keeps the row for audit but removes it from balances. Admin can void anytime; PM entries only within 48 hours.
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
            {/* Starts the <label> element to name a form control for users and assistive technology. */}
            <label className="block text-sm font-medium text-[#595552]">Reason (required)
              {/* Starts the <input> element to collect or display a value. */}
              <input required value={voidReason} onChange={(e) => setVoidReason(e.target.value)} placeholder="e.g. Duplicate entry" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
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
