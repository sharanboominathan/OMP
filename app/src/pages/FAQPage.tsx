import Header from '../sections/Header'
import FAQ from '../sections/FAQ'
import Footer from '../sections/Footer'

interface FAQPageProps {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}

export default function FAQPage({ navOpen, setNavOpen }: FAQPageProps) {
  return (
    <div className="relative">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
