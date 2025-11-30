import { nextSteps } from '../../brillianceData';

export default function NextStepsSection() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
      <ul className="space-y-4">
        {nextSteps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <span className="text-indigo-400 font-bold mt-1">{index + 1}.</span>
            <span className="leading-relaxed">{step.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


