import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LotusDivider from './components/LotusDivider'
import Philosophy from './components/Philosophy'
import Classes from './components/Classes'
import Schedule from './components/Schedule'
import Voices from './components/Voices'
import Pricing from './components/Pricing'
import SpaceSection from './components/SpaceSection'
import Visit from './components/Visit'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

export default function App() {
  return (
    <div className="grain">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <LotusDivider />
        <Classes />
        <Schedule />
        <Voices />
        <Pricing />
        <LotusDivider />
        <SpaceSection />
        <Visit />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
