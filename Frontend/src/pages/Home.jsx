import HeroSection from '../components/home/HeroSection'
import FeaturedSection from '../components/home/FeaturedSection'
import ManagementSection from '../components/home/ManagementSection'
import HomeFooter from '../components/home/HomeFooter'

function Home() {
  return (
    <div className="bg-[var(--color-neutral)] text-[var(--color-ink)]">
      <HeroSection />
      <FeaturedSection />
      <ManagementSection />
      <HomeFooter />
    </div>
  )
}

export default Home
