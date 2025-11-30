import { focusProfile } from '../../brillianceData';

export default function FocusProfileSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Focus And Environment</h2>
      
      <p className="text-gray-300 leading-relaxed mb-6">{focusProfile.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-green-400 mb-4">Energisers</h3>
          <ul className="space-y-2">
            {focusProfile.energizers.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-red-400 mb-4">Drainers</h3>
          <ul className="space-y-2">
            {focusProfile.drainers.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <span className="text-red-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


