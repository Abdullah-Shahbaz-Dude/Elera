import { overview } from '../../brillianceData';

export default function OverviewSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
      <p className="text-gray-300 leading-relaxed">{overview}</p>
    </div>
  );
}


