import { Link } from 'react-router-dom'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3L18.5 5.8V11.2C18.5 15.3 15.9 19 12 20.4C8.1 19 5.5 15.3 5.5 11.2V5.8L12 3Z" />
      <path d="M9.6 11.9L11.3 13.6L14.5 10.3" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7.8C8 5.7 9.8 4 12 4C14.2 4 16 5.7 16 7.8V10" />
    </svg>
  )
}

function AuthFrame({ title, subtitle, children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--color-neutral) text-(--color-ink)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,82,204,0.08),transparent_62%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-5">
        <Link to="/" className="text-xl font-bold text-(--color-ink) md:text-2xl">
          EstateConcierge
        </Link>
        <Link to="/" className="text-sm font-semibold text-(--color-primary) hover:opacity-80">
          Back to Site
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-132px)] w-full max-w-6xl items-center justify-center px-4 py-8">
        <div className="w-full max-w-[520px] rounded-[20px] border border-white/60 bg-white/85 p-7 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur md:p-9">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight text-(--color-ink)">{title}</h1>
            <p className="mt-2 text-base text-(--color-secondary)">{subtitle}</p>
          </div>

          {children}
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pb-5 text-xs text-(--color-secondary) md:flex-row md:items-center md:justify-between">
        <p>© 2024 EstateConcierge. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
            <ShieldIcon />
            Secure Access
          </span>
          <span className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
            <LockIcon />
            256-bit Encrypted
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:text-(--color-primary)">Terms</a>
          <a href="#" className="hover:text-(--color-primary)">Privacy</a>
          <a href="#" className="hover:text-(--color-primary)">Cookies</a>
        </nav>
      </footer>
    </main>
  )
}

export default AuthFrame
