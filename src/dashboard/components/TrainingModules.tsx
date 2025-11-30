import { trainingModules } from '../data';

export default function TrainingModules() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-2">Recommended Training and Education Pathway</h2>
      <p className="text-gray-300 mb-6 text-sm">
        All modules below are part of Elara's Business Psychology Training offer. They can be completed online via the platform or delivered as live workshops and development sessions.
      </p>
      <h3 className="text-xl font-semibold text-white mb-6">Priority Modules Based on Your Profile</h3>
      
      <div className="space-y-6">
        {trainingModules.map((module, index) => (
          <div
            key={index}
            className="border border-slate-600 rounded-xl p-6 hover:shadow-lg hover:border-slate-500 transition-all bg-gradient-to-r from-slate-700 to-slate-800"
          >
            <h4 className="text-lg font-bold text-indigo-400 mb-3">{module.title}</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-200 mb-1">Why this is recommended for you:</p>
                <p className="text-gray-300 text-sm">{module.whyRecommended}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-green-900/30 rounded-lg p-3 border border-green-700/50">
                  <p className="text-sm font-semibold text-green-300 mb-1">Team benefit:</p>
                  <p className="text-sm text-green-200">{module.teamImpact}</p>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-700/50">
                  <p className="text-sm font-semibold text-blue-300 mb-1">Organisational benefit:</p>
                  <p className="text-sm text-blue-200">{module.orgImpact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

