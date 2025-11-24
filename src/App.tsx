import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import WhyElereaExist from './pages/WhyElereaExist';
import OurServices from './pages/OurServices';
import AIInsightEngine from './pages/AIInsightEngine';
// import BusinessPsychologyConsultancy from './pages/BusinessPsychologyConsultancy' // Old page - kept as backup
import PsychologyBasedTrainingAndMentoring from './pages/PsychologyBasedTrainingAndMentoring';
import WhoWeAre from './pages/WhoWeAre';
import WhoWeWorkWith from './pages/WhoWeWorkWith';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import RevealHiddenBrillianceSurvey from './pages/RevealHiddenBrillianceSurvey';
import MindSync from './pages/MindSync';
import MindSyncSurvey from './pages/MindSyncSurvey';
import MindSyncModuleResults from './pages/MindSyncModuleResults';
import { VideoProvider } from './contexts/VideoContext';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/survey');

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar />}
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-elerea-exist" element={<WhyElereaExist />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route
              path="/our-services/ai-insight-engine"
              element={<AIInsightEngine />}
            />
            {/* <Route path="/our-services/business-psychology-consultancy" element={<BusinessPsychologyConsultancy />} /> */}
            <Route
              path="/our-services/psychology-based-training-and-mentoring"
              element={<PsychologyBasedTrainingAndMentoring />}
            />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/research-and-education" element={<WhoWeWorkWith />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/survey/reveal-hidden-brilliance"
              element={<RevealHiddenBrillianceSurvey />}
            />
            <Route path="/survey/mind-sync" element={<MindSync />} />
            <Route path="/survey/mind-sync/start" element={<MindSyncSurvey />} />
            <Route
              path="/survey/mind-sync/module/:moduleNumber"
              element={<MindSyncModuleResults />}
            />
          </Routes>
        </div>
  );
}

function App() {
  return (
    <VideoProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </VideoProvider>
  );
}

export default App;
