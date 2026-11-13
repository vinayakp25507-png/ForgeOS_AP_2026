import { AppShell } from '../../app-shell/components/AppShell'
<<<<<<< HEAD
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
import { getProjectLogs } from '../data/projectLogStore'
=======
import { useProjects } from '../../projects/useProjects'
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
import { ProjectLogsListing } from '../components/ProjectLogsListing'

interface ProjectLogsPageProps {
  projectId: string
}

export function ProjectLogsPage({ projectId }: ProjectLogsPageProps) {
<<<<<<< HEAD
  return <AppShell currentPath={`/projects/${projectId}/logs`}><div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-10"><Breadcrumbs current="Daily Site Logs" /></div><ProjectLogsListing initialLogs={getProjectLogs(projectId)} projectId={projectId} /></AppShell>
=======
  const { projects, isLoading, error, retry } = useProjects()
  const projectIsAccessible = projects.some((project) => String(project.id) === projectId)

  return <AppShell currentPath={`/projects/${projectId}/logs`}>
    {isLoading ? <div aria-live="polite" className="mx-auto max-w-5xl p-8 text-sm text-[#8E827A]">Loading accessible projects…</div>
      : error ? <div role="alert" className="mx-auto max-w-5xl p-8"><p className="text-sm text-rose-700">{error}</p><button type="button" onClick={retry} className="mt-4 rounded-lg bg-[#323232] px-4 py-2 text-sm text-white">Retry</button></div>
        : projectIsAccessible ? <ProjectLogsListing projectId={projectId} />
          : <div role="alert" className="mx-auto max-w-5xl p-8"><h1 className="text-xl font-semibold">Project unavailable</h1><p className="mt-2 text-sm text-[#8E827A]">This project is not in your accessible project list.</p></div>}
  </AppShell>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
}
