import { bands } from '../data';

export default function ScoreBands() {
  const getBandColor = (bandName: string) => {
    switch (bandName) {
      case 'Strong':
        return 'from-green-500 to-emerald-600';
      case 'Good':
        return 'from-blue-500 to-cyan-600';
      case 'Developing':
        return 'from-yellow-500 to-orange-500';
      case 'Needs Attention':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">How Your Scores Are Calculated</h2>
      <p className="text-gray-300 mb-6 leading-relaxed">
        Every answer you gave in the survey is converted to a 0–100 scale using fixed rules (for example, "Quite confident" = 75 points, "Occasionally" = 50 points; multi-select questions are scored as the percentage of evidence-based options chosen). We then average the relevant questions into four categories and place them into clear, research-backed bands that have been validated with hundreds of UK managers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bands.map((band, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${getBandColor(band.name)} rounded-xl p-6 text-white transform transition-all hover:scale-105 hover:shadow-xl`}
          >
            <h3 className="text-xl font-bold mb-2">{band.name}</h3>
            <p className="text-sm font-semibold mb-3 opacity-90">{band.range}</p>
            <p className="text-sm opacity-90 italic">{band.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

