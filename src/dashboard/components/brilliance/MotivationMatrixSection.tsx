import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motivationScores, motivationMatrixDescription } from '../../brillianceData';

export default function MotivationMatrixSection() {
  const chartData = motivationScores.map(score => ({
    name: score.label,
    score: score.percentage,
    rawScore: score.score,
  }));

  const getBarColor = (score: number) => {
    if (score >= 75) return '#10b981'; // green
    if (score >= 50) return '#3b82f6'; // blue
    if (score >= 25) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Motivation Matrix</h2>
      
      <p className="text-gray-300 leading-relaxed mb-6">{motivationMatrixDescription}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Motivation Scores</h3>
          <div className="space-y-2">
            {motivationScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                <span className="text-gray-300 text-sm">{score.label}:</span>
                <span className="text-indigo-400 font-medium">{score.score}/5</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Motivation Type Spectrum</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#cbd5e1', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#cbd5e1', fontSize: 14 }}
                  label={{ value: 'Influence Level (%)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value: number, _name: string, props: any) => [
                    `${value}% (Score: ${props.payload.rawScore}/5)`,
                    'Motivation',
                  ]}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


