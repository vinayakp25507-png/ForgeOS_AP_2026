// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'
// Imports Breadcrumbs from ../../app-shell/components/Breadcrumbs so this module can reuse that component, helper, or library.
import { Breadcrumbs } from '../../app-shell/components/Breadcrumbs'
// Imports getProjectLogs from ../data/projectLogStore so this module can reuse that component, helper, or library.
import { getProjectLogs } from '../data/projectLogStore'
// Imports ProjectLogsListing from ../components/ProjectLogsListing so this module can reuse that component, helper, or library.
import { ProjectLogsListing } from '../components/ProjectLogsListing'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface ProjectLogsPageProps {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines ProjectLogsPage so this module can perform its named task when needed.
export function ProjectLogsPage({ projectId }: ProjectLogsPageProps) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return <AppShell currentPath={`/projects/${projectId}/logs`}><div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-10"><Breadcrumbs current="Daily Site Logs" /></div><ProjectLogsListing initialLogs={getProjectLogs(projectId)} projectId={projectId} /></AppShell>
// Closes the current block or object so the grouped statements or settings end here.
}
