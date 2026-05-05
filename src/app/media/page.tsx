"use client";

type MediaItem = {
  title: string;
  creator: string;
  sourceUrl: string;
  summary: string;
  tags: string[];
};

import { useEffect, useState } from "react";

function getEmbedUrl(url: string) {
  const youtubeWatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  const youtubeShort = url.match(/youtu\.be\/([^?&]+)/);
  const youtubeEmbed = url.match(/youtube\.com\/embed\/([^?&]+)/);

  if (youtubeWatch?.[1]) return `https://www.youtube.com/embed/${youtubeWatch[1]}`;
  if (youtubeShort?.[1]) return `https://www.youtube.com/embed/${youtubeShort[1]}`;
  if (youtubeEmbed?.[1]) return url;

  return "";
}

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reaper/launch-fix')
      .then(res => res.json())
      .then(data => {
        if (data.clips) {
          setMediaItems(data.clips.map((clip: any) => ({
            title: clip.title,
            creator: clip.creator,
            sourceUrl: clip.youtubeUrl,
            summary: clip.viewsLabel || 'Official or approved YouTube embed slot.',
            tags: ['EMBED', 'SAFE', clip.status],
          })));
        }
      })
      .catch(err => console.error("Failed to load media:", err));
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">Media</p>
        <h1 className="mt-2 text-4xl font-black uppercase">FortHub Media Hub</h1>
        <p className="mt-3 max-w-3xl text-white/60">
          Real embedded YouTube videos only. No reuploads. No stolen clips. Attribution required.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {mediaItems.map((item) => {
            const embedUrl = getEmbedUrl(item.sourceUrl);

            return (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="aspect-video bg-black">
                  {embedUrl ? (
                    <iframe
                      className="h-full w-full"
                      src={embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/40">
                      No valid embed URL
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm text-primary">Creator: {item.creator}</p>
                  <p className="mt-3 text-white/60">{item.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags?.map((tag: string) => (
                      <span key={tag} className="rounded bg-emerald-500/20 px-2 py-1 text-xs font-bold text-emerald-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-primary hover:underline"
                  >
                    Open source video
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
