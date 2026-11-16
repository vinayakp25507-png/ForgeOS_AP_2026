// Imports hasPermission, isAdmin from ./features/authentication/utils/permissions so this module can reuse that component, helper, or library.
import { hasPermission, isAdmin } from './features/authentication/utils/permissions'
// Imports LandsPage from ./features/lands/pages/LandsPage so this module can reuse that component, helper, or library.
import { LandsPage } from './features/lands/pages/LandsPage'
// Imports ProjectsPage from ./features/projects/pages/ProjectsPage so this module can reuse that component, helper, or library.
import { ProjectsPage } from './features/projects/pages/ProjectsPage'
// Imports ProjectDetailsPage from ./features/projects/pages/ProjectDetailsPage so this module can reuse that component, helper, or library.
import { ProjectDetailsPage } from './features/projects/pages/ProjectDetailsPage'
// Imports UsersPage from ./features/users/pages/UsersPage so this module can reuse that component, helper, or library.
import { UsersPage } from './features/users/pages/UsersPage'
// Imports BillsPage from ./features/bills/pages/BillsPage so this module can reuse that component, helper, or library.
import { BillsPage } from './features/bills/pages/BillsPage'
// Imports VendorsPage from ./features/vendors/pages/VendorsPage so this module can reuse that component, helper, or library.
import { VendorsPage } from './features/vendors/pages/VendorsPage'
// Imports useEffect, useState from react so this module can reuse that component, helper, or library.
import { useEffect, useState } from 'react'
// Imports Navbar from ./components/Navbar so this module can reuse that component, helper, or library.
import { Navbar } from './components/Navbar'
// Imports Hero from ./components/Hero so this module can reuse that component, helper, or library.
import { Hero } from './components/Hero'
// Imports Features from ./components/Features so this module can reuse that component, helper, or library.
import { Features } from './components/Features'
// Imports HowItWorks from ./components/HowItWorks so this module can reuse that component, helper, or library.
import { HowItWorks } from './components/HowItWorks'
// Imports ProductGallery from ./components/ProductGallery so this module can reuse that component, helper, or library.
import { ProductGallery } from './components/ProductGallery'
// Imports PerspectiveTunnelHero from ./components/ui/perspective-tunnel-hero so this module can reuse that component, helper, or library.
import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero'
// Imports Testimonials from ./components/Testimonials so this module can reuse that component, helper, or library.
import { Testimonials } from './components/Testimonials'
// Imports Footer from ./components/Footer so this module can reuse that component, helper, or library.
import { Footer } from './components/Footer'
// Imports SiteStoryReveal from ./components/SiteStoryReveal so this module can reuse that component, helper, or library.
import SiteStoryReveal from './components/SiteStoryReveal'
// Imports DailyLogsPage from ./features/daily-logs/pages/DailyLogsPage so this module can reuse that component, helper, or library.
import { DailyLogsPage } from './features/daily-logs/pages/DailyLogsPage'
// Imports ProgressHistoryPage from ./features/progress-history/pages/ProgressHistoryPage so this module can reuse that component, helper, or library.
import { ProgressHistoryPage } from './features/progress-history/pages/ProgressHistoryPage'
// Imports ComingSoonPage from ./features/app-shell/pages/ComingSoonPage so this module can reuse that component, helper, or library.
import { ComingSoonPage } from './features/app-shell/pages/ComingSoonPage'
// Imports ProjectLogsPage from ./features/daily-logs/pages/ProjectLogsPage so this module can reuse that component, helper, or library.
import { ProjectLogsPage } from './features/daily-logs/pages/ProjectLogsPage'
// Imports ProjectLogFormPage from ./features/daily-logs/pages/ProjectLogFormPage so this module can reuse that component, helper, or library.
import { ProjectLogFormPage } from './features/daily-logs/pages/ProjectLogFormPage'
// Imports ProjectLogDetailPage from ./features/daily-logs/pages/ProjectLogDetailPage so this module can reuse that component, helper, or library.
import { ProjectLogDetailPage } from './features/daily-logs/pages/ProjectLogDetailPage'
// Imports ProjectProgressPage from ./features/progress-history/pages/ProjectProgressPage so this module can reuse that component, helper, or library.
import { ProjectProgressPage } from './features/progress-history/pages/ProjectProgressPage'
// Imports LoginPage from ./features/authentication/pages/LoginPage so this module can reuse that component, helper, or library.
import { LoginPage } from './features/authentication/pages/LoginPage'
// Imports MaterialsPage from ./features/materials/pages/MaterialsPage so this module can reuse that component, helper, or library.
import { MaterialsPage } from './features/materials/pages/MaterialsPage'
// Imports MaterialPlanningPage from ./features/materials/pages/MaterialPlanningPage so this module can reuse that component, helper, or library.
import { MaterialPlanningPage } from './features/materials/pages/MaterialPlanningPage'
// Imports StockInPage from ./features/stock/pages/StockInPage so this module can reuse that component, helper, or library.
import { StockInPage } from './features/stock/pages/StockInPage'
// Imports StockOutPage from ./features/stock/pages/StockOutPage so this module can reuse that component, helper, or library.
import { StockOutPage } from './features/stock/pages/StockOutPage'
// Imports StockLedgerPage from ./features/stock/pages/StockLedgerPage so this module can reuse that component, helper, or library.
import { StockLedgerPage } from './features/stock/pages/StockLedgerPage'
// Imports StockDashboardPage from ./features/stock/pages/StockDashboardPage so this module can reuse that component, helper, or library.
import { StockDashboardPage } from './features/stock/pages/StockDashboardPage'
// Imports WastageAnalysisPage from ./features/wastage/pages/WastageAnalysisPage so this module can reuse that component, helper, or library.
import { WastageAnalysisPage } from './features/wastage/pages/WastageAnalysisPage'
// Imports AdminDashboardPage from ./features/app-shell/pages/AdminDashboardPage so this module can reuse that component, helper, or library.
import { AdminDashboardPage } from './features/app-shell/pages/AdminDashboardPage'
// Imports ProjectManagerDashboardPage from ./features/app-shell/pages/ProjectManagerDashboardPage so this module can reuse that component, helper, or library.
import { ProjectManagerDashboardPage } from './features/app-shell/pages/ProjectManagerDashboardPage'

