<<<<<<< HEAD
import { useMemo } from 'react'
import { ArrowLeft, CalendarDays, MapPin, UserRound, Wallet } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { getCurrentRole, getCurrentUser } from '../../authentication/utils/permissions'

interface Project {
  id: string
  code: string
  name: string
  location: string
  manager: string
  budget: number | string
  startDate: string
  endDate: string
  status: string
=======
import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, MapPin, UserRound, Wallet } from 'lucide-react'
import { AppShell } from '../../app-shell/components/AppShell'
import { apiGet, ApiError } from '../../../lib/api'
import { mapProject, type ApiProject } from '../project-utils'
import type { Project } from '../projects-context'

const statusLabels: Record<Project['status'], string> = {
  PLANNING: 'Planning',
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : 'Not specified'
}

function formatBudget(value: string | number) {
  const amount = Number(value)
  return Number.isFinite(amount)
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount)
    : 'Not specified'
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}

export function ProjectDetailsPage() {
  const projectId = window.location.pathname.split('/').filter(Boolean)[2]
<<<<<<< HEAD

  const project = useMemo(() => {
    try {
      const saved = localStorage.getItem('forgeos_projects')
      const projects: Project[] = saved ? JSON.parse(saved) : []
      const found = projects.find((item) => String(item.id) === String(projectId))
      const role = getCurrentRole()
      const user = getCurrentUser()
      if (role === 'Admin') return found
      return found && String(found.manager).trim().toLowerCase() ===
        String(user?.name ?? '').trim().toLowerCase() ? found : undefined
    } catch {
      return undefined
    }
  }, [projectId])
=======
  const [result, setResult] = useState<{
    key: string
    project: Project | null
    error: string | null
  } | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const requestKey = `${projectId ?? ''}:${retryCount}`
  const validProjectId = /^\d+$/.test(projectId ?? '')

  useEffect(() => {
    if (!validProjectId) return
    const controller = new AbortController()
    apiGet<ApiProject>(`/projects/${encodeURIComponent(projectId)}`, { signal: controller.signal })
      .then(({ data }) => {
        setResult({ key: requestKey, project: mapProject(data), error: null })
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setResult({
          key: requestKey,
          project: null,
          error: cause instanceof ApiError && cause.status === 404
            ? 'This project is unavailable to your account.'
            : cause instanceof Error ? cause.message : 'Unable to load project details.',
        })
      })

    return () => controller.abort()
  }, [projectId, requestKey, validProjectId])

  const currentResult = result?.key === requestKey ? result : null
  const project = currentResult?.project ?? null
  const error = validProjectId ? currentResult?.error ?? null : 'The project ID is invalid.'
  const isLoading = validProjectId && !currentResult
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

  return (
    <AppShell currentPath="/app/projects">
      <div className="mx-auto max-w-5xl space-y-6 p-5 sm:p-7 lg:p-8">
        <button
          type="button"
          onClick={() => { window.location.href = '/app/projects' }}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#595552] hover:text-[#323232]"
        >
          <ArrowLeft size={17} /> Back to Projects
        </button>

<<<<<<< HEAD
        {!project ? (
          <section className="rounded-2xl border border-[#C8BCB4] bg-white p-8">
            <h1 className="text-xl font-semibold text-[#323232]">Project not found</h1>
            <p className="mt-2 text-sm text-[#8E827A]">
              This project is unavailable in the saved project list.
            </p>
          </section>
        ) : (
=======
        {isLoading ? (
          <section aria-live="polite" className="rounded-2xl border border-[#C8BCB4] bg-white p-8 text-sm text-[#8E827A]">
            Loading project details…
          </section>
        ) : error ? (
          <section role="alert" className="rounded-2xl border border-[#C8BCB4] bg-white p-8">
            <h1 className="text-xl font-semibold text-[#323232]">Project unavailable</h1>
            <p className="mt-2 text-sm text-[#8E827A]">{error}</p>
            <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-5 rounded-xl bg-[#323232] px-4 py-2 text-sm font-medium text-white">Retry</button>
          </section>
        ) : project ? (
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
          <>
            <section className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-6">
              <p className="text-sm font-medium text-[#8E827A]">{project.code}</p>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold text-[#323232]">{project.name}</h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#8E827A]">
                    <MapPin size={16} /> {project.location}
                  </p>
                </div>
                <span className="rounded-full bg-[#F7F3EE] px-3 py-1.5 text-sm font-medium text-[#595552]">
<<<<<<< HEAD
                  {project.status}
=======
                  {statusLabels[project.status]}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
                </span>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              {[
<<<<<<< HEAD
                { label: 'Project Manager', value: project.manager, icon: UserRound },
                { label: 'Budget', value: String(project.budget), icon: Wallet },
                { label: 'Start Date', value: project.startDate, icon: CalendarDays },
                { label: 'End Date', value: project.endDate, icon: CalendarDays },
=======
                { label: 'Project Manager', value: project.assignedPm?.name ?? 'Unassigned', icon: UserRound },
                { label: 'Budget', value: formatBudget(project.totalBudget), icon: Wallet },
                { label: 'Start Date', value: formatDate(project.startDate), icon: CalendarDays },
                { label: 'Expected End Date', value: formatDate(project.expectedEndDate), icon: CalendarDays },
                { label: 'Actual End Date', value: formatDate(project.actualEndDate), icon: CalendarDays },
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-[#C8BCB4]/70 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm text-[#8E827A]">
                    <Icon size={17} /> {label}
                  </div>
<<<<<<< HEAD
                  <p className="mt-3 font-semibold text-[#323232]">{value || 'Not specified'}</p>
=======
                  <p className="mt-3 font-semibold text-[#323232]">{value}</p>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
                </div>
              ))}
            </section>
          </>
<<<<<<< HEAD
        )}
=======
        ) : null}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
      </div>
    </AppShell>
  )
}
