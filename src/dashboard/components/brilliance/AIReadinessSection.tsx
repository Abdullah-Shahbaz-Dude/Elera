import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { aiReadinessScores, aiAutomationDescription } from '../../brillianceData';

export default function AIReadinessSection() {
  const chartData = aiReadinessScores.map(score => ({
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
      <h2 className="text-2xl font-bold text-white mb-6">AI & Automation</h2>
      
      <p className="text-gray-300 leading-relaxed mb-6">{aiAutomationDescription}</p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">AI & Automation Readiness</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: '#cbd5e1', fontSize: 14 }}
                label={{ value: 'Score (%)', position: 'insideBottom', offset: -10, fill: '#cbd5e1' }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                width={90}
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
                  'Readiness',
                ]}
              />
              <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


