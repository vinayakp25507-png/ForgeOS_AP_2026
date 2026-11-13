<<<<<<< HEAD
import { useMemo, useState, useEffect } from 'react'
import {
  Map, Plus, Search, Pencil, Trash2, X,
  MapPin, Ruler, Building2, CheckCircle2
} from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'

type Land = {
  id: number
  name: string
  surveyNumber: string
  location: string
  owner: string
  area: string
  unit: string
  status: 'Available' | 'Allocated' | 'Under Development'
}

const initialLands: Land[] = [
  { id: 1, name: 'Green Valley Land', surveyNumber: 'SV-101', location: 'Gurugram, Haryana', owner: 'ForgeOS Properties', area: '12', unit: 'Acres', status: 'Allocated' },
  { id: 2, name: 'Skyline Commercial Plot', surveyNumber: 'SV-102', location: 'Delhi, India', owner: 'Skyline Developers', area: '8', unit: 'Acres', status: 'Under Development' },
  { id: 3, name: 'Riverside Land', surveyNumber: 'SV-103', location: 'Noida, UP', owner: 'ForgeOS Properties', area: '15', unit: 'Acres', status: 'Available' },
  { id: 4, name: 'Urban Square Plot', surveyNumber: 'SV-104', location: 'Jaipur, Rajasthan', owner: 'Urban Developers', area: '6', unit: 'Acres', status: 'Available' },
]

const emptyForm = {
  name: '', surveyNumber: '', location: '',
  owner: '', area: '', unit: 'Acres',
  status: 'Available' as Land['status'],
}

const statusStyles: Record<Land['status'], string> = {
  Available: 'bg-[#E8EFE5] text-[#617858]',
  Allocated: 'bg-[#F5EDE1] text-[#9A7950]',
  'Under Development': 'bg-[#F1EAF6] text-[#806B96]',
}

export function LandsPage() {
  const [lands, setLands] = useState<Land[]>(() => {
    try {
      const saved = localStorage.getItem('forgeos_lands')
      return saved ? JSON.parse(saved) : initialLands
    } catch {
      return initialLands
    }
  })

  useEffect(() => {
    localStorage.setItem('forgeos_lands', JSON.stringify(lands))
  }, [lands])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Land | null>(null)
  const [form, setForm] = useState(emptyForm)

  const filteredLands = useMemo(() => lands.filter((land) => {
    const query = search.toLowerCase()
    const matchesSearch = `${land.name} ${land.surveyNumber} ${land.location} ${land.owner}`.toLowerCase().includes(query)
    return matchesSearch && (filter === 'All' || land.status === filter)
  }), [lands, search, filter])
=======
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Map, Plus, Search, Pencil, Trash2, X, MapPin, Ruler, Building2 } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { useAuth } from '../../authentication/auth/useAuth'
import { ApiError } from '../../../lib/api'
import { createLand, deleteLand, fetchLands, updateLand, type ApiLand, type AreaUnit, type LandInput } from '../data/landsApi'

const pageSize = 20
const areaUnits: AreaUnit[] = ['ACRE', 'SQFT', 'SQYD', 'SQM']
const emptyForm: LandInput = {
  name: '',
  addressLine: '',
  city: '',
  state: '',
  pincode: '',
  areaValue: 0,
  areaUnit: 'ACRE',
  surveyNumber: '',
  ownerName: '',
  purchaseDate: '',
  purchaseCost: null,
  notes: '',
}

