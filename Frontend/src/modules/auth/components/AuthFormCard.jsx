import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../services/authApi'
import { useAuthStore } from '../store/useAuthStore'

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12C4.5 8.6 7.8 6.5 12 6.5C16.2 6.5 19.5 8.6 21.5 12C19.5 15.4 16.2 17.5 12 17.5C7.8 17.5 4.5 15.4 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  )
}

function AuthFormCard({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('Please fill all required fields')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsSubmitting(true)

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, role: form.role }

      const response = isLogin ? await authApi.login(payload) : await authApi.signup(payload)
      const authData = response?.data

      if (!authData?.token || !authData?.user) {
        throw new Error('Invalid auth response from server')
      }

      login({ user: authData.user, token: authData.token })
      navigate('/')
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto mt-7 w-full max-w-96">
      <div className="grid grid-cols-2 gap-2.5">
        <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-(--color-ink)">Google</button>
        <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-(--color-ink)">Apple</button>
      </div>

      <div className="my-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-secondary)">
        <span className="h-px flex-1 bg-slate-200" />
        <span>{isLogin ? 'Or email access' : 'Or create with email'}</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form className="space-y-3.5" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange('name')}
            className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 text-sm outline-none transition focus:border-(--color-primary) focus:bg-white"
          />
        )}

        {!isLogin && (
          <select
            value={form.role}
            onChange={onChange('role')}
            className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 text-sm outline-none transition focus:border-(--color-primary) focus:bg-white"
          >
            <option value="tenant">Tenant</option>
            <option value="owner">Owner</option>
          </select>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={onChange('email')}
          className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 text-sm outline-none transition focus:border-(--color-primary) focus:bg-white"
        />

        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange('password')}
            className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-(--color-primary) focus:bg-white"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-(--color-secondary)">
            <EyeIcon />
          </span>
        </div>

        {!isLogin && (
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={onChange('confirmPassword')}
              className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-(--color-primary) focus:bg-white"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-(--color-secondary)">
              <EyeIcon />
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 text-xs text-(--color-secondary)">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            {isLogin ? 'Remember me' : 'Agree to Terms'}
          </label>
          <a href="#" className="font-semibold text-(--color-primary) hover:opacity-80">
            {isLogin ? 'Forgot password?' : 'View terms'}
          </a>
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary-theme mt-2 block w-full rounded-xl px-5 py-3 text-center text-base font-semibold shadow-[0_8px_16px_rgba(0,82,204,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Please wait...' : isLogin ? 'Sign In to Dashboard' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-(--color-secondary)">
        {isLogin ? 'New to the concierge?' : 'Already have an account?'}{' '}
        <Link
          to={isLogin ? '/signup' : '/login'}
          className="font-semibold text-(--color-primary) hover:opacity-80"
        >
          {isLogin ? 'Create an account' : 'Sign in here'}
        </Link>
      </p>
    </div>
  )
}

export default AuthFormCard
