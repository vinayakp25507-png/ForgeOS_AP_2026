import { useState, type FormEvent } from 'react'
<<<<<<< HEAD
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Building2,
  KeyRound,
  Info,
} from 'lucide-react'
import { AVAILABLE_PROJECTS, PM_ACCESS_CODES } from '../utils/permissions'

type UserRole = 'admin' | 'pm'

type RegisteredUser = {
  id?: string | number
  name?: string
  email?: string
  role?: string
  status?: string
}

export function LoginForm() {
  const [role, setRole] = useState<UserRole>('admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [message, setMessage] = useState('')

  // PM-specific states
  const [selectedProjectId, setSelectedProjectId] = useState<string>(AVAILABLE_PROJECTS[0].id)
  const [adminCode, setAdminCode] = useState<string>('FORGE-PM-2026')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
=======
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { ApiError } from '../../../lib/api'
import { useAuth } from '../auth/useAuth'

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === 'INVALID_CREDENTIALS' || error.status === 401) return 'Invalid email or password.'
    return error.message
  }
  return error instanceof Error ? error.message : 'Unable to sign in. Please try again.'
}

export function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password) {
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
      setMessage('Please enter your email and password.')
      return
    }

<<<<<<< HEAD
    let registeredUsers: RegisteredUser[] = []
    try {
      const savedUsers = localStorage.getItem('forgeos_users')
      const parsedUsers = savedUsers ? JSON.parse(savedUsers) : []
      registeredUsers = Array.isArray(parsedUsers) ? parsedUsers : []
    } catch {
      setMessage('Unable to load workspace users. Please try again.')
      return
    }

    const matchedUser = registeredUsers.find((user) =>
      String(user.email || '').trim().toLowerCase() === email.trim().toLowerCase()
    )

    if (matchedUser && String(matchedUser.status).toLowerCase() === 'inactive') {
      setMessage('Your account is inactive. Please contact the administrator.')
      return
    }

    if (matchedUser && matchedUser.status !== 'Active') {
      setMessage('Your account is inactive. Please contact the administrator.')
      return
    }

    const registeredRole = String(matchedUser?.role ?? '').toLowerCase()
    const authenticatedRole: UserRole =
      registeredRole === 'project manager' || registeredRole === 'pm'
        ? 'pm'
        : registeredRole === 'admin' || registeredRole === 'administrator'
          ? 'admin'
          : role

    // If PM, validate project selection and admin code
    let assignedProjectInfo = {}
    if (authenticatedRole === 'pm') {
      if (!selectedProjectId) {
        setMessage('Project Managers must select an assigned project before signing in.')
        return
      }

      const cleanCode = adminCode.trim().toUpperCase()
      const isValidCode = PM_ACCESS_CODES.some(
        (code) => code.toUpperCase() === cleanCode
      )

      if (!isValidCode) {
        setMessage('Invalid Admin Authorization Code. Please check the code provided by your administrator.')
        return
      }

      const project = AVAILABLE_PROJECTS.find((p) => p.id === selectedProjectId)
      if (project) {
        assignedProjectInfo = {
          assignedProjectId: project.id,
          assignedProjectCode: project.code,
          assignedProjectName: project.name,
        }
      }
    }

    localStorage.setItem('forgeos_demo_user', JSON.stringify({
      id: matchedUser?.id,
      name: String(matchedUser?.name || '').trim() || (authenticatedRole === 'admin' ? 'Administrator' : 'Project Manager'),
      email: email.trim(),
      role: authenticatedRole,
      rememberMe,
      ...assignedProjectInfo,
    }))

    window.location.href = authenticatedRole === 'admin' ? '/app/admin/dashboard' : '/app/pm/dashboard'
