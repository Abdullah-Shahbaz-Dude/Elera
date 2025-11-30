import ReportHeader from '../components/ReportHeader';
import ScoreBands from '../components/ScoreBands';
import ScoreCards from '../components/ScoreCards';
import ScoreChart from '../components/ScoreChart';
import WhyItMatters from '../components/WhyItMatters';
import StrengthsSection from '../components/StrengthsSection';
import TeamImpactSection from '../components/TeamImpactSection';
import TrainingModules from '../components/TrainingModules';
import DevelopmentPathway from '../components/DevelopmentPathway';

export default function ManagerReport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <ReportHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ScoreBands />
        <ScoreCards />
        <ScoreChart />
        <WhyItMatters />
        <StrengthsSection />
        <TeamImpactSection />
        <TrainingModules />
        <DevelopmentPathway />
      </div>
      <footer className="bg-slate-950 text-white py-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">Mind Sync Manager Report – Psychology and Data Intelligence</p>
        </div>
      </footer>
    </div>
  );
}


