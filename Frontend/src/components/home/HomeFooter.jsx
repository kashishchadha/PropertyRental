function HomeFooter() {
  return (
    <footer className="bg-[var(--color-neutral)] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-6">
        <div>
          <p className="text-lg font-bold text-[var(--color-ink)]">EstateConcierge</p>
          <p className="mt-2 text-sm text-[var(--color-secondary)]">Curating the world&apos;s finest living experiences with precision management.</p>
        </div>

        <nav className="flex items-center gap-6 text-xs font-semibold text-[var(--color-secondary)]">
          <a href="/" className="hover:text-[var(--color-primary)]">Terms</a>
          <a href="/" className="hover:text-[var(--color-primary)]">Privacy</a>
          <a href="/" className="hover:text-[var(--color-primary)]">Cookies</a>
          <a href="/" className="hover:text-[var(--color-primary)]">Contact</a>
        </nav>

        <p className="text-xs text-[var(--color-secondary)]">© 2024 EstateConcierge. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default HomeFooter
