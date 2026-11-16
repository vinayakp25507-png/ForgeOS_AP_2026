// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ArrowDownToLine,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ArrowUpFromLine,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  BarChart3,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Boxes,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Building2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ClipboardCheck,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ClipboardList,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  CreditCard,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  FolderKanban,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  LayoutDashboard,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Map,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Menu,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  PackageCheck,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  PackageSearch,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  PanelLeftClose,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  PanelLeftOpen,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ScrollText,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  TrendingUp,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  UsersRound,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports type  LucideIcon from lucide-react so this module can reuse that component, helper, or library.
import type { LucideIcon } from 'lucide-react'
// Imports getCurrentRole, getAssignedProject from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { getCurrentRole, getAssignedProject } from '../../authentication/utils/permissions'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface SidebarProps {
  // Sets the currentPath field so the surrounding object or component receives this setting.
  currentPath: string
  // Sets the collapsed field so the surrounding object or component receives this setting.
  collapsed: boolean
  // Sets the mobileOpen field so the surrounding object or component receives this setting.
  mobileOpen: boolean
  // Sets the onCloseMobile field so the surrounding object or component receives this setting.
  onCloseMobile: () => void
  // Sets the onToggleCollapsed field so the surrounding object or component receives this setting.
  onToggleCollapsed: () => void
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
interface NavItem {
  // Sets the label field so the surrounding object or component receives this setting.
  label: string
  // Sets the href field so the surrounding object or component receives this setting.
  href: string
  // Sets the icon field so the surrounding object or component receives this setting.
  icon: LucideIcon
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines Sidebar so this module can perform its named task when needed.
export function Sidebar({
  // Continues the component or data expression so its related values and behavior stay grouped together.
  currentPath,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  collapsed,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  mobileOpen,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  onCloseMobile,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  onToggleCollapsed,
// Continues the component or data expression so its related values and behavior stay grouped together.
}: SidebarProps) {
  // Stores the value in currentRole so later lines can reuse this data or behavior for the current feature.
  const currentRole = getCurrentRole() || 'Admin'
  // Stores the value in isPm so later lines can reuse this data or behavior for the current feature.
  const isPm = currentRole === 'Project Manager'
  // Stores the value in assigned so later lines can reuse this data or behavior for the current feature.
  const assigned = getAssignedProject()
  // Stores the value in projectCode so later lines can reuse this data or behavior for the current feature.
  const projectCode = assigned?.code || 'PRJ-001'

  // Stores the value in adminItems so later lines can reuse this data or behavior for the current feature.
  const adminItems: NavItem[] = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Dashboard', href: '/app/admin/dashboard', icon: LayoutDashboard },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'All Projects', href: '/app/projects', icon: FolderKanban },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Project Managers', href: '/app/users', icon: UsersRound },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Lands Portfolio', href: '/app/lands', icon: Map },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Daily Logs', href: '/app/daily-logs', icon: ClipboardList },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Materials Master', href: '/app/materials', icon: Boxes },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Material Planning', href: '/app/material-planning', icon: ClipboardCheck },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Available Stock', href: '/app/stock', icon: PackageSearch },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock IN (Deliveries)', href: '/app/stock-in', icon: ArrowDownToLine },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock OUT (Consumption)', href: '/app/stock-out', icon: ArrowUpFromLine },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock Ledger', href: '/app/stock-ledger', icon: ScrollText },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Wastage Analysis', href: '/app/wastage', icon: TrendingUp },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Vendors & Negotiations', href: '/app/vendors', icon: UsersRound },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Bills & Approvals', href: '/app/bills', icon: CreditCard },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Stores the value in managerItems so later lines can reuse this data or behavior for the current feature.
  const managerItems: NavItem[] = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Site Dashboard', href: '/app/pm/dashboard', icon: LayoutDashboard },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'My Project', href: '/app/projects', icon: FolderKanban },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Daily Site Logs', href: '/app/daily-logs', icon: ClipboardList },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Progress History', href: `/projects/${projectCode}/progress`, icon: BarChart3 },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Site Material Planning', href: '/app/material-planning', icon: ClipboardCheck },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Available Stock', href: '/app/stock', icon: PackageSearch },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock IN (Deliveries)', href: '/app/stock-in', icon: ArrowDownToLine },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock OUT (Usage)', href: '/app/stock-out', icon: ArrowUpFromLine },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Stock Ledger', href: '/app/stock-ledger', icon: ScrollText },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Wastage', href: '/app/wastage', icon: TrendingUp },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Vendors', href: '/app/vendors', icon: UsersRound },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Bills', href: '/app/bills', icon: CreditCard },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Upload Bills & Challans', href: '/app/bills/upload', icon: CreditCard },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Stores the value in navItems so later lines can reuse this data or behavior for the current feature.
  const navItems = isPm ? managerItems : adminItems

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <>
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {mobileOpen && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <button
          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          /* Connects the Click event to its handler so the interface can respond to interaction. */
          onClick={onCloseMobile}
          /* Chooses the element’s browser behavior, such as a button action or input format. */
          type="button"
          /* Provides aria-label accessibility information so assistive technology can describe the element. */
          aria-label="Close navigation"
        />
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* Starts the <aside> element to organize this part of the interface. */}
      <aside
        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
        className={`dashboard-sidebar fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-all duration-200 lg:static lg:z-auto ${
          /* Continues the component or data expression so its related values and behavior stay grouped together. */
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        /* Continues the component or data expression so its related values and behavior stay grouped together. */
        } ${collapsed ? 'w-[76px]' : 'w-[250px]'}`}
      >
        {/* Starts the <div> element to organize this part of the interface. */}
        <div
          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
          className={`flex h-16 shrink-0 items-center border-b border-[#E8E0DA] px-4 ${
            /* Continues the component or data expression so its related values and behavior stay grouped together. */
            collapsed ? 'justify-center' : 'justify-between'
          /* Continues the component or data expression so its related values and behavior stay grouped together. */
          }`}
        >
          {/* Starts the <a> element to provide navigation to another location. */}
          <a className="flex items-center gap-2" href="/">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="dashboard-logo flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              F
            {/* Closes the <span> element so later content is no longer part of this region. */}
            </span>
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            {!collapsed && (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <span className="text-sm font-bold tracking-[0.18em] text-white">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                FORGE<span className="font-light text-white/40">OS</span>
              {/* Closes the <span> element so later content is no longer part of this region. */}
              </span>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}
          {/* Closes the <a> element so later content is no longer part of this region. */}
          </a>

          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {!collapsed && (
            // Continues the component or data expression so its related values and behavior stay grouped together.
            <button
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className="hidden rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white lg:block"
              /* Connects the Click event to its handler so the interface can respond to interaction. */
              onClick={onToggleCollapsed}
              /* Chooses the element’s browser behavior, such as a button action or input format. */
              type="button"
              /* Provides aria-label accessibility information so assistive technology can describe the element. */
              aria-label="Collapse sidebar"
            >
              {/* Starts the <PanelLeftClose> element to organize this part of the interface. */}
              <PanelLeftClose className="h-4 w-4" />
            {/* Closes the <button> element so later content is no longer part of this region. */}
            </button>
          // Continues the component or data expression so its related values and behavior stay grouped together.
          )}
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {!collapsed && (
            // Continues the component or data expression so its related values and behavior stay grouped together.
            <div className="mb-2">
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {isPm ? 'Site Operations' : 'Administration'}
              {/* Closes the <p> element so later content is no longer part of this region. */}
              </p>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {isPm && assigned && (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div className="mx-2 mt-2 rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F2A65A]">
                    {/* Starts the <Building2> element to organize this part of the interface. */}
                    <Building2 size={12} />
                    {/* Starts the <span> element to organize this part of the interface. */}
                    <span>Assigned Site</span>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="mt-0.5 truncate text-xs font-bold text-white" title={assigned.name}>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {assigned.name}
                  {/* Closes the <p> element so later content is no longer part of this region. */}
                  </p>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="text-[10px] font-mono text-white/40">{assigned.code}</p>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          // Continues the component or data expression so its related values and behavior stay grouped together.
          )}

          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {navItems.map(({ label, href, icon: Icon }) => {
            // Stores the value in active so later lines can reuse this data or behavior for the current feature.
            const active =
              // Continues the component or data expression so its related values and behavior stay grouped together.
              currentPath === href ||
              // Continues the component or data expression so its related values and behavior stay grouped together.
              (href === '/app' && currentPath === '/app/') ||
              // Continues the component or data expression so its related values and behavior stay grouped together.
              (href === '/app/admin/dashboard' && (currentPath === '/app/admin/dashboard' || currentPath === '/app')) ||
              // Continues the component or data expression so its related values and behavior stay grouped together.
              (href === '/app/pm/dashboard' && (currentPath === '/app/pm/dashboard' || (isPm && currentPath === '/app'))) ||
              // Continues the component or data expression so its related values and behavior stay grouped together.
              (label.includes('Daily') && (currentPath === '/app/daily-logs' || currentPath.endsWith('/logs'))) ||
              // Continues the component or data expression so its related values and behavior stay grouped together.
              (label.includes('Progress') && currentPath.endsWith('/progress'))

            // Returns the result so the caller or React receives the value or interface this function provides.
            return (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <a
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  active
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    ? 'bg-[#F2A65A]/15 font-semibold text-[#F2A65A]'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    : 'font-medium text-white/55 hover:bg-white/[0.07] hover:text-white'
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                } ${collapsed ? 'justify-center' : ''}`}
                /* Sets the destination so activating this link or route control opens the intended screen. */
                href={href}
                /* Gives this rendered item a stable identity so React can update lists efficiently. */
                key={label}
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={onCloseMobile}
                /* Sets the title property so this element receives the data or behavior required by this screen. */
                title={collapsed ? label : undefined}
              >
                {/* Starts the <Icon> element to organize this part of the interface. */}
                <Icon className="h-[17px] w-[17px] shrink-0" />
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {!collapsed && <span className="truncate">{label}</span>}
              {/* Closes the <a> element so later content is no longer part of this region. */}
              </a>
            // Closes this function call or grouped expression so the surrounding code can continue.
            )
          // Continues the component or data expression so its related values and behavior stay grouped together.
          })}
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Starts the <div> element to organize this part of the interface. */}
        <div className={`border-t border-white/10 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {!collapsed && (
            // Continues the component or data expression so its related values and behavior stay grouped together.
            <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.05] p-3">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2">
                {/* Starts the <PackageCheck> element to organize this part of the interface. */}
                <PackageCheck className="h-4 w-4 text-[#F2A65A]" />
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs font-semibold text-white/80">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {isPm ? 'Site milestone' : 'Portfolio progress'}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="h-full w-[65%] rounded-full bg-[#F2A65A]" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-[10px] text-white/35">
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {isPm ? (assigned ? `${assigned.code} on schedule` : 'On track') : '5 projects active'}
              {/* Closes the <p> element so later content is no longer part of this region. */}
              </p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          // Continues the component or data expression so its related values and behavior stay grouped together.
          )}

          {/* Starts the <button> element to provide an action the user can activate. */}
          <button
            /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
            className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-white/40 hover:bg-white/10 hover:text-white"
            /* Connects the Click event to its handler so the interface can respond to interaction. */
            onClick={onToggleCollapsed}
            /* Chooses the element’s browser behavior, such as a button action or input format. */
            type="button"
            /* Provides aria-label accessibility information so assistive technology can describe the element. */
            aria-label="Toggle sidebar width"
          >
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            {collapsed ? (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <PanelLeftOpen className="h-4 w-4" />
            // Continues the component or data expression so its related values and behavior stay grouped together.
            ) : (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <Menu className="h-4 w-4" />
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            {!collapsed && 'Collapse menu'}
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <aside> element so later content is no longer part of this region. */}
      </aside>
    {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
    </>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
// Exports Sidebar as this file’s default value so other modules can load the main feature.
export default Sidebar