=======
    setIsSubmitting(true)
    setMessage('')
    try {
      const user = await login(email.trim(), password, rememberMe)
      const destination = user.role === 'ADMIN' ? '/app/admin/dashboard' : '/app/pm/dashboard'
      window.history.replaceState({}, '', destination)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch (error) {
      setMessage(errorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
<<<<<<< HEAD
      <div>
        <label className="mb-3 block text-sm font-semibold text-[#323232]">
          Sign in as
        </label>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#F7F3EE] p-1.5">
          <button
            type="button"
            onClick={() => {
              setRole('admin')
              setMessage('')
            }}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              role === 'admin'
                ? 'bg-[#323232] text-white shadow-md'
                : 'text-[#7A7470] hover:bg-white'
            }`}
          >
            Administrator
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('pm')
              setMessage('')
            }}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              role === 'pm'
                ? 'bg-[#323232] text-white shadow-md'
                : 'text-[#7A7470] hover:bg-white'
            }`}
          >
            Project Manager
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#323232]">
          Email address
        </label>

=======
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#323232]">Email address</label>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
        <div className="flex items-center gap-3 rounded-xl border border-[#C8BCB4] bg-[#F7F3EE] px-4 transition focus-within:border-[#323232] focus-within:ring-2 focus-within:ring-[#323232]/10">
          <Mail size={19} className="shrink-0 text-[#8E827A]" />
          <input
            id="email"
            type="email"
            value={email}
<<<<<<< HEAD
            onChange={(event) => {
              setEmail(event.target.value)
              setMessage('')
            }}
            placeholder={role === 'admin' ? 'admin@forgeos.com' : 'pm@forgeos.com'}
            autoComplete="email"
            required
=======
            onChange={(event) => { setEmail(event.target.value); setMessage('') }}
            placeholder="you@company.com"
            autoComplete="email"
            required
            disabled={isSubmitting}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
            className="w-full bg-transparent py-4 text-sm text-[#323232] outline-none placeholder:text-[#A59A92]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
<<<<<<< HEAD
          <label htmlFor="password" className="text-sm font-semibold text-[#323232]">
            Password
          </label>
          <button
            type="button"
            onClick={() =>
              setMessage('Password recovery will be available when authentication is connected.')
            }
            className="text-xs font-semibold text-[#595552] underline-offset-4 hover:underline"
          >
            Forgot password?
          </button>
        </div>

=======
          <label htmlFor="password" className="text-sm font-semibold text-[#323232]">Password</label>
          <span className="text-xs text-[#8E827A]">Contact your administrator for account help.</span>
        </div>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
        <div className="flex items-center gap-3 rounded-xl border border-[#C8BCB4] bg-[#F7F3EE] px-4 transition focus-within:border-[#323232] focus-within:ring-2 focus-within:ring-[#323232]/10">
          <LockKeyhole size={19} className="shrink-0 text-[#8E827A]" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
<<<<<<< HEAD
            onChange={(event) => {
              setPassword(event.target.value)
              setMessage('')
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
=======
            onChange={(event) => { setPassword(event.target.value); setMessage('') }}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            disabled={isSubmitting}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
            className="w-full bg-transparent py-4 text-sm text-[#323232] outline-none placeholder:text-[#A59A92]"
          />
          <button
            type="button"
<<<<<<< HEAD
            onClick={() => setShowPassword(!showPassword)}
=======
            onClick={() => setShowPassword((visible) => !visible)}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-[#8E827A] hover:text-[#323232]"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Project Manager Specific Fields */}
      {role === 'pm' && (
        <div className="space-y-4 rounded-2xl border border-[#E8DCD4] bg-[#F3E9E1]/50 p-4 transition-all">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5E3A]">
            <Info size={14} />
            <span>Project Manager Assignment</span>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="project" className="text-xs font-semibold text-[#323232]">
              Assigned Project Site *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-[#C8BCB4] bg-white px-3 py-2.5 transition focus-within:border-[#323232]">
              <Building2 size={17} className="text-[#9A5E3A] shrink-0" />
              <select
                id="project"
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value)
                  setMessage('')
                }}
                className="w-full bg-transparent text-xs font-medium text-[#323232] outline-none"
              >
                {AVAILABLE_PROJECTS.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.code} — {proj.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-[#8E827A]">
              Your workspace, daily logs, and inventory will be scoped to this site.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="adminCode" className="text-xs font-semibold text-[#323232]">
              Admin Authorization Code *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-[#C8BCB4] bg-white px-3 py-2.5 transition focus-within:border-[#323232]">
              <KeyRound size={17} className="text-[#9A5E3A] shrink-0" />
              <input
                id="adminCode"
                type="text"
                value={adminCode}
                onChange={(e) => {
                  setAdminCode(e.target.value)
                  setMessage('')
                }}
                placeholder="Enter code from Administrator"
                className="w-full bg-transparent text-xs font-mono font-semibold uppercase tracking-wider text-[#323232] outline-none placeholder:text-[#A59A92]"
              />
            </div>
            <p className="text-[10px] text-[#8E827A]">
              Authorization key provided by company admin (Demo: <code className="rounded bg-white px-1 py-0.5 font-bold text-[#9A5E3A]">FORGE-PM-2026</code>)
            </p>
          </div>
        </div>
      )}

=======
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
      <label className="flex cursor-pointer items-center gap-3 text-sm text-[#595552]">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="h-4 w-4 accent-[#323232]"
        />
        Remember me on this device
      </label>

      {message && (
<<<<<<< HEAD
        <div
          role="status"
          className="rounded-xl border border-[#C8BCB4] bg-[#E8DCD4] p-3 text-sm leading-6 text-[#323232]"
        >
=======
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-800">
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
          {message}
        </div>
      )}

      <button
        type="submit"
<<<<<<< HEAD
        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#323232] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#323232]/10 transition-all hover:-translate-y-0.5 hover:bg-[#1E1E1E] hover:shadow-xl active:translate-y-0"
      >
        Sign in as {role === 'admin' ? 'Administrator' : 'Project Manager'}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
=======
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#323232] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#323232]/10 transition-all hover:-translate-y-0.5 hover:bg-[#1E1E1E] hover:shadow-xl active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
        {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-[#8E827A]">
        <ShieldCheck size={15} />
<<<<<<< HEAD
        <span>
          {role === 'admin'
            ? 'Complete Organization & Portfolio Oversight'
            : 'Scoped Project Control & Site Operations'}
        </span>
=======
        <span>Secure access to your construction workspace</span>
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
      </div>
    </form>
  )
}
<<<<<<< HEAD
export default LoginForm
=======
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
