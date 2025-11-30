import BrillianceHeader from '../components/brilliance/BrillianceHeader';
import OverviewSection from '../components/brilliance/OverviewSection';
import ThinkingStyleSection from '../components/brilliance/ThinkingStyleSection';
import LearningStyleSection from '../components/brilliance/LearningStyleSection';
import StrengthsSection from '../components/brilliance/StrengthsSection';
import FocusProfileSection from '../components/brilliance/FocusProfileSection';
import AIReadinessSection from '../components/brilliance/AIReadinessSection';
import BarriersSection from '../components/brilliance/BarriersSection';
import MotivationSection from '../components/brilliance/MotivationSection';
import OpportunitiesSection from '../components/brilliance/OpportunitiesSection';
import MotivationMatrixSection from '../components/brilliance/MotivationMatrixSection';
import SummarySection from '../components/brilliance/SummarySection';
import NextStepsSection from '../components/brilliance/NextStepsSection';

export default function BrillianceReport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <BrillianceHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <OverviewSection />
        <ThinkingStyleSection />
        <LearningStyleSection />
        <StrengthsSection />
        <FocusProfileSection />
        <AIReadinessSection />
        <BarriersSection />
        <MotivationSection />
        <OpportunitiesSection />
        <MotivationMatrixSection />
        <SummarySection />
        <NextStepsSection />
      </div>
      <footer className="bg-slate-950 text-white py-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">Reveal Hidden Brilliance Report – Psychology and Data Intelligence</p>
        </div>
      </footer>
    </div>
  );
}


