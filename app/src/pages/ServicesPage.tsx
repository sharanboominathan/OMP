import Header from '../sections/Header'
import Services from '../sections/Services'
import Footer from '../sections/Footer'

interface ServicesPageProps {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}

export default function ServicesPage({ navOpen, setNavOpen }: ServicesPageProps) {
  return (
    <div className="relative">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>
        <Services />
      </main>
      <Footer />
    </div>
  )
}
