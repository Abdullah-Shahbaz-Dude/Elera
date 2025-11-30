import { teamImpact } from '../data';

export default function TeamImpactSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Team Impact Summary</h2>
      <div className="space-y-6">
        <div className="bg-blue-900/30 rounded-xl p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-white mb-3">Team Impact</h3>
          <p className="text-gray-300 leading-relaxed">{teamImpact.summary}</p>
        </div>
        <div className="bg-purple-900/30 rounded-xl p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-white mb-3">Organisational Impact</h3>
          <p className="text-gray-300 leading-relaxed">{teamImpact.orgImpact}</p>
        </div>
      </div>
    </div>
  );
}

