import { useEffect, useState } from 'react';
import { logoImage } from '@/assets/images';

type ModuleProgressLoaderProps = {
  backgroundImage: string;
  message?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

export default function ModuleProgressLoader({
  backgroundImage,
  message = 'Loading your progress…',
}: ModuleProgressLoaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-slate-900"
      style={{ fontFamily: 'Arial' }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-[center_7%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {logoImage ? (
          <img
            src={logoImage}
            alt="Elara"
            className={`h-14 w-auto md:h-20 ${prefersReducedMotion ? '' : 'animate-pulse'}`}
          />
        ) : null}

        {prefersReducedMotion ? (
          <span className="sr-only">Loading module progress</span>
        ) : (
          <div
            className="h-10 w-10 rounded-full border-2 border-[#2E7CF6]/20 border-t-[#2E7CF6] animate-spin"
            aria-label="Loading module progress"
          />
        )}

        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: '#1F3864' }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
