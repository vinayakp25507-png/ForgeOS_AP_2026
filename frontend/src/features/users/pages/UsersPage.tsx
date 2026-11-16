// Imports useMemo, useState, useEffect from react so this module can reuse that component, helper, or library.
import { useMemo, useState, useEffect } from 'react'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Search, Plus, Users, ShieldCheck, BriefcaseBusiness,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  UserCheck, Pencil, Trash2, X
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react'
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell'

// Continues the component or data expression so its related values and behavior stay grouped together.
type User = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the email field so the surrounding object or component receives this setting.
  email: string
  // Sets the role field so the surrounding object or component receives this setting.
  role: 'Admin' | 'Project Manager'
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'Active' | 'Inactive'
  // Sets the joined field so the surrounding object or component receives this setting.
  joined: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in initialUsers so later lines can reuse this data or behavior for the current feature.
const initialUsers: User[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 1, name: 'Aarav Sharma', email: 'aarav@forgeos.com', role: 'Admin', status: 'Active', joined: '12 Jan 2026' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 2, name: 'Priya Mehta', email: 'priya@forgeos.com', role: 'Project Manager', status: 'Active', joined: '18 Feb 2026' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 3, name: 'Rohan Verma', email: 'rohan@forgeos.com', role: 'Project Manager', status: 'Active', joined: '04 Mar 2026' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 4, name: 'Neha Kapoor', email: 'neha@forgeos.com', role: 'Project Manager', status: 'Inactive', joined: '21 Mar 2026' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Defines UsersPage so this module can perform its named task when needed.
export function UsersPage() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [users, setUsers] = useState<User[]>(() => {
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in saved so later lines can reuse this data or behavior for the current feature.
      const saved = localStorage.getItem('forgeos_users')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return saved ? JSON.parse(saved) as User[] : initialUsers
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } catch {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialUsers
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem('forgeos_users', JSON.stringify(users))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [users])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [search, setSearch] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [roleFilter, setRoleFilter] = useState('All')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [showForm, setShowForm] = useState(false)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [editingUser, setEditingUser] = useState<User | null>(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [name, setName] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [email, setEmail] = useState('')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [role, setRole] = useState<User['role']>('Project Manager')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [status, setStatus] = useState<User['status']>('Active')

  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  // Caches filteredUsers so its calculation is repeated only when its inputs change.
  const filteredUsers = useMemo(() => users.filter((user) => {
    // Stores the value in matchesSearch so later lines can reuse this data or behavior for the current feature.
    const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    // Stores the value in matchesRole so later lines can reuse this data or behavior for the current feature.
    const matchesRole = roleFilter === 'All' || user.role === roleFilter
    // Returns the result so the caller or React receives the value or interface this function provides.
    return matchesSearch && matchesRole
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), [users, search, roleFilter])

  // Stores the value in openAddForm so later lines can reuse this data or behavior for the current feature.
  const openAddForm = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditingUser(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setName('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEmail('')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setRole('Project Manager')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setStatus('Active')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in openEditForm so later lines can reuse this data or behavior for the current feature.
  const openEditForm = (user: User) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEditingUser(user)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setName(user.name)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setEmail(user.email)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setRole(user.role)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setStatus(user.status)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(true)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in saveUser so later lines can reuse this data or behavior for the current feature.
  const saveUser = (event: React.FormEvent<HTMLFormElement>) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    event.preventDefault()
    // Stores the value in normalizedEmail so later lines can reuse this data or behavior for the current feature.
    const normalizedEmail = email.trim().toLowerCase()
    // Stores the value in duplicateEmail so later lines can reuse this data or behavior for the current feature.
    const duplicateEmail = users.some((user) =>
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      user.email.trim().toLowerCase() === normalizedEmail &&
      // Continues the component or data expression so its related values and behavior stay grouped together.
      user.id !== editingUser?.id
    // Closes this function call or grouped expression so the surrounding code can continue.
    )
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (duplicateEmail) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.alert('This email is already registered. Please use a different email.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!name.trim() || !normalizedEmail) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      window.alert('Please enter a valid name and email address.')
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (editingUser) {
      // Transforms each collection item so the corresponding values or interface elements can be produced.
      setUsers((current) => current.map((user) =>
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        user.id === editingUser.id ? { ...user, name: name.trim(), email: normalizedEmail, role, status } : user
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setUsers((current) => [...current, {
        // Sets the id field so the surrounding object or component receives this setting.
        id: Date.now(), name: name.trim(), email: normalizedEmail, role, status,
        // Sets the joined field so the surrounding object or component receives this setting.
        joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }])
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setShowForm(false)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in deleteUser so later lines can reuse this data or behavior for the current feature.
  const deleteUser = (id: number) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Keeps only items matching this condition so the result contains relevant data.
      setUsers((current) => current.filter((user) => user.id !== id))
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in stats so later lines can reuse this data or behavior for the current feature.
  const stats = [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    { label: 'Total Users', value: users.length, icon: Users },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Administrators', value: users.filter((u) => u.role === 'Admin').length, icon: ShieldCheck },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Project Managers', value: users.filter((u) => u.role === 'Project Manager').length, icon: BriefcaseBusiness },
    // Keeps only items matching this condition so the result contains relevant data.
    { label: 'Active Users', value: users.filter((u) => u.status === 'Active').length, icon: UserCheck },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/users">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-7 lg:p-8">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-sm text-[#8E827A]">Workspace / Administration</p>
            {/* Starts the <h1> element to organize this part of the interface. */}
            <h1 className="mt-1 text-2xl font-semibold text-[#323232] sm:text-3xl">User Management</h1>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="mt-2 text-sm text-[#8E827A]">Manage your team members, roles and access status.</p>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button onClick={openAddForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E1E1E]">
            {/* Starts the <Plus> element to organize this part of the interface. */}
            <Plus size={17} /> Add User
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>

        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
          {stats.map((stat) => {
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
                    <h2 className="mt-3 text-3xl font-semibold text-[#323232]">{stat.value}</h2>
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
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8DCD4] p-5 sm:flex-row sm:items-center">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h2> element to organize this part of the interface. */}
              <h2 className="font-semibold text-[#323232]">Team Members</h2>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="mt-1 text-xs text-[#8E827A]">{filteredUsers.length} members found</p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center gap-2 rounded-xl border border-[#C8BCB4] px-3 py-2">
                {/* Starts the <Search> element to organize this part of the interface. */}
                <Search size={17} className="text-[#8E827A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full bg-transparent text-sm outline-none sm:w-48" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <select> element to collect or display a value. */}
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-xl border border-[#C8BCB4] bg-white px-3 py-2 text-sm text-[#595552] outline-none">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="All">All Roles</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="Admin">Admin</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="Project Manager">Project Manager</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full min-w-[720px] text-left">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#F7F3EE] text-xs text-[#8E827A]">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">User</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Role</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Status</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 font-medium">Joined Date</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8DCD4]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filteredUsers.map((user) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr key={user.id} className="hover:bg-[#F7F3EE]/60">
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-sm font-medium text-[#323232]">{user.name}</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="mt-1 text-xs text-[#8E827A]">{user.email}</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{user.role}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.status === 'Active' ? 'bg-[#E8EFE5] text-[#617858]' : 'bg-[#F5EDE1] text-[#9A7950]'}`}>{user.status}</span>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4 text-sm text-[#595552]">{user.joined}</td>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td className="px-5 py-4">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-end gap-2">
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button onClick={() => openEditForm(user)} title="Edit user" className="rounded-lg p-2 text-[#595552] hover:bg-[#F7F3EE]"><Pencil size={16} /></button>
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button onClick={() => deleteUser(user.id)} title="Delete user" className="rounded-lg p-2 text-[#9B625A] hover:bg-[#F8ECEA]"><Trash2 size={16} /></button>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ))}
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filteredUsers.length === 0 && (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[#8E827A]">No users found.</td></tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
              {/* Closes the <tbody> element so later content is no longer part of this region. */}
              </tbody>
            {/* Closes the <table> element so later content is no longer part of this region. */}
            </table>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>

      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {showForm && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          {/* Starts the <form> element to group controls that submit related information. */}
          <form onSubmit={saveUser} className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-xl">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h2> element to organize this part of the interface. */}
                <h2 className="text-xl font-semibold text-[#323232]">{editingUser ? 'Edit User' : 'Add New User'}</h2>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="mt-1 text-sm text-[#8E827A]">Enter the team member details below.</p>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-[#8E827A] hover:bg-[#F7F3EE]"><X size={19} /></button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="mb-2 block text-sm font-medium text-[#595552]">Full Name</label>
              {/* Starts the <input> element to collect or display a value. */}
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[#C8BCB4] px-4 py-3 text-sm outline-none focus:border-[#595552]" placeholder="Enter full name" />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="mb-2 block text-sm font-medium text-[#595552]">Email Address</label>
              {/* Starts the <input> element to collect or display a value. */}
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[#C8BCB4] px-4 py-3 text-sm outline-none focus:border-[#595552]" placeholder="name@company.com" />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="mb-2 block text-sm font-medium text-[#595552]">Role</label>
                {/* Starts the <select> element to collect or display a value. */}
                <select value={role} onChange={(e) => setRole(e.target.value as User['role'])} className="w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-3 text-sm">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>Project Manager</option><option>Admin</option>
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="mb-2 block text-sm font-medium text-[#595552]">Status</label>
                {/* Starts the <select> element to collect or display a value. */}
                <select value={status} onChange={(e) => setStatus(e.target.value as User['status'])} className="w-full rounded-xl border border-[#C8BCB4] bg-white px-3 py-3 text-sm">
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option>Active</option><option>Inactive</option>
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#C8BCB4] px-4 py-2.5 text-sm text-[#595552]">Cancel</button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button type="submit" className="rounded-xl bg-[#323232] px-5 py-2.5 text-sm font-medium text-white">{editingUser ? 'Save Changes' : 'Add User'}</button>
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
