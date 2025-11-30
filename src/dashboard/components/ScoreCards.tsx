import { scores, overallScore } from '../data';

export default function ScoreCards() {
  const getBandColor = (band: string) => {
    switch (band) {
      case 'Strong':
        return 'bg-gradient-to-br from-green-500 to-emerald-600';
      case 'Good':
        return 'bg-gradient-to-br from-blue-500 to-cyan-600';
      case 'Developing':
        return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      case 'Needs Attention':
        return 'bg-gradient-to-br from-red-500 to-rose-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const getBandBadgeColor = (band: string) => {
    switch (band) {
      case 'Strong':
        return 'bg-green-900/50 text-green-300 border border-green-700';
      case 'Good':
        return 'bg-blue-900/50 text-blue-300 border border-blue-700';
      case 'Developing':
        return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700';
      case 'Needs Attention':
        return 'bg-red-900/50 text-red-300 border border-red-700';
      default:
        return 'bg-gray-800 text-gray-300 border border-gray-700';
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-6 border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Rachel – Your Results at a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {scores.map((score, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:shadow-lg hover:border-slate-500 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{score.category}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBandBadgeColor(score.band)}`}>
                  {score.band}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">{score.score}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getBandColor(score.band)} transition-all duration-500`}
                    style={{ width: `${score.score}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-300">{score.description}</p>
            </div>
          ))}
        </div>

        <div className={`${getBandColor(overallScore.band)} rounded-xl p-8 text-white border border-white/20`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Overall Score</h3>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold border border-white/30">
              {overallScore.band}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-5xl font-bold">{overallScore.score}%</span>
          </div>
          <p className="text-lg opacity-95">{overallScore.description}</p>
        </div>
      </div>
    </div>
  );
}

