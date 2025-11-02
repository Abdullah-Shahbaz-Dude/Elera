import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import WhyElereaExist from './pages/WhyElereaExist'
import OurServices from './pages/OurServices'
import AIInsightEngine from './pages/AIInsightEngine'
import BusinessPsychologyConsultancy from './pages/BusinessPsychologyConsultancy'
import WhoWeAre from './pages/WhoWeAre'
import WhoWeWorkWith from './pages/WhoWeWorkWith'
import ContactUs from './pages/ContactUs'
import { VideoProvider } from './contexts/VideoContext'

function App() {
  return (
    <VideoProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-elerea-exist" element={<WhyElereaExist />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/our-services/ai-insight-engine" element={<AIInsightEngine />} />
            <Route path="/our-services/business-psychology-consultancy" element={<BusinessPsychologyConsultancy />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/who-we-work-with" element={<WhoWeWorkWith />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </VideoProvider>
  )
}

export default App

