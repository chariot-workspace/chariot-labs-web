import TopBar from './components/TopBar'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import ProcessSection from './components/ProcessSection'
import StatsSection from './components/StatsSection'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="app-root">
      <TopBar />
      <NavBar />
      <main>
        <Hero />
        <TrustedBy />
        <AboutSection />
        <Services />
        <WhyChooseUs />
        <ProcessSection />
        <StatsSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
