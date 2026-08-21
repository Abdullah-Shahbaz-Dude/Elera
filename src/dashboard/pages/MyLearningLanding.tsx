import LearningProgrammeCard from '@/dashboard/components/LearningProgrammeCard';
import LearningProgrammeCardSkeleton from '@/dashboard/components/LearningProgrammeCardSkeleton';
import { useLearningProgrammes } from '@/hooks/useLearningProgrammes';

export default function MyLearningLanding() {
  const { programmes, loading } = useLearningProgrammes();

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
        {loading && programmes.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            <LearningProgrammeCardSkeleton compact={false} />
            <LearningProgrammeCardSkeleton compact={false} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            {programmes.map((programme) => (
              <LearningProgrammeCard key={programme.programme_id} programme={programme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
