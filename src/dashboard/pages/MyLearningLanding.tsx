import { useNavigate } from 'react-router-dom';
import mindSyncImg from '../../assets/images/mindsync/mindsync-image-1.jpg';
import futureSync from '../../assets/images/futuresync/futureSync-3.jpg';

interface StreamCard {
  id: 'mind-sync' | 'future-sync';
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const STREAMS: StreamCard[] = [
  {
    id: 'mind-sync',
    title: 'Mind Sync',
    subtitle: 'Mind Sync – Training',
    description:
      'Practical psychology-based training designed for real-world moments with ADHD families.',
    image: mindSyncImg,
  },
  {
    id: 'future-sync',
    title: 'Future Sync',
    subtitle: 'ELARA Future Sync – Training',
    description:
      'Three training blocks designed to strengthen thinking, performance and decision-making in digital environments.',
    image: futureSync,
  },
];

export default function MyLearningLanding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F7F9FC]">
      <header className="h-20 flex items-center justify-between px-8 z-20 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-8">
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: '#1F3864' }}
          >
            My Learning
          </h1>
          <div className="text-xs text-slate-500">Choose a training stream</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
          {STREAMS.map((s) => (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate(
                  s.id === 'future-sync'
                    ? '/dashboard/my-learning/future-sync'
                    : '/dashboard/my-learning/mind-sync'
                )
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                navigate(
                  s.id === 'future-sync'
                    ? '/dashboard/my-learning/future-sync'
                    : '/dashboard/my-learning/mind-sync'
                )
              }
              className="group relative aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)] hover:border-[#2E7CF6]/30 transition-all duration-500 cursor-pointer"
            >
              <img
                alt={s.title}
                src={s.image}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/90 via-[#1F3864]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
                  {s.subtitle}
                </div>
                <div className="text-xl font-bold text-white">{s.title}</div>
                <div className="text-sm text-white/85 max-w-xl">
                  {s.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
