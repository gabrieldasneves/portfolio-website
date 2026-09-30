"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { timelineStops } from "@/data/timeline";
import { TimelineMap, type TimelineMapHandle } from "@/components/timeline-map";
import { useScroll } from "@/contexts/scroll-context";

export function TimelineScrolly() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const mapRef = useRef<TimelineMapHandle>(null);
  const scrollContext = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const showHint = (scrollContext?.scrollY ?? 0) === 0;

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current);
    return () => scrollContext?.registerScrollContainer(null);
  }, [scrollContext]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const index = Number((top.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      {
        root,
        threshold: [0.35, 0.55, 0.7],
        rootMargin: "-10% 0px -25% 0px",
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="h-full w-full">
          <TimelineMap
            ref={mapRef}
            stops={timelineStops}
            activeIndex={activeIndex}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30"
          aria-hidden
        />
      </div>

      <div className="pointer-events-auto absolute bottom-8 left-4 z-30 flex flex-col overflow-hidden rounded-xl border border-white/15 bg-black/45 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md lg:bottom-10 lg:left-5">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          className="flex size-10 items-center justify-center border-b border-white/10 text-lg text-zinc-200 transition-colors hover:bg-white/10 hover:text-emerald-300"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          className="flex size-10 items-center justify-center text-lg text-zinc-200 transition-colors hover:bg-white/10 hover:text-emerald-300"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>

      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col lg:min-h-full lg:flex-row">
          <div className="hidden lg:block lg:w-[58%] lg:shrink-0" aria-hidden />

          <div className="w-full px-4 pb-24 pt-6 sm:px-6 lg:w-[42%] lg:px-8 lg:pb-32 lg:pt-20">
            <header className="mb-10 lg:mb-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-emerald-400/85 drop-shadow-sm">
                Timeline
              </p>
              <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)] sm:text-4xl">
                Places that shaped me
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-300 drop-shadow-sm">
                Scroll through the map — from Manaus to Japan, each stop is a
                chapter.
              </p>
            </header>

            <div className="flex flex-col gap-8 lg:gap-0">
              {timelineStops.map((stop, index) => {
                const isActive = index === activeIndex;
                return (
                  <section
                    key={stop.id}
                    ref={(node) => {
                      sectionRefs.current[index] = node;
                    }}
                    data-index={index}
                    className="lg:flex lg:min-h-[100dvh] lg:items-center"
                  >
                    <article
                      className={`relative w-full overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:p-6 ${
                        isActive
                          ? "border-white/20 bg-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                          : "border-white/10 bg-white/[0.03] opacity-50 backdrop-blur-md lg:opacity-35"
                      }`}
                    >
                      <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 font-mono text-xs text-emerald-300 backdrop-blur-sm">
                        {stop.index}
                      </div>

                      <p className="pr-12 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400/90">
                        {stop.period}
                      </p>
                      <h2 className="mt-3 pr-10 text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                        {stop.title}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-300">
                        {stop.location}
                        <span className="text-zinc-500"> · </span>
                        {stop.country}
                      </p>

                      <p className="mt-5 text-sm leading-relaxed text-zinc-200/95">
                        {stop.description}
                      </p>

                      <ul className="mt-5 space-y-2">
                        {stop.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm text-zinc-300"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald-400/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {stop.links && stop.links.length > 0 && (
                        <div className="mt-6">
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                            Relevant links
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {stop.links.map((link) => (
                              <li key={link.url}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-emerald-400/90 underline decoration-emerald-400/30 underline-offset-4 transition-colors hover:text-emerald-300"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {stop.image && (
                        <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                          <Image
                            src={stop.image}
                            alt={stop.imageAlt ?? stop.location}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 420px"
                          />
                        </div>
                      )}
                    </article>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center transition-all duration-300 lg:bottom-10 ${
          showHint ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        aria-hidden={!showHint}
      >
        <div className="timeline-scroll-hint flex flex-col items-center gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-300/80 drop-shadow-sm">
            Scroll
          </p>
          <span className="timeline-scroll-hint-arrow flex size-5 items-center justify-center text-emerald-300/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 drop-shadow-sm"
              aria-hidden
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
