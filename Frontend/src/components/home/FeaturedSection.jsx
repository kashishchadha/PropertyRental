import { Link } from 'react-router-dom'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'

const properties = [
  {
    id: 1,
    label: 'New Listing',
    title: 'The Glass Pavilion',
    location: 'Malibu, CA',
    price: '$8,500',
    rating: '4.9',
    image: img1,
  },
  {
    id: 2,
    label: 'Premium',
    title: 'Skyline Penthouse',
    location: 'Manhattan, NY',
    price: '$12,000',
    rating: '5.0',
    image: img2,
  },
  {
    id: 3,
    label: 'Exclusive',
    title: 'Zen Garden Retreat',
    location: 'Austin, TX',
    price: '$5,200',
    rating: '4.8',
    image: img3,
  },
]

function PropertyCard({ property }) {
  const labelClass = property.id === 3 ? 'bg-(--color-tertiary)' : 'bg-(--color-primary)'

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="relative h-52">
        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${labelClass}`}>
          {property.label}
        </span>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-2xl font-semibold text-(--color-ink)">{property.title}</h3>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-(--color-secondary)">
            {property.rating}
          </span>
        </div>
        <p className="text-sm text-(--color-secondary)">{property.location}</p>

        <div className="flex items-end justify-between pt-2">
          <p>
            <span className="text-3xl font-bold text-(--color-primary)">{property.price}</span>
            <span className="text-sm text-(--color-secondary)"> /month</span>
          </p>
          <button className="rounded-full p-2 text-(--color-primary) transition hover:bg-blue-50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 21s-6.7-4.3-9.2-8.1C1 10.2 1.6 6.8 4.2 5.3C6.5 4 9.2 4.7 11 6.7L12 7.8L13 6.7C14.8 4.7 17.5 4 19.8 5.3C22.4 6.8 23 10.2 21.2 12.9C18.7 16.7 12 21 12 21Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

function FeaturedSection() {
  return (
    <section className="bg-(--color-neutral) py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">Curated Selection</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <h2 className="text-4xl font-bold text-(--color-ink) md:text-5xl">Featured Residences</h2>
          <Link to="/properties" className="text-sm font-semibold text-(--color-primary) hover:opacity-85">
            View All Properties
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
