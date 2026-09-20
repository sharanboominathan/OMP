import Header from '../sections/Header'
import Story from '../sections/Story'
import Footer from '../sections/Footer'

interface AboutProps {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}

export default function About({ navOpen, setNavOpen }: AboutProps) {
  return (
    <div className="relative">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>
        <Story />
      </main>
      <Footer />
    </div>
  )
}
