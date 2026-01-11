import HeroSection from '@/components/HeroSection/HeroSection'
import WhySection from '@/components/Sections/WhySection'
// import ServicePhilosophy from '@/components/Sections/ServicePhilosophy'
import OurServicesSection from '@/components/Sections/OurServicesSection'
import SpeakToUs from '@/components/Sections/ContactForm'
import Footer from '@/components/Footer/Footer'

const Home = () => {
  return (
    <main className="pt-0">
      <HeroSection />
      {/* <IntroSection /> */}
      <WhySection />
      {/* <ServicePhilosophy /> */}
      <OurServicesSection />
      <SpeakToUs />
      <Footer />
    </main>
  )
}

export default Home

