import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { thinkingStyleDescription, thinkingStyleScores } from '../../brillianceData';

export default function ThinkingStyleSection() {
  const chartData = thinkingStyleScores.map(score => ({
    attribute: score.name,
    score: score.percentage,
    fullMark: 100,
  }));

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Thinking Style</h2>
      
      <div className="mb-6">
        <p className="text-gray-300 leading-relaxed mb-4">{thinkingStyleDescription}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Thinking Style Scores</h3>
          <div className="space-y-2">
            {thinkingStyleScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                <span className="text-gray-300 text-sm">{score.name}:</span>
                <span className="text-indigo-400 font-medium">{score.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Core Strengths Radar Chart</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis
                  dataKey="attribute"
                  tick={{ fill: '#cbd5e1', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#cbd5e1', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


