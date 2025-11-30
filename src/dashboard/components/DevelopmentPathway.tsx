import { developmentPathway, conclusion } from '../data';

export default function DevelopmentPathway() {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl shadow-lg p-8 mb-6 border border-indigo-800/50">
        <h2 className="text-2xl font-bold text-white mb-6">Your Suggested 90-Day Development Pathway</h2>
        
        <div className="space-y-6">
          {developmentPathway.map((phase, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 border border-indigo-700/50 hover:shadow-md hover:border-indigo-600/50 transition-all"
            >
              <h3 className="text-lg font-bold text-indigo-400 mb-4">{phase.period}</h3>
              <ul className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold mt-1">•</span>
                    <span className="text-gray-300">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl shadow-lg p-8 text-white border border-indigo-600/50">
        <h2 className="text-2xl font-bold mb-4">Bringing It All Together</h2>
        <p className="text-lg leading-relaxed opacity-95">{conclusion}</p>
      </div>
    </div>
  );
}

