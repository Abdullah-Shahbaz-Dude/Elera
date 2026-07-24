import { useEffect, useMemo, useState } from 'react';

type VideoStatus = 'loading' | 'ready' | 'coming_soon';

export default function VideoLessonPlayer({
  title,
  videoUrl,
  className,
  theme = 'dark',
  hideFooter = false,
  compact = false,
}: {
  title: string;
  videoUrl?: string | null;
  className?: string;
  theme?: 'dark' | 'light';
  hideFooter?: boolean;
  compact?: boolean;
}) {
  const hasVideo = Boolean(videoUrl);

  // Convert Google Drive share URL to embeddable format
  const embedUrl = useMemo(() => {
    if (!videoUrl) return null;
    const fileId = videoUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    return fileId
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : videoUrl;
  }, [videoUrl]);

  const [status, setStatus] = useState<VideoStatus>(
    hasVideo ? 'loading' : 'coming_soon'
  );

  useEffect(() => {
    if (!hasVideo) {
      setStatus('coming_soon');
      return;
    }

    setStatus('loading');
    const t = window.setTimeout(() => setStatus('ready'), 5000);
    return () => window.clearTimeout(t);
  }, [hasVideo, embedUrl]);

  const isLight = theme === 'light';

  return (
    <div
      className={`relative w-full overflow-hidden border ${
        isLight
          ? 'bg-[#EEF3FA] border-[#E5E9F0] shadow-none rounded-xl'
          : 'aspect-video shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'
      } ${className ?? ''}`}
      style={
        isLight
          ? undefined
          : { background: '#2D3449', borderColor: '#424754', borderRadius: 8 }
      }
    >
      {!isLight ? (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/60 via-black/0 to-black/0" />
      ) : null}
      {hasVideo && embedUrl ? (
        <>
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={title}
            onLoad={() => setStatus('ready')}
          />

          {status === 'loading' && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin mx-auto" />
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
                <p className="text-white font-medium text-sm">Loading video</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center px-6">
            <div
              className={`rounded-2xl flex items-center justify-center mx-auto ${
                compact ? 'w-16 h-16' : 'w-20 h-20'
              } ${
                isLight
                  ? 'bg-white border border-[#E5E9F0] shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]'
                  : 'bg-[#ADC6FF] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  compact ? 'text-[24px]' : 'text-[28px]'
                } ${isLight ? '' : 'text-[#002E6A]'}`}
                style={isLight ? { color: '#2E7CF6' } : undefined}
              >
                play_arrow
              </span>
            </div>
            <h3
              className={`${compact ? 'mt-3 text-sm md:text-base' : 'mt-4 text-base md:text-lg'} font-semibold ${
                isLight ? '' : 'text-[#D9E2FD]'
              }`}
              style={isLight ? { color: '#1F3864' } : undefined}
            >
              {title}
            </h3>
            <p
              className={`mt-1 text-xs md:text-sm ${
                isLight ? '' : 'text-[#D9E2FD]/70'
              }`}
              style={isLight ? { color: '#4B5563' } : undefined}
            >
              Video coming soon
            </p>
          </div>
        </div>
      )}

      {!hideFooter ? (
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 ${
            isLight
              ? 'bg-gradient-to-t from-white/95 to-transparent'
              : 'bg-gradient-to-t from-black/60 to-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${isLight ? '' : 'text-[#D9E2FD]'}`}
              style={isLight ? { color: '#1F3864' } : undefined}
            >
              {title}
            </span>
            <span
              className={`text-xs font-medium ${
                isLight ? '' : 'text-[#D9E2FD]/70'
              }`}
              style={isLight ? { color: '#4B5563' } : undefined}
            >
              {status === 'loading'
                ? 'Loading...'
                : hasVideo
                  ? 'Watch & Learn'
                  : 'Coming Soon'}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
