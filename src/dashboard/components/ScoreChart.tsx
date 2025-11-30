import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { scores } from '../data';

export default function ScoreChart() {
  const chartData = scores.map(score => ({
    category: score.category,
    score: score.score,
    band: score.band,
  }));

  const getBarColor = (band: string) => {
    switch (band) {
      case 'Strong':
        return '#10b981';
      case 'Good':
        return '#3b82f6';
      case 'Developing':
        return '#f59e0b';
      case 'Needs Attention':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Score Comparison Across Categories</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#cbd5e1', fontSize: 14 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fill: '#cbd5e1', fontSize: 14 }}
              label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
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
                `${value}%`,
                props.payload.band,
              ]}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.band)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

