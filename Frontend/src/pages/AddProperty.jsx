import PropertyEditorSidebar from '../modules/property/components/PropertyEditorSidebar'
import PropertyEditorTopbar from '../modules/property/components/PropertyEditorTopbar'
import PropertyOverviewForm from '../modules/property/components/PropertyOverviewForm'

function AddProperty() {
  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen w-full overflow-hidden border border-slate-200/70 bg-[#edf1f6] md:grid-cols-[190px_1fr]">
        <PropertyEditorSidebar />

        <div className="flex min-h-full flex-col">
          <PropertyEditorTopbar />

          <main className="flex-1 px-6 py-6 md:px-8">
            <section>
              <h1 className="text-4xl font-bold text-[var(--color-ink)]">Property Overview</h1>
              <p className="mt-1 text-base text-[var(--color-secondary)]">
                Let&apos;s start with the basic details of your premium listing. Ensure the description highlights the lifestyle value.
              </p>
            </section>

            <section className="mt-6">
              <PropertyOverviewForm />
            </section>
          </main>

          <footer className="flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 md:px-8">
            <button type="button" className="rounded-xl bg-[#dde5ee] px-6 py-2.5 text-sm font-semibold text-[var(--color-ink)]">
              Save Draft
            </button>

            <div className="flex items-center gap-3">
              <button type="button" className="rounded-xl border border-dashed border-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-secondary)]">
                Discard
              </button>
              <button type="button" className="rounded-xl border border-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-secondary)]">
                Cancel
              </button>
              <button type="button" className="btn-primary-theme rounded-xl px-8 py-2.5 text-sm font-semibold">
                Next Step: Location
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default AddProperty
