import { useEffect, useMemo, useState } from 'react';

type VideoStatus = 'loading' | 'ready' | 'coming_soon';

export default function VideoLessonPlayer({
  title,
  videoUrl,
  className,
}: {
  title: string;
  videoUrl?: string | null;
  className?: string;
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

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${
        className ?? ''
      }`}
      style={{ background: '#2D3449', borderColor: '#424754', borderRadius: 8 }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/60 via-black/0 to-black/0" />
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
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin mx-auto" />
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
          <div className="text-center">
            <div className="w-20 h-20 rounded-[12px] bg-[#ADC6FF] flex items-center justify-center mx-auto shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]">
              <span className="material-symbols-outlined text-[#002E6A] text-[28px]">
                play_arrow
              </span>
            </div>
            <h3 className="mt-4 text-base md:text-lg font-semibold text-[#D9E2FD]">
              {title}
            </h3>
            <p className="mt-1 text-xs md:text-sm text-[#D9E2FD]/70">
              Video coming soon
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#D9E2FD]">{title}</span>
          <span className="text-xs font-medium text-[#D9E2FD]/70">
            {status === 'loading'
              ? 'Loading...'
              : hasVideo
                ? 'Watch & Learn'
                : 'Coming Soon'}
          </span>
        </div>
      </div>
    </div>
  );
}
