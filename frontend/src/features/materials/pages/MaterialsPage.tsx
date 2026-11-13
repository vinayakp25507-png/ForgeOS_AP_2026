<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react'
import {
  Boxes, Plus, Search, Pencil, X, CheckCircle2, Ban, PackageX,
} from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { isAdmin } from '../../authentication/utils/permissions'
import {
  MATERIAL_CATEGORIES,
  MATERIAL_UNITS,
} from '../types/material'
import type { Material, MaterialUnit } from '../types/material'
import {
  addMaterial,
  getStoredMaterials,
  saveStoredMaterials,
  setMaterialStatus,
  updateMaterial,
} from '../data/materialStore'

const emptyForm = {
  name: '',
  category: MATERIAL_CATEGORIES[0],
  unit: 'Bag' as MaterialUnit,
  referenceRate: '',
}

export function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(() => getStoredMaterials())
=======
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Boxes, Plus, Search, Pencil, X, CheckCircle2, PackageX, RefreshCw } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { useAuth } from '../../authentication/auth/useAuth'
import {
  createMaterial,
  fetchMaterials,
  updateMaterial,
  type ApiMaterial,
  type MaterialCategory,
  type MaterialInput,
} from '../../stock/data/inventoryApi'
import { ApiError } from '../../../lib/api'

const categories: { value: MaterialCategory; label: string }[] = [
  { value: 'CEMENT', label: 'Cement' },
  { value: 'STEEL', label: 'Steel' },
  { value: 'SAND_AGGREGATE', label: 'Sand & Aggregate' },
  { value: 'BRICKS_BLOCKS', label: 'Bricks & Blocks' },
  { value: 'TIMBER', label: 'Timber' },
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'PLUMBING', label: 'Plumbing' },
  { value: 'PAINT_FINISH', label: 'Paint & Finish' },
  { value: 'OTHER', label: 'Other' },
]

const emptyForm = { name: '', category: 'CEMENT' as MaterialCategory, unit: 'Bag', description: '' }

export function MaterialsPage() {
  const { user } = useAuth()
  const [materials, setMaterials] = useState<ApiMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [retry, setRetry] = useState(0)
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
<<<<<<< HEAD
  const [editing, setEditing] = useState<Material | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    saveStoredMaterials(materials)
  }, [materials])

  const filteredMaterials = useMemo(() => materials.filter((material) => {
    const query = search.toLowerCase()
    const matchesSearch = `${material.name} ${material.category}`.toLowerCase().includes(query)
    const matchesCategory = categoryFilter === 'All' || material.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || material.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  }), [materials, search, categoryFilter, statusFilter])

  const categoriesInUse = useMemo(
    () => new Set(materials.map((m) => m.category)).size,
    [materials]
  )

