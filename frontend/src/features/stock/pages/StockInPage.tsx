<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react'
import { ArrowDownToLine, X, Ban } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { getCurrentUser, isAdmin } from '../../authentication/utils/permissions'
import type { Material } from '../../materials/types/material'
import { getStoredMaterials } from '../../materials/data/materialStore'
import { getStoredVendors } from '../../vendors/data/vendorStore'
import type { StockTransaction } from '../types/stock'
import {
  addStockIn,
  formatDate,
  formatINR,
  formatQty,
  getStoredStockTransactions,
  todayISO,
  voidStockTransaction,
} from '../data/stockStore'

type Project = {
  id: number
  code: string
  name: string
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold'
}

const emptyForm = {
  projectId: '',
  materialId: '',
  quantity: '',
  date: '',
  vendorName: '',
  challanNumber: '',
  rate: '',
  billReference: '',
  notes: '',
}

export function StockInPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [materials] = useState<Material[]>(() => getStoredMaterials())
  const [vendors, setVendors] = useState<string[]>([])
  const [transactions, setTransactions] = useState<StockTransaction[]>(() => getStoredStockTransactions())
  const [form, setForm] = useState(emptyForm)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [voidTarget, setVoidTarget] = useState<StockTransaction | null>(null)
  const [voidReason, setVoidReason] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('forgeos_projects')
      setProjects(saved ? JSON.parse(saved) : [])
    } catch {
      setProjects([])
    }
    setVendors(getStoredVendors().map((vendor) => vendor.name))
  }, [])

  const selectedMaterial = materials.find((m) => m.id === form.materialId)

  const recentIn = useMemo(
    () => transactions.filter((tx) => tx.type === 'IN').slice(0, 10),
    [transactions]
  )

  const submitStockIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(null)

    const project = projects.find((p) => String(p.id) === form.projectId)
    if (!project || !selectedMaterial) return

    const quantity = Number(form.quantity)
    if (!Number.isFinite(quantity) || quantity <= 0) {
      setFeedback({ type: 'error', message: 'Quantity must be greater than 0.' })
      return
    }
    if (!form.date) {
      setFeedback({ type: 'error', message: 'Please pick a delivery date.' })
      return
    }
    if (form.date > todayISO()) {
      setFeedback({ type: 'error', message: 'Date cannot be in the future.' })
      return
    }

    const user = getCurrentUser()
    const recordedBy = `${user?.name ?? 'User'} (${isAdmin() ? 'Admin' : 'PM'})`

    addStockIn({
      projectId: String(project.id),
      projectCode: project.code,
      projectName: project.name,
      materialId: selectedMaterial.id,
      materialName: selectedMaterial.name,
      materialUnit: selectedMaterial.unit,
      quantity,
      date: form.date,
      vendorName: form.vendorName || undefined,
      challanNumber: form.challanNumber || undefined,
      rate: form.rate.trim() ? Number(form.rate) : undefined,
      billReference: form.billReference || undefined,
      notes: form.notes || undefined,
      recordedBy,
    })

    setTransactions(getStoredStockTransactions())
    setForm({ ...emptyForm, projectId: form.projectId })
    setFeedback({
      type: 'success',
      message: `Recorded Stock IN of ${formatQty(quantity)} ${selectedMaterial.unit} ${selectedMaterial.name} for ${project.code}.`,
    })
  }

  const confirmVoid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!voidTarget) return
    const result = voidStockTransaction(voidTarget.id, voidReason, isAdmin())
    if (result.ok) {
      setTransactions(getStoredStockTransactions())
      setVoidTarget(null)
      setVoidReason('')
      setFeedback({ type: 'success', message: `Entry ${voidTarget.id} has been voided.` })
    } else {
      setVoidTarget(null)
      setVoidReason('')
      setFeedback({ type: 'error', message: result.error })
    }
  }

  return (
    <AppShell currentPath="/app/stock-in">
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#8E827A]">Workspace / Stock / IN</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Record Stock IN</h1>
            <p className="mt-2 text-sm text-[#8E827A]">Log material deliveries into a project site with vendor and challan details.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFE5] px-4 py-2 text-sm font-medium text-[#617858]">
            <ArrowDownToLine size={16} /> Stock received
          </span>
        </section>

        {feedback && (
          <p className={`rounded-xl px-4 py-3 text-sm ${feedback.type === 'success' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F8ECEA] text-[#9B625A]'}`}>
            {feedback.message}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.35fr]">
          <section className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-[#323232]">Delivery Details</h2>
            <p className="mt-1 text-xs text-[#8E827A]">Fields marked optional can be left blank.</p>
            <form onSubmit={submitStockIn} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-[#595552]">Project
                <select required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  <option value="" disabled>Select project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={String(project.id)}>{project.code} — {project.name}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-[#595552]">Material
                <select required value={form.materialId} onChange={(e) => setForm({ ...form, materialId: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  <option value="" disabled>Select material</option>
                  {materials.filter((m) => m.status === 'Active').map((material) => (
                    <option key={material.id} value={material.id}>{material.name} ({material.unit})</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm font-medium text-[#595552]">Quantity {selectedMaterial ? `(${selectedMaterial.unit})` : ''}
                  <input required type="number" min="0.01" step="0.01" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                </label>
                <label className="text-sm font-medium text-[#595552]">Delivery Date
                  <input required type="date" max={todayISO()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                </label>
              </div>

              <label className="block text-sm font-medium text-[#595552]">Vendor (optional)
                <select value={form.vendorName} onChange={(e) => setForm({ ...form, vendorName: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  <option value="">— Not linked —</option>
                  {vendors.map((name) => <option key={name}>{name}</option>)}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm font-medium text-[#595552]">Challan No. (optional)
                  <input value={form.challanNumber} onChange={(e) => setForm({ ...form, challanNumber: e.target.value })} placeholder="e.g. CH-8821" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                </label>
                <label className="text-sm font-medium text-[#595552]">Rate ₹/unit (optional)
                  <input type="number" min="0" step="0.01" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="e.g. 395" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                </label>
              </div>

              <label className="block text-sm font-medium text-[#595552]">Linked Bill No. (optional)
                <input value={form.billReference} onChange={(e) => setForm({ ...form, billReference: e.target.value })} placeholder="e.g. BILL-001" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>

              <label className="block text-sm font-medium text-[#595552]">Notes (optional)
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="Delivery remarks" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setForm({ ...emptyForm })} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Reset</button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1E1E1E]">
                  <ArrowDownToLine size={16} /> Record Stock IN
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
            <div className="border-b border-[#E8DCD4] p-5">
              <h2 className="font-semibold text-[#323232]">Recent Stock IN</h2>
              <p className="mt-1 text-xs text-[#8E827A]">Latest {recentIn.length} deliveries across projects</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Project</th>
                    <th className="px-5 py-4 font-medium">Material</th>
                    <th className="px-5 py-4 font-medium">Qty</th>
                    <th className="px-5 py-4 font-medium">Vendor / Challan</th>
                    <th className="px-5 py-4 font-medium">Value</th>
                    <th className="px-5 py-4 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DCD4]">
                  {recentIn.map((tx) => (
                    <tr key={tx.id} className={`hover:bg-[#F7F3EE]/60 ${tx.voided ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-4 text-sm text-[#595552]">{formatDate(tx.date)}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.projectCode}</td>
                      <td className="px-5 py-4 text-sm font-medium text-[#323232] line-through-offset-2">
                        <span className={tx.voided ? 'line-through' : ''}>{tx.materialName}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#595552]">+{formatQty(tx.quantity)} {tx.materialUnit}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.vendorName ?? '—'}{tx.challanNumber ? ` · ${tx.challanNumber}` : ''}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{tx.rate != null ? formatINR(tx.quantity * tx.rate) : '—'}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {tx.voided ? (
                            <span className="rounded-full bg-[#F8ECEA] px-2.5 py-1 text-xs font-medium text-[#9B625A]" title={tx.voidReason}>Void</span>
                          ) : (
                            <>
                              <span className="rounded-full bg-[#E8EFE5] px-2.5 py-1 text-xs font-medium text-[#617858]">Active</span>
                              <button onClick={() => { setVoidTarget(tx); setVoidReason('') }} title="Void entry" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Ban size={15} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recentIn.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-[#8E827A]">No stock IN entries yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {voidTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form onSubmit={confirmVoid} className="my-6 w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#323232]">Void Stock IN Entry</h2>
                <p className="mt-1 text-sm text-[#8E827A]">{voidTarget.id} · {formatQty(voidTarget.quantity)} {voidTarget.materialUnit} {voidTarget.materialName} · {voidTarget.projectCode}</p>
              </div>
              <button type="button" onClick={() => setVoidTarget(null)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            </div>
            <p className="rounded-xl bg-[#F5EDE1] px-4 py-3 text-xs text-[#9A7950]">
              Voiding keeps the row for audit but removes it from stock balances. Admin can void anytime; PM entries only within 48 hours.
            </p>
            <label className="block text-sm font-medium text-[#595552]">Reason (required)
              <input required value={voidReason} onChange={(e) => setVoidReason(e.target.value)} placeholder="e.g. Duplicate challan entry" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setVoidTarget(null)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#9B625A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#84504A]"><Ban size={15} /> Void Entry</button>
            </div>
          </form>
        </div>
      )}

    </AppShell>
  )
=======
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { ArrowDownToLine, RefreshCw } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { useProjects } from '../../projects/useProjects'
import { ApiError } from '../../../lib/api'
import { createStockTransaction, fetchMaterials, fetchProjectInventory, fetchTransactions, type ApiMaterial, type InventoryRow, type StockTransaction } from '../data/inventoryApi'
import { formatQty, todayISO } from '../data/formatting'

const initialForm = { materialId: '', quantity: '', txnDate: todayISO(), unitRate: '', vendorId: '', billId: '', challanNumber: '', remarks: '' }

export function StockInPage() {
  const { projects, selectedProject, selectedProjectId, selectProject, isLoading: projectsLoading, error: projectsError, retry: retryProjects } = useProjects()
  const [materials, setMaterials] = useState<ApiMaterial[]>([])
  const [inventory, setInventory] = useState<InventoryRow[]>([])
  const [transactions, setTransactions] = useState<StockTransaction[]>([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const [retry, setRetry] = useState(0)
  const activeMaterials = useMemo(() => new Map(materials.filter((material) => material.isActive).map((material) => [material.id, material])), [materials])
  const plannedRows = inventory.filter((row) => activeMaterials.has(row.materialId))
  const recentIn = transactions.filter((transaction) => transaction.txnType === 'IN').slice(0, 10)

  const refresh = () => setRetry((value) => value + 1)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    const requests = [
      fetchMaterials(controller.signal),
      selectedProjectId ? fetchProjectInventory(selectedProjectId, controller.signal) : Promise.resolve([]),
      selectedProjectId ? fetchTransactions(selectedProjectId, { includeVoided: true }, controller.signal) : Promise.resolve([]),
    ] as const
    Promise.all(requests).then(([catalogue, rows, history]) => {
      if (!controller.signal.aborted) {
        setMaterials(catalogue)
        setInventory(rows)
        setTransactions(history)
        setError(null)
      }
    }).catch((cause: unknown) => {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Unable to load stock receipt data.')
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [selectedProjectId, retry])

  const selectedMaterial = materials.find((material) => material.id === Number(form.materialId))
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedProjectId || !selectedMaterial) return
    setSaving(true)
    setError(null)
    setSuccess('')
    try {
      await createStockTransaction(selectedProjectId, {
        materialId: selectedMaterial.id,
        txnType: 'IN',
        quantity: Number(form.quantity),
        txnDate: form.txnDate,
        ...(form.unitRate ? { unitRate: Number(form.unitRate) } : {}),
        ...(form.vendorId ? { vendorId: Number(form.vendorId) } : {}),
        ...(form.billId ? { billId: Number(form.billId) } : {}),
        ...(form.challanNumber.trim() ? { challanNumber: form.challanNumber.trim() } : {}),
        ...(form.remarks.trim() ? { remarks: form.remarks.trim() } : {}),
      })
      setSuccess(`Stock IN recorded for ${selectedMaterial.name}.`)
      setForm({ ...initialForm, txnDate: todayISO() })
      refresh()
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Unable to record this receipt.')
    } finally {
      setSaving(false)
    }
  }

  return <AppShell currentPath="/app/stock-in">
    <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm text-[#8E827A]">Workspace / Stock / IN</p><h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Record Stock IN</h1><p className="mt-2 text-sm text-[#8E827A]">Post a material receipt to the selected project.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFE5] px-4 py-2 text-sm font-medium text-[#617858]"><ArrowDownToLine size={16} /> Stock received</span></header>
      <div className="flex flex-wrap gap-3">
        <select aria-label="Project" value={selectedProjectId} onChange={(event) => selectProject(event.target.value)} disabled={projectsLoading || !projects.length} className="rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 text-sm">{projects.map((project) => <option key={project.id} value={String(project.id)}>{project.code} — {project.name}</option>)}</select>
        <button type="button" onClick={refresh} className="rounded-xl border border-[#C8BCB4] px-4 py-3 text-sm"><RefreshCw className="mr-1 inline h-4 w-4" />Refresh</button>
      </div>
      {projectsError && <Banner message={projectsError} retry={retryProjects} />}
      {error && <Banner message={error} retry={refresh} />}
      {success && <p role="status" className="rounded-xl bg-[#E8EFE5] px-4 py-3 text-sm text-[#617858]">{success}</p>}
      {selectedProject && <p className="text-sm text-[#8E827A]">Receipt destination: {selectedProject.code} · {selectedProject.name}</p>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.35fr]">
        <section className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#323232]">Receipt Details</h2>
          <p className="mt-1 text-xs text-[#8E827A]">Only materials already included in this project plan can receive stock.</p>
          {!loading && selectedProjectId && plannedRows.length === 0 && <p className="mt-4 rounded-xl bg-[#F5EDE1] px-4 py-3 text-sm text-[#9A7950]">No planned materials are available for this project. Stock receipts require an existing project material plan.</p>}
          <form onSubmit={(event) => void submit(event)} className="mt-5 space-y-4">
            <label className="block text-sm font-medium text-[#595552]">Material<select required value={form.materialId} onChange={(event) => setForm({ ...form, materialId: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal"><option value="">Select planned material</option>{plannedRows.map((row) => <option key={row.materialId} value={row.materialId}>{row.materialName} ({row.unit})</option>)}</select></label>
            {selectedMaterial && <p className="rounded-xl bg-[#F7F3EE] px-4 py-3 text-sm text-[#595552]">Current available stock: <strong>{formatQty(inventory.find((row) => row.materialId === selectedMaterial.id)?.availableStock ?? 0)} {selectedMaterial.unit}</strong></p>}
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-medium text-[#595552]">Quantity {selectedMaterial && `(${selectedMaterial.unit})`}<input required type="number" min="0.001" step="0.001" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
              <label className="text-sm font-medium text-[#595552]">Transaction Date<input required type="date" max={todayISO()} value={form.txnDate} onChange={(event) => setForm({ ...form, txnDate: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-medium text-[#595552]">Unit Rate (optional)<input type="number" min="0" step="0.01" value={form.unitRate} onChange={(event) => setForm({ ...form, unitRate: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
              <label className="text-sm font-medium text-[#595552]">Vendor ID (optional)<input type="number" min="1" step="1" value={form.vendorId} onChange={(event) => setForm({ ...form, vendorId: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-sm font-medium text-[#595552]">Bill ID (optional)<input type="number" min="1" step="1" value={form.billId} onChange={(event) => setForm({ ...form, billId: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
              <label className="text-sm font-medium text-[#595552]">Challan No. (optional)<input maxLength={100} value={form.challanNumber} onChange={(event) => setForm({ ...form, challanNumber: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
            </div>
            <label className="block text-sm font-medium text-[#595552]">Remarks (optional)<textarea maxLength={1000} value={form.remarks} onChange={(event) => setForm({ ...form, remarks: event.target.value })} rows={2} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
            <button disabled={saving || loading || !selectedProjectId || !plannedRows.length} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"><ArrowDownToLine size={16} />{saving ? 'Recording…' : 'Record Stock IN'}</button>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
          <div className="border-b border-[#E8DCD4] p-5"><h2 className="font-semibold text-[#323232]">Recent Stock IN</h2><p className="mt-1 text-xs text-[#8E827A]">Recent receipts for the selected project</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead className="bg-[#F7F3EE] text-xs text-[#8E827A]"><tr><th className="px-5 py-4 font-medium">Date</th><th className="px-5 py-4 font-medium">Material</th><th className="px-5 py-4 font-medium">Quantity</th><th className="px-5 py-4 font-medium">Details</th><th className="px-5 py-4 font-medium">Recorded By</th></tr></thead><tbody className="divide-y divide-[#E8DCD4]">
            {recentIn.map((transaction) => <tr key={transaction.id}><td className="px-5 py-4 text-sm">{transaction.txnDate.slice(0, 10)}</td><td className="px-5 py-4 text-sm font-medium">{transaction.material.name}</td><td className="px-5 py-4 text-sm text-[#617858]">+{formatQty(Number(transaction.quantity))} {transaction.material.unit}</td><td className="px-5 py-4 text-sm">{transaction.challanNumber ?? '—'}{transaction.remarks ? ` · ${transaction.remarks}` : ''}</td><td className="px-5 py-4 text-sm">{transaction.createdBy.name}</td></tr>)}
            {loading && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[#8E827A]">Loading receipts…</td></tr>}
            {!loading && recentIn.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[#8E827A]">No stock receipts returned for this project.</td></tr>}
          </tbody></table></div>
        </section>
      </div>
    </div>
  </AppShell>
}

function Banner({ message, retry }: { message: string; retry: () => void }) {
  return <div role="alert" className="flex items-center justify-between gap-3 rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]"><span>{message}</span><button type="button" onClick={retry} className="font-semibold underline">Retry</button></div>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}
