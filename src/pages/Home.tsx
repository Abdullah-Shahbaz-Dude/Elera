import HeroSection from '@/components/HeroSection/HeroSection'
import WhySection from '@/components/Sections/WhySection'
import ServicePhilosophy from '@/components/Sections/ServicePhilosophy'
import OurServicesSection from '@/components/Sections/OurServicesSection'
import ContactForm from '@/components/Sections/ContactForm'
import Newsletter from '@/components/Sections/Newsletter'
import Footer from '@/components/Footer/Footer'

const Home = () => {
  return (
    <main className="pt-0">
      <HeroSection />
      {/* <IntroSection /> */}
      <WhySection />
      <ServicePhilosophy />
      <OurServicesSection />
      <ContactForm />
      <Newsletter />
      <Footer />
    </main>
  )
}

export default Home

