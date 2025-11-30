import { strengths, developmentPriorities } from '../data';

export default function StrengthsSection() {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl shadow-lg p-8 mb-6 border border-green-800/50">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">✨</span>
          Your Strengths Profile
        </h2>
        <div className="bg-slate-800 rounded-xl p-6 border border-green-700/50">
          <h3 className="text-xl font-semibold text-white mb-3">{strengths.title}</h3>
          <p className="text-gray-300 leading-relaxed">{strengths.description}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl shadow-lg p-8 border border-orange-800/50">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Your Development Priorities
        </h2>
        <div className="space-y-4">
          {developmentPriorities.map((priority, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-orange-700/50 hover:shadow-md hover:border-orange-600/50 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">{priority.title}</h3>
              <p className="text-gray-300 leading-relaxed">{priority.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

