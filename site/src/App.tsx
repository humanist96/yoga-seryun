import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LotusDivider from './components/LotusDivider'
import Philosophy from './components/Philosophy'
import FilmSection from './components/FilmSection'
import Classes from './components/Classes'
import Schedule from './components/Schedule'
import Voices from './components/Voices'
import FirstClass from './components/FirstClass'
import GallerySection from './components/GallerySection'
import Visit from './components/Visit'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import MobileDock from './components/MobileDock'

export default function App() {
  return (
    <div className="grain">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <LotusDivider />
        <FilmSection />
        <Classes />
        <Schedule />
        <Voices />
        <FirstClass />
        <LotusDivider />
        <GallerySection />
        <Visit />
      </main>
      <Footer />
      <FloatingContact />
      <MobileDock />
    </div>
  )
}
