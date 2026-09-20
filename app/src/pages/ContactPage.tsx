import Header from '../sections/Header'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

interface ContactPageProps {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}

export default function ContactPage({ navOpen, setNavOpen }: ContactPageProps) {
  return (
    <div className="relative">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
