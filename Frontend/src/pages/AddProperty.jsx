import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropertyEditorSidebar from '../modules/property/components/PropertyEditorSidebar'
import PropertyEditorTopbar from '../modules/property/components/PropertyEditorTopbar'
import PropertyOverviewForm from '../modules/property/components/PropertyOverviewForm'
import { propertyApi } from '../modules/property/services/propertyApi'
import { useAuthStore } from '../modules/auth/store/useAuthStore'

function AddProperty() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const user = useAuthStore((state) => state.user)
  const canManageProperties = user?.role === 'owner' || user?.role === 'admin'

  const [initialValues, setInitialValues] = useState(null)
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    const loadProperty = async () => {
      try {
        setIsLoading(true)
        const property = await propertyApi.getById(id)
        setInitialValues(property)
      } catch (err) {
        setError(err.message || 'Failed to load property')
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()
  }, [id, isEditMode])

  const handleSubmit = async (payload) => {
    if (!canManageProperties) {
      setError('Only owner or admin accounts can create/update properties.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      if (isEditMode) {
        await propertyApi.update(id, payload)
      } else {
        await propertyApi.create(payload)
      }

      navigate('/properties')
    } catch (err) {
      setError(err.message || 'Failed to save property')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#edf1f6]">
      <div className="grid min-h-screen w-full overflow-hidden border border-slate-200/70 bg-[#edf1f6] md:grid-cols-[190px_1fr]">
        <PropertyEditorSidebar />

        <div className="flex min-h-full flex-col">
          <PropertyEditorTopbar />

          <main className="flex-1 px-6 py-6 md:px-8">
            <section>
              <h1 className="text-4xl font-bold text-(--color-ink)">{isEditMode ? 'Edit Property' : 'Add Property'}</h1>
              <p className="mt-1 text-base text-(--color-secondary)">
                {isEditMode
                  ? 'Update listing details and keep your inventory current.'
                  : "Create your listing and publish it to your property catalog."}
              </p>
            </section>

            {!canManageProperties ? (
              <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Your current role is {user?.role || 'guest'}. Property create/update is allowed only for owner or admin.
              </p>
            ) : null}

            {isLoading ? <p className="mt-6 text-sm text-slate-500">Loading property...</p> : null}

            {!isLoading ? (
              <section className="mt-6">
                <PropertyOverviewForm
                  key={isEditMode ? `edit-${id}-${initialValues?.id || 'loading'}` : 'create'}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                  submitLabel={isEditMode ? 'Update Property' : 'Create Property'}
                />
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AddProperty
