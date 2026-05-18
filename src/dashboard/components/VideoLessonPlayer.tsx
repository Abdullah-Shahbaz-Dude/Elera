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
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : videoUrl;
  }, [videoUrl]);

  const [status, setStatus] = useState<VideoStatus>(hasVideo ? 'loading' : 'coming_soon');

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
      className={`relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl ${
        className ?? ''
      }`}
    >
      {hasVideo && embedUrl ? (
        <>
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-2xl"
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
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 mx-auto">
              <span className="material-symbols-outlined text-white text-2xl">
                play_circle
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm">Video coming soon</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
        <div className="flex items-center justify-between text-white">
          <span className="text-xs text-white/90 font-medium">{title}</span>
          <span className="text-xs text-emerald-400 font-medium">
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