function messageOf(error: unknown) {
  return error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

function dateLabel(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function unitLabel(unit: AreaUnit) {
  return { SQFT: 'sq ft', SQYD: 'sq yd', SQM: 'sq m', ACRE: 'acres' }[unit]
}

export function LandsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const [lands, setLands] = useState<ApiLand[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [refreshVersion, setRefreshVersion] = useState(0)
  const [loadedRequest, setLoadedRequest] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ApiLand | null>(null)
  const [form, setForm] = useState<LandInput>(emptyForm)

  const requestKey = `${page}:${search}:${refreshVersion}`
  const loading = loadedRequest !== requestKey

  useEffect(() => {
    const controller = new AbortController()
    void fetchLands({ page, pageSize, search }, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return
        setLands(result.lands)
        setTotal(result.total)
        setTotalPages(Math.max(1, result.totalPages))
        setError(null)
        setLoadedRequest(requestKey)
      })
      .catch((loadError: unknown) => {
        if (controller.signal.aborted) return
        setError(messageOf(loadError))
        setLoadedRequest(requestKey)
      })
    return () => controller.abort()
  }, [page, search, requestKey])

  const pageArea = useMemo(() => lands.reduce<Record<AreaUnit, number>>((sum, land) => {
    sum[land.areaUnit] += Number(land.areaValue)
    return sum
  }, { SQFT: 0, SQYD: 0, SQM: 0, ACRE: 0 }), [lands])
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
<<<<<<< HEAD
    setShowForm(true)
  }

  const openEdit = (land: Land) => {
    setEditing(land)
    setForm({
      name: land.name,
      surveyNumber: land.surveyNumber,
      location: land.location,
      owner: land.owner,
      area: land.area,
      unit: land.unit,
      status: land.status,
    })
    setShowForm(true)
  }

  const saveLand = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editing) {
      setLands((current) => current.map((land) =>
        land.id === editing.id ? { ...land, ...form } : land
      ))
    } else {
      setLands((current) => [...current, {
        id: Date.now(),
        ...form,
      }])
    }
    setShowForm(false)
  }

  const deleteLand = (id: number) => {
    if (window.confirm('Are you sure you want to delete this land record?')) {
      setLands((current) => current.filter((land) => land.id !== id))
=======
    setError(null)
    setShowForm(true)
  }

  const openEdit = (land: ApiLand) => {
    setEditing(land)
    setForm({
      name: land.name,
      addressLine: land.addressLine ?? '',
      city: land.city,
      state: land.state,
      pincode: land.pincode ?? '',
      areaValue: Number(land.areaValue),
      areaUnit: land.areaUnit,
      surveyNumber: land.surveyNumber ?? '',
      ownerName: land.ownerName ?? '',
      purchaseDate: land.purchaseDate?.slice(0, 10) ?? '',
      purchaseCost: land.purchaseCost === null ? null : Number(land.purchaseCost),
      notes: land.notes ?? '',
    })
    setError(null)
    setShowForm(true)
  }

  const saveLand = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const input: LandInput = {
        ...form,
        name: form.name.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        addressLine: form.addressLine?.trim() || null,
        pincode: form.pincode?.trim() || null,
        surveyNumber: form.surveyNumber?.trim() || null,
        ownerName: form.ownerName?.trim() || null,
        purchaseDate: form.purchaseDate || null,
        purchaseCost: form.purchaseCost === null || form.purchaseCost === undefined ? null : Number(form.purchaseCost),
        notes: form.notes?.trim() || null,
      }
      if (editing) {
        await updateLand(editing.id, input)
        setSuccess('Land details updated.')
      } else {
        await createLand(input)
        setSuccess('Land record created.')
      }
      setShowForm(false)
      setRefreshVersion((version) => version + 1)
    } catch (saveError) {
      setError(messageOf(saveError))
    } finally {
      setSaving(false)
    }
  }

  const removeLand = async (land: ApiLand) => {
    if (!window.confirm(`Delete "${land.name}"? This is only allowed when no projects depend on this land.`)) return
    setDeletingId(land.id)
    setError(null)
    setSuccess(null)
    try {
      await deleteLand(land.id)
      setSuccess('Land record deleted.')
      if (lands.length === 1 && page > 1) setPage((current) => current - 1)
      else setRefreshVersion((version) => version + 1)
    } catch (deleteError) {
      setError(messageOf(deleteError))
    } finally {
      setDeletingId(null)
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
    }
  }

  const stats = [
<<<<<<< HEAD
    { label: 'Total Lands', value: lands.length, icon: Map },
    { label: 'Available', value: lands.filter((l) => l.status === 'Available').length, icon: CheckCircle2 },
    { label: 'Allocated', value: lands.filter((l) => l.status === 'Allocated').length, icon: Building2 },
    { label: 'Under Development', value: lands.filter((l) => l.status === 'Under Development').length, icon: Ruler },
=======
    { label: 'Matching Lands', value: total, icon: Map },
    { label: 'Records on This Page', value: lands.length, icon: Building2 },
    ...areaUnits.filter((unit) => pageArea[unit] > 0).slice(0, 2).map((unit) => ({
      label: `Page area (${unitLabel(unit)})`,
      value: pageArea[unit].toLocaleString(undefined, { maximumFractionDigits: 2 }),
      icon: Ruler,
    })),
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  ]

  return (
    <AppShell currentPath="/app/lands">
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#8E827A]">Workspace / Land Management</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">Land Management</h1>
<<<<<<< HEAD
            <p className="mt-2 text-sm text-[#8E827A]">Manage land records, ownership, locations and allocation status.</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            <Plus size={17} /> Add Land
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
=======
            <p className="mt-2 text-sm text-[#8E827A]">{isAdmin ? 'Manage land records, ownership, locations, and area details.' : 'Land records associated with your assigned projects.'}</p>
          </div>
          {isAdmin && <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]"><Plus size={17} /> Add Land</button>}
        </section>

        {error && <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"><span>{error}</span><button onClick={() => setRefreshVersion((version) => version + 1)} className="shrink-0 underline">Retry</button></div>}
        {success && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{success}</p>}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-[#8E827A]">{label}</p><h2 className="mt-3 text-3xl font-semibold text-[#323232]">{value}</h2></div><div className="rounded-xl bg-[#F7F3EE] p-3 text-[#595552]"><Icon size={21} /></div></div></div>)}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#C8BCB4]/70 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 sm:flex-row sm:items-center">
<<<<<<< HEAD
            <div>
              <h2 className="font-semibold text-[#323232]">Land Records</h2>
              <p className="mt-1 text-xs text-[#8E827A]">{filteredLands.length} land records found</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                <Search size={17} className="text-[#8E827A]" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search land..." className="w-full bg-transparent text-sm outline-none sm:w-48" />
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                <option>All</option>
                <option>Available</option>
                <option>Allocated</option>
                <option>Under Development</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                <tr>
                  <th className="px-5 py-4 font-medium">Land Details</th>
                  <th className="px-5 py-4 font-medium">Location</th>
                  <th className="px-5 py-4 font-medium">Ownership</th>
                  <th className="px-5 py-4 font-medium">Area</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCD4]">
                {filteredLands.map((land) => (
                  <tr key={land.id} className="hover:bg-[#F7F3EE]/60">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[#323232]">{land.name}</p>
                      <p className="mt-1 text-xs text-[#8E827A]">{land.surveyNumber}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#595552]"><span className="flex items-center gap-1"><MapPin size={14} />{land.location}</span></td>
                    <td className="px-5 py-4 text-sm text-[#595552]">{land.owner}</td>
                    <td className="px-5 py-4 text-sm text-[#595552]">{land.area} {land.unit}</td>
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[land.status]}`}>{land.status}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(land)} title="Edit land" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                        <button onClick={() => deleteLand(land.id)} title="Delete land" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLands.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">No land records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form onSubmit={saveLand} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Land Details' : 'Add New Land'}</h2>
                <p className="mt-1 text-sm text-[#8E827A]">Enter land information below.</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-[#595552]">Land Name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter land name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
              <label className="text-sm font-medium text-[#595552]">Survey / Plot Number
                <input required value={form.surveyNumber} onChange={(e) => setForm({ ...form, surveyNumber: e.target.value })} placeholder="e.g. SV-105" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
              <label className="text-sm font-medium text-[#595552]">Location
                <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
              <label className="text-sm font-medium text-[#595552]">Owner Name
                <input required value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Enter owner name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
              </label>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <label className="text-sm font-medium text-[#595552]">Land Area
                  <input required type="number" min="0.01" step="0.01" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Enter area" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" />
                </label>
                <label className="text-sm font-medium text-[#595552]">Unit
                  <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-3 font-normal outline-none">
                    <option>Acres</option><option>Sq. Ft.</option><option>Sq. Yards</option><option>Hectares</option>
                  </select>
                </label>
              </div>
              <label className="text-sm font-medium text-[#595552]">Land Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Land['status'] })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-4 py-3 font-normal outline-none">
                  <option>Available</option><option>Allocated</option><option>Under Development</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editing ? 'Save Changes' : 'Add Land'}</button>
            </div>
          </form>
        </div>
      )}
=======
            <div><h2 className="font-semibold text-[#323232]">Land Records</h2><p className="mt-1 text-xs text-[#8E827A]">{total} records found</p></div>
            <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2"><Search size={17} className="text-[#8E827A]" /><input aria-label="Search lands" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search name or city..." className="w-full bg-transparent text-sm outline-none sm:w-56" /></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]"><tr><th className="px-5 py-4 font-medium">Land Details</th><th className="px-5 py-4 font-medium">Location</th><th className="px-5 py-4 font-medium">Ownership</th><th className="px-5 py-4 font-medium">Area</th><th className="px-5 py-4 font-medium">Created</th><th className="px-5 py-4 text-right font-medium">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#E8DCD4]">
                {loading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">Loading land records…</td></tr>
                  : lands.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-[#8E827A]">{search.trim() ? 'No lands match your search.' : 'No land records found.'}</td></tr>
                    : lands.map((land) => <tr key={land.id} className="hover:bg-[#F7F3EE]/60">
                      <td className="px-5 py-4"><p className="text-sm font-medium text-[#323232]">{land.name}</p><p className="mt-1 text-xs text-[#8E827A]">{land.surveyNumber || 'No survey number'}</p></td>
                      <td className="px-5 py-4 text-sm text-[#595552]"><span className="flex items-center gap-1"><MapPin size={14} />{[land.city, land.state].filter(Boolean).join(', ')}{land.pincode ? ` ${land.pincode}` : ''}</span>{land.addressLine && <p className="mt-1 text-xs text-[#8E827A]">{land.addressLine}</p>}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{land.ownerName || '—'}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{Number(land.areaValue).toLocaleString()} {unitLabel(land.areaUnit)}</td>
                      <td className="px-5 py-4 text-sm text-[#595552]">{dateLabel(land.createdAt)}</td>
                      <td className="px-5 py-4"><div className="flex justify-end gap-2">
                        {isAdmin && <button onClick={() => openEdit(land)} title="Edit land" aria-label={`Edit ${land.name}`} className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>}
                        {isAdmin && <button disabled={deletingId === land.id} onClick={() => void removeLand(land)} title="Delete land" aria-label={`Delete ${land.name}`} className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA] disabled:opacity-50"><Trash2 size={16} /></button>}
                        {!isAdmin && <span className="px-2 py-1 text-xs text-[#8E827A]">Read only</span>}
                      </div></td>
                    </tr>)}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8DCD4] px-5 py-3 text-sm text-[#595552]"><span>Page {page} of {totalPages}</span><div className="flex gap-2"><button disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#C8BCB4] px-3 py-1.5 disabled:opacity-50">Previous</button><button disabled={page >= totalPages || loading} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#C8BCB4] px-3 py-1.5 disabled:opacity-50">Next</button></div></div>
        </section>
      </div>

      {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
        <form onSubmit={(event) => void saveLand(event)} className="my-6 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-[#323232]">{editing ? 'Edit Land Details' : 'Add New Land'}</h2><p className="mt-1 text-sm text-[#8E827A]">Enter land information below.</p></div><button type="button" onClick={() => setShowForm(false)} aria-label="Close land form" className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#595552]">Land Name<input required maxLength={255} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Enter land name" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Survey / Plot Number<input maxLength={100} value={form.surveyNumber ?? ''} onChange={(event) => setForm({ ...form, surveyNumber: event.target.value })} placeholder="Optional" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">City<input required maxLength={100} value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">State<input required maxLength={100} value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Address<input maxLength={500} value={form.addressLine ?? ''} onChange={(event) => setForm({ ...form, addressLine: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Pincode<input maxLength={20} value={form.pincode ?? ''} onChange={(event) => setForm({ ...form, pincode: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Land Area<input required type="number" min="0.01" step="0.01" value={form.areaValue || ''} onChange={(event) => setForm({ ...form, areaValue: Number(event.target.value) })} placeholder="Enter area" className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Area Unit<select value={form.areaUnit} onChange={(event) => setForm({ ...form, areaUnit: event.target.value as AreaUnit })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-3 font-normal outline-none">{areaUnits.map((unit) => <option key={unit} value={unit}>{unitLabel(unit)}</option>)}</select></label>
            <label className="text-sm font-medium text-[#595552]">Owner Name<input maxLength={255} value={form.ownerName ?? ''} onChange={(event) => setForm({ ...form, ownerName: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Purchase Date<input type="date" value={form.purchaseDate ?? ''} onChange={(event) => setForm({ ...form, purchaseDate: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552]">Purchase Cost<input type="number" min="0" step="0.01" value={form.purchaseCost ?? ''} onChange={(event) => setForm({ ...form, purchaseCost: event.target.value ? Number(event.target.value) : null })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
            <label className="text-sm font-medium text-[#595552] sm:col-span-2">Notes<textarea maxLength={2000} rows={3} value={form.notes ?? ''} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-2 w-full rounded-xl border border-[#C8BCB4] px-4 py-3 font-normal outline-none" /></label>
          </div>
          {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button><button type="submit" disabled={saving} className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Land'}</button></div>
        </form>
      </div>}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
    </AppShell>
  )
}
