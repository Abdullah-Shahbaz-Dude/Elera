import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import DashboardLayout from './dashboard/DashboardLayout';
import Dashboard from './dashboard/pages/Dashboard';
import ManagerReport from './dashboard/pages/ManagerReport';
import BrillianceReport from './dashboard/pages/BrillianceReport';
import ModuleCatalog from './dashboard/pages/ModuleCatalog';
import ModuleLibrary from './dashboard/pages/ModuleLibrary';
import ModuleLessons from './dashboard/pages/ModuleLessons';
import LessonView from './dashboard/pages/LessonView';
import ProgrammePage from './dashboard/pages/ProgrammePage';
import InsightModuleView from './dashboard/pages/InsightModuleView';
import MyLearningLanding from './dashboard/pages/MyLearningLanding';
import MindSyncProgrammePage from './dashboard/pages/MindSyncProgrammePage';
import MindSyncModulePage from './dashboard/pages/MindSyncModulePage';
import RevealHiddenBrillianceSurvey from './pages/RevealHiddenBrillianceSurvey';
import MindSync from './pages/MindSync';
import MindSyncSurvey from './pages/MindSyncSurvey';
import MindSyncModuleResults from './pages/MindSyncModuleResults';
import RevealHiddenBrilliance from './pages/our-ideas/RevealHiddenBrilliance';
import MindSyncIdea from './pages/our-ideas/MindSync';
import DigitalBiasImpactAssessment from './pages/our-ideas/DigitalBiasImpactAssessment';
import Login from './components/Login';
import Signup from './components/Signup';
import { VideoProvider } from './contexts/VideoContext';

function AppContent() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/survey') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

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
        <Route
          path="/our-services/reveal-hidden-brilliance"
          element={<RevealHiddenBrilliance />}
        />
        <Route path="/our-services/mind-sync" element={<MindSyncIdea />} />
        <Route
          path="/our-services/digital-bias"
          element={<DigitalBiasImpactAssessment />}
        />
        {/* <Route path="/our-services/business-psychology-consultancy" element={<BusinessPsychologyConsultancy />} /> */}
        <Route
          path="/our-services/psychology-based-training-and-mentoring"
          element={<PsychologyBasedTrainingAndMentoring />}
        />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/research-and-education" element={<WhoWeWorkWith />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="my-learning" element={<MyLearningLanding />} />
          <Route path="my-learning/future-sync" element={<ModuleCatalog />} />
          <Route
            path="my-learning/mind-sync"
            element={<MindSyncProgrammePage />}
          />
          <Route
            path="my-learning/mind-sync/modules/1"
            element={<MindSyncModulePage />}
          />
          <Route
            path="my-learning/programme/:programmeId"
            element={<ProgrammePage />}
          />
          <Route
            path="my-learning/programme/:programmeId/insights/:insightSlug"
            element={<InsightModuleView />}
          />
          <Route
            path="my-learning/modules/:moduleId/lessons/:lessonId"
            element={<LessonView />}
          />
          <Route
            path="my-learning/modules/:moduleId"
            element={<ModuleLessons />}
          />
          <Route path="my-learning/modules" element={<ModuleLibrary />} />
          <Route path="manager-report" element={<ManagerReport />} />
          <Route path="brilliance-report" element={<BrillianceReport />} />
        </Route>
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
