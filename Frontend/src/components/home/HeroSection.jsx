import backgroundImage from '../../assets/back.png'
import HomeNavbar from './HomeNavbar'
import HeroSearchBar from './HeroSearchBar'

function HeroSection() {
  return (
    <section className="relative min-h-[620px] overflow-hidden md:min-h-[760px]">
      <img
        src={backgroundImage}
        alt="Luxury rental property"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/45" />

      <HomeNavbar />

      <div className="relative z-20 mx-auto flex min-h-[620px] w-full max-w-6xl items-center px-4 pt-24 text-center md:min-h-[760px] md:px-6">
        <div className="w-full">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            Exquisite Spaces,
            <br />
            Seamlessly Managed.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 md:text-2xl/8">
            Experience the gold standard of rental management with our curated digital concierge service.
          </p>

          <HeroSearchBar />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
