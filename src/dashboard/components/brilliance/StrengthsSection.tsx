import { strengthsDescription, coreStrengths } from '../../brillianceData';

export default function StrengthsSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Strengths</h2>
      <p className="text-gray-300 leading-relaxed mb-6">{strengthsDescription}</p>
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Core Strengths</h3>
        <ul className="space-y-2">
          {coreStrengths.map((strength, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-300">
              <span className="text-indigo-400">•</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


