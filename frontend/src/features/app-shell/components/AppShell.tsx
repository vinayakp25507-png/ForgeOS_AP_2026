import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

interface AppShellProps {
  currentPath: string
  children: ReactNode
<<<<<<< HEAD
  projectSelector?: {
    value: string
    options: Array<{ id: string; name: string }>
    onChange: (value: string) => void
  }
}

export function AppShell({ currentPath, children, projectSelector }: AppShellProps) {
=======
}

export function AppShell({ currentPath, children }: AppShellProps) {
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  return <div className="dashboard-shell min-h-screen text-[var(--dashboard-ink)]">
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} currentPath={currentPath} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} onToggleCollapsed={() => setCollapsed((value) => !value)} />
      <div className="min-w-0 flex-1">
        <Topbar
          collapsed={collapsed}
          onOpenMobileNav={() => setMobileOpen(true)}
<<<<<<< HEAD
          projectSelector={projectSelector}
=======
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
        />
        <main className="dashboard-page-transition min-h-screen pt-16">{children}</main>
      </div>
    </div>
  </div>
}