// Defines App so this module can perform its named task when needed.
export function App() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [pathname, setPathname] = useState(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    window.location.hash === '#login' ? '#login' : window.location.pathname
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Stores the value in handleLocationChange so later lines can reuse this data or behavior for the current feature.
    const handleLocationChange = () => {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setPathname(
        // Continues the component or data expression so its related values and behavior stay grouped together.
        window.location.hash === '#login'
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ? '#login'
          // Continues the component or data expression so its related values and behavior stay grouped together.
          : window.location.pathname
      // Closes this function call or grouped expression so the surrounding code can continue.
      )
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    window.addEventListener('popstate', handleLocationChange)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    window.addEventListener('hashchange', handleLocationChange)

    // Returns the result so the caller or React receives the value or interface this function provides.
    return () => {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.removeEventListener('popstate', handleLocationChange)
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.removeEventListener('hashchange', handleLocationChange)
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [])

  // Stores the value in pathParts so later lines can reuse this data or behavior for the current feature.
  const pathParts = pathname.split('/').filter(Boolean)

  // Stores the value in isProtectedRoute so later lines can reuse this data or behavior for the current feature.
  const isProtectedRoute =
    // Continues the component or data expression so its related values and behavior stay grouped together.
    pathname === '/app' ||
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    pathname.startsWith('/app/') ||
    // Continues the component or data expression so its related values and behavior stay grouped together.
    pathParts[0] === 'projects' ||
    // Continues the component or data expression so its related values and behavior stay grouped together.
    pathname === '/daily-logs'


  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (isProtectedRoute && !hasPermission(['Admin', 'Project Manager'])) {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <LoginPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '#login' || pathname === '/login') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <LoginPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/login') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <LoginPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 4 && pathParts[0] === 'projects' && pathParts[2] === 'logs' && pathParts[3] === 'new') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectLogFormPage projectId={pathParts[1]} />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 5 && pathParts[0] === 'projects' && pathParts[2] === 'logs' && pathParts[4] === 'edit') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectLogFormPage logId={pathParts[3]} projectId={pathParts[1]} />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 4 && pathParts[0] === 'projects' && pathParts[2] === 'logs') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectLogDetailPage logId={pathParts[3]} projectId={pathParts[1]} />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 3 && pathParts[0] === 'projects' && pathParts[2] === 'progress') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectProgressPage projectId={pathParts[1]} />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 3 && pathParts[0] === 'projects' && pathParts[2] === 'logs') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectLogsPage projectId={pathParts[1]} />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/daily-logs' || pathname === '/app/daily-logs') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <DailyLogsPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/progress-history') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProgressHistoryPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return isAdmin() ? <AdminDashboardPage /> : <ProjectManagerDashboardPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/pm/dashboard') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return hasPermission(['Project Manager', 'Admin'])
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? <ProjectManagerDashboardPage />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : <ComingSoonPage title="Access Denied - Project Manager Only" />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/admin/dashboard') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return hasPermission(['Admin'])
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? <AdminDashboardPage />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : <ComingSoonPage title="Access Denied - Admin Only" />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/users') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return hasPermission(['Admin'])
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? <UsersPage />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : <ComingSoonPage title="Access Denied - Admin Only" />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathParts.length === 3 && pathParts[0] === 'app' && pathParts[1] === 'projects') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectDetailsPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/projects') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ProjectsPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/lands') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return hasPermission(['Admin'])
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? <LandsPage />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : <ComingSoonPage title="Access Denied - Admin Only" />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/bills/upload') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <BillsPage openUpload />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/bills') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <BillsPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/vendors') {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return hasPermission(['Admin'])
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? <VendorsPage />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : <ComingSoonPage title="Access Denied - Admin Only" />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/materials') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <MaterialsPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/material-planning') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <MaterialPlanningPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/stock') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <StockDashboardPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/stock-in') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <StockInPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/stock-out') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <StockOutPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/stock-ledger') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <StockLedgerPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname === '/app/wastage') {
    /* Returns the result so the caller or React receives the value or interface this function provides. */
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <WastageAnalysisPage />
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (pathname.startsWith('/app/')) {
    // Stores the value in section so later lines can reuse this data or behavior for the current feature.
    const section = pathname.split('/')[2] ?? 'Workspace'
    // Stores the value in title so later lines can reuse this data or behavior for the current feature.
    const title = section.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    // Returns the result so the caller or React receives the value or interface this function provides.
    return <ComingSoonPage title={title} />
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="forgeos-landing min-h-screen flex flex-col font-sans selection:bg-[#F2A65A] selection:text-[#171717]">
      {/* Starts the <Navbar> element to organize this part of the interface. */}
      <Navbar />
      {/* Starts the <main> element to identify the page’s primary content. */}
      <main className="flex-grow">
        {/* Starts the <Hero> element to organize this part of the interface. */}
        <Hero />
        {/* Starts the <SiteStoryReveal> element to organize this part of the interface. */}
        <SiteStoryReveal />
        {/* Starts the <Features> element to organize this part of the interface. */}
        <Features />
        {/* Starts the <HowItWorks> element to organize this part of the interface. */}
        <HowItWorks />
        {/* Starts the <ProductGallery> element to organize this part of the interface. */}
        <ProductGallery />
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section id="showcase" className="relative border-t border-[#323232]/15">
          {/* Starts the <PerspectiveTunnelHero> element to organize this part of the interface. */}
          <PerspectiveTunnelHero />
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
        {/* Starts the <Testimonials> element to organize this part of the interface. */}
        <Testimonials />
      {/* Closes the <main> element so later content is no longer part of this region. */}
      </main>
      {/* Starts the <Footer> element to organize this part of the interface. */}
      <Footer />
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}

// Exports App as this file’s default value so other modules can load the main feature.
export default App