=======
  const [editing, setEditing] = useState<ApiMaterial | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)
  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    fetchMaterials(controller.signal).then(setMaterials).then(() => {
      if (!controller.signal.aborted) setLoadError(null)
    }).catch((cause: unknown) => {
      if (!controller.signal.aborted) setLoadError(cause instanceof Error ? cause.message : 'Unable to load the material catalogue.')
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [retry])

  const filtered = useMemo(() => materials.filter((material) => {
    const matchesText = `${material.name} ${material.category} ${material.unit}`.toLowerCase().includes(search.toLowerCase())
    return matchesText
      && (categoryFilter === 'All' || material.category === categoryFilter)
      && (statusFilter === 'All' || (statusFilter === 'Active') === material.isActive)
  }), [materials, search, categoryFilter, statusFilter])

>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError('')
<<<<<<< HEAD
    setShowForm(true)
  }

  const openEdit = (material: Material) => {
    setEditing(material)
    setForm({
      name: material.name,
      category: material.category,
      unit: material.unit,
      referenceRate: material.referenceRate != null ? String(material.referenceRate) : '',
    })
    setFormError('')
    setShowForm(true)
  }

  const saveMaterial = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')

    const payload = {
      name: form.name,
      category: form.category,
      unit: form.unit,
      referenceRate: form.referenceRate.trim() ? Number(form.referenceRate) : undefined,
    }

    if (editing) {
      const updated = updateMaterial(editing.id, payload)
      if (!updated) {
        setFormError('A material with this name already exists. Names must be unique.')
        return
      }
      setMaterials((current) => current.map((m) => (m.id === updated.id ? updated : m)))
    } else {
      const created = addMaterial(payload)
      if (!created) {
        setFormError('A material with this name already exists. Names must be unique.')
        return
      }
      setMaterials((current) => [created, ...current])
    }
    setShowForm(false)
  }

  const toggleStatus = (material: Material) => {
    const nextStatus = material.status === 'Active' ? 'Inactive' : 'Active'
    const action = nextStatus === 'Inactive' ? 'deactivate' : 'reactivate'
    if (window.confirm(`Are you sure you want to ${action} "${material.name}"?`)) {
      const updated = setMaterialStatus(material.id, nextStatus)
      if (updated) {
        setMaterials((current) => current.map((m) => (m.id === updated.id ? updated : m)))
      }
    }
  }

  const stats = [
    { label: 'Total Materials', value: materials.length, icon: Boxes },
    { label: 'Active', value: materials.filter((m) => m.status === 'Active').length, icon: CheckCircle2 },
    { label: 'Inactive', value: materials.filter((m) => m.status === 'Inactive').length, icon: PackageX },
    { label: 'Categories', value: categoriesInUse, icon: Boxes },
  ]

  return (
    <AppShell currentPath="/app/materials">
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#8E827A]">Workspace / Materials</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Materials Master</h1>
            <p className="mt-2 text-sm text-[#8E827A]">Central catalogue of construction materials with units and reference rates.</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            <Plus size={17} /> Add Material
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8E827A]">{stat.label}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-[#323232]">{stat.value}</h2>
                  </div>
                  <div className="rounded-xl bg-[#F7F3EE] p-3 text-[#595552]"><Icon size={21} /></div>
                </div>
              </div>
            )
          })}
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-semibold text-[#323232]">Material Catalogue</h2>
              <p className="mt-1 text-xs text-[#8E827A]">{filteredMaterials.length} materials found</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                <Search size={17} className="text-[#8E827A]" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search material..." className="w-full bg-transparent text-sm outline-none sm:w-44" />
              </div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                <option>All</option>
                {MATERIAL_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                <tr>
                  <th className="px-5 py-4 font-medium">Material</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Unit</th>
                  <th className="px-5 py-4 font-medium">Reference Rate</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCD4]">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className={`hover:bg-[#F7F3EE]/60 ${material.status === 'Inactive' ? 'opacity-60' : ''}`}>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[#323232]">{material.name}</p>
                      <p className="mt-1 text-xs text-[#8E827A]">{material.id}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#595552]">{material.category}</td>
                    <td className="px-5 py-4 text-sm text-[#595552]">{material.unit}</td>
                    <td className="px-5 py-4 text-sm text-[#595552]">
                      {material.referenceRate != null ? `₹${material.referenceRate.toLocaleString('en-IN')} / ${material.unit}` : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${material.status === 'Active' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F8ECEA] text-[#9B625A]'}`}>
                        {material.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {isAdmin() ? (
                          <>
                            <button onClick={() => openEdit(material)} title="Edit material" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                            <button onClick={() => toggleStatus(material)} title={material.status === 'Active' ? 'Deactivate material' : 'Reactivate material'} className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]">
                              {material.status === 'Active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-[#8E827A]">View only</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMaterials.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">No materials found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form onSubmit={saveMaterial} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Material' : 'Add New Material'}</h2>
                <p className="mt-1 text-sm text-[#8E827A]">Materials are shared across all projects.</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            </div>

            {formError && (
              <p className="rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]">{formError}</p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-[#595552]">Material Name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. OPC 53 Grade Cement" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
              <label className="text-sm font-medium text-[#595552]">Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {MATERIAL_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium text-[#595552]">Unit
                <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value as MaterialUnit })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  {MATERIAL_UNITS.map((unit) => <option key={unit}>{unit}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium text-[#595552]">Reference Rate (₹ per unit, optional)
                <input type="number" min="0" step="0.01" value={form.referenceRate} onChange={(e) => setForm({ ...form, referenceRate: e.target.value })} placeholder="e.g. 395" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Add Material'}</button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  )
=======
    setSuccess('')
    setShowForm(true)
  }

  const openEdit = (material: ApiMaterial) => {
    setEditing(material)
    setForm({ name: material.name, category: material.category, unit: material.unit, description: material.description ?? '' })
    setFormError('')
    setSuccess('')
    setShowForm(true)
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    setSaving(true)
    const input: MaterialInput = {
      name: form.name.trim(),
      category: form.category,
      unit: form.unit.trim(),
      description: form.description.trim() || null,
    }
    try {
      const saved = editing ? await updateMaterial(editing.id, input) : await createMaterial(input)
      setMaterials((current) => editing
        ? current.map((item) => item.id === saved.id ? saved : item)
        : [...current, saved].sort((a, b) => a.name.localeCompare(b.name)))
      setShowForm(false)
      setSuccess(`Material ${editing ? 'updated' : 'created'} successfully.`)
    } catch (cause) {
      setFormError(cause instanceof ApiError ? cause.message : 'Unable to save this material.')
    } finally {
      setSaving(false)
    }
  }

  const categoryLabel = (category: string) => categories.find((entry) => entry.value === category)?.label ?? category
  const activeCount = materials.filter((item) => item.isActive).length
  const stats = [
    { label: 'Total Materials', value: materials.length, icon: Boxes },
    { label: 'Active', value: activeCount, icon: CheckCircle2 },
    { label: 'Inactive', value: materials.length - activeCount, icon: PackageX },
    { label: 'Categories', value: new Set(materials.map((item) => item.category)).size, icon: Boxes },
  ]

  return <AppShell currentPath="/app/materials">
    <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><p className="text-sm text-[#8E827A]">Workspace / Materials</p><h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Materials Master</h1><p className="mt-2 text-sm text-[#8E827A]">Shared material catalogue from ForgeOS.</p></div>
        {isAdmin && <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white"><Plus size={17} /> Add Material</button>}
      </section>

      {success && <p role="status" className="rounded-xl bg-[#E8EFE5] px-4 py-3 text-sm text-[#617858]">{success}</p>}
      {loadError && <ErrorBanner message={loadError} retry={() => setRetry((value) => value + 1)} />}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-[#8E827A]">{label}</p><h2 className="mt-3 text-3xl font-semibold text-[#323232]">{loading ? '—' : value}</h2></div><div className="rounded-xl bg-[#F7F3EE] p-3 text-[#595552]"><Icon size={21} /></div></div></div>)}
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 lg:flex-row lg:items-center">
          <div><h2 className="font-semibold text-[#323232]">Material Catalogue</h2><p className="mt-1 text-xs text-[#8E827A]">{filtered.length} materials</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2"><Search size={17} className="text-[#8E827A]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search material..." className="w-full bg-transparent text-sm outline-none sm:w-44" /></div>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm"><option value="All">All categories</option>{categories.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm"><option>All</option><option>Active</option><option>Inactive</option></select>
          </div>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left">
          <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]"><tr><th className="px-5 py-4 font-medium">Material</th><th className="px-5 py-4 font-medium">Category</th><th className="px-5 py-4 font-medium">Unit</th><th className="px-5 py-4 font-medium">Description</th><th className="px-5 py-4 font-medium">Status</th><th className="px-5 py-4 text-right font-medium">Actions</th></tr></thead>
          <tbody className="divide-y divide-[#E8DCD4]">
            {filtered.map((material) => <tr key={material.id} className={`hover:bg-[#F7F3EE]/60 ${!material.isActive ? 'opacity-60' : ''}`}>
              <td className="px-5 py-4"><p className="text-sm font-medium text-[#323232]">{material.name}</p><p className="mt-1 text-xs text-[#8E827A]">#{material.id}</p></td>
              <td className="px-5 py-4 text-sm text-[#595552]">{categoryLabel(material.category)}</td><td className="px-5 py-4 text-sm text-[#595552]">{material.unit}</td><td className="max-w-sm px-5 py-4 text-sm text-[#595552]">{material.description || '—'}</td>
              <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${material.isActive ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F8ECEA] text-[#9B625A]'}`}>{material.isActive ? 'Active' : 'Inactive'}</span></td>
              <td className="px-5 py-4 text-right">{isAdmin ? <button onClick={() => openEdit(material)} title="Edit material" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button> : <span className="text-xs text-[#8E827A]">View only</span>}</td>
            </tr>)}
            {!loading && filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">{loadError ? 'Catalogue unavailable.' : 'No materials found.'}</td></tr>}
            {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">Loading materials…</td></tr>}
          </tbody>
        </table></div>
      </section>
    </div>

    {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <form onSubmit={(event) => void save(event)} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Material' : 'Add New Material'}</h2><p className="mt-1 text-sm text-[#8E827A]">Catalogue entries are shared across projects.</p></div><button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A]"><X size={19} /></button></div>
        {formError && <p role="alert" className="rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]">{formError}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-[#595552]">Material Name<input required maxLength={255} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
          <label className="text-sm font-medium text-[#595552]">Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as MaterialCategory })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal">{categories.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select></label>
          <label className="text-sm font-medium text-[#595552]">Unit<input required maxLength={30} value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} placeholder="e.g. Bag, Kg, m³" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
          <label className="text-sm font-medium text-[#595552]">Description<textarea maxLength={1000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal" /></label>
        </div>
        <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm">Cancel</button><button disabled={saving} type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm text-white disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Material'}</button></div>
      </form>
    </div>}
  </AppShell>
}

function ErrorBanner({ message, retry }: { message: string; retry: () => void }) {
  return <div role="alert" className="flex items-center justify-between gap-3 rounded-xl bg-[#F8ECEA] px-4 py-3 text-sm text-[#9B625A]"><span>{message}</span><button type="button" onClick={retry} className="font-semibold underline"><RefreshCw className="mr-1 inline h-4 w-4" />Retry</button></div>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}
