import { opportunitiesToOrganization } from '../../brillianceData';

export default function OpportunitiesSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Opportunities to The Organisation</h2>
      <p className="text-gray-300 leading-relaxed">{opportunitiesToOrganization}</p>
    </div>
  );
}


