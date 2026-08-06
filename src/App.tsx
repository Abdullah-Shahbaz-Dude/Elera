import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
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
import OurOfferMindSync from './pages/OurOfferMindSync';
import MindSyncForSchools from './pages/MindSyncForSchools';
import MindSyncForParents from './pages/MindSyncForParents';
import Login from './components/Login';
import Signup from './components/Signup';
import Home2 from './pages/Home2';
import ComingSoon from './pages/ComingSoon';
import { VideoProvider } from './contexts/VideoContext';
import HomeNewBrand from './pages/HomeNewBrand';
import HowItWorks from './pages/HowItWorks';

function DashboardComingSoon({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            Coming Soon
          </p>

          <div className="mt-10">
            <Link
              to="/dashboard/my-learning/mind-sync"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #9333EA)',
                boxShadow: '0 8px 32px rgba(96, 165, 250, 0.35)',
              }}
            >
              Back to Mind Sync
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/survey') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';
  const hideNavbar =
    location.pathname === '/' || location.pathname === '/how-it-works';

  return (
    <div className="min-h-screen">
      {!isDashboard && !hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeNewBrand />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/home1" element={<Home2 />} />
        <Route path="/home-1" element={<Home />} />
        <Route path="/home-2" element={<Home2 />} />
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
            path="my-learning/mind-sync/modules/:moduleId"
            element={<MindSyncModulePage />}
          />
          <Route
            path="my-learning/mind-sync/module-2"
            element={<DashboardComingSoon title="Mind Sync Module 2" />}
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

        <Route
          path="/future-sync"
          element={<ComingSoon title="Future Sync" />}
        />
        <Route path="/mind-sync-schools" element={<MindSyncForSchools />} />
        <Route path="/mind-sync-parents" element={<MindSyncForParents />} />
        <Route
          path="/mind-sync-school-discovery-call"
          element={<ComingSoon title="Mind Sync School Discovery Call" />}
        />
        <Route
          path="/sample-school-report"
          element={<ComingSoon title="Sample School Report" />}
        />
        <Route
          path="/future-sync-discovery-call"
          element={<ComingSoon title="Future Sync Discovery Call" />}
        />
        <Route
          path="/future-sync-sample-report"
          element={<ComingSoon title="Future Sync Sample Report" />}
        />
        <Route
          path="/faq"
          element={<ComingSoon title="Frequently Asked Questions" />}
        />
        <Route
          path="/our-goals-values"
          element={<ComingSoon title="Our Goals & Values" />}
        />
        <Route path="/our-offer" element={<ComingSoon title="Our Offer" />} />
        <Route path="/our-offer/mind-sync" element={<OurOfferMindSync />} />
        <Route
          path="/who-we-work-with"
          element={<ComingSoon title="Who We Work With" />}
        />
        <Route
          path="/who-we-are-coming-soon"
          element={<ComingSoon title="Who We Are" />}
        />
        <Route
          path="/who-we-work-with-coming-soon"
          element={<ComingSoon title="Who We Work With" />}
        />
        <Route
          path="/request-a-demo"
          element={<ComingSoon title="Request A Demo" />}
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
