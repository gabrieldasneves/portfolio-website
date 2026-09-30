'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { timelineStops, type TimelineStop } from '@/data/timeline'
import { TimelineMap, type TimelineMapHandle } from '@/components/timeline-map'
import { useScroll } from '@/contexts/scroll-context'

function TimelineCard ({
  stop,
  isActive = true,
  onClose,
}: {
  stop: TimelineStop
  isActive?: boolean
  onClose?: () => void
}) {
  return (
    <article
      className={`relative w-full overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:p-6 ${
        isActive
          ? 'border-white/20 bg-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl'
          : 'border-white/10 bg-white/[0.03] opacity-50 backdrop-blur-md lg:opacity-35'
      }`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="size-4"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}

      {!onClose && (
        <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 font-mono text-xs text-emerald-300 backdrop-blur-sm">
          {stop.index}
        </div>
      )}

      <p className="pr-12 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400/90">
        {stop.period || `Stop ${String(stop.index).padStart(2, '0')}`}
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
          <li key={item} className="flex gap-2 text-sm text-zinc-300">
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
  )
}

function FloatingStopCard ({
  stop,
  onOpen,
}: {
  stop: TimelineStop
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="timeline-float-card pointer-events-auto group absolute left-1/2 top-[44%] z-20 w-[min(17.5rem,calc(100vw-2.5rem))] -translate-x-1/2 -translate-y-[calc(100%+1.35rem)] rounded-2xl border border-white/20 bg-black/70 px-3.5 py-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-transform duration-300 active:scale-[0.98]"
      aria-label={`Open chapter: ${stop.title}`}
    >
      <span
        className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-white/20"
        aria-hidden
      />
      <span
        className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-black/80"
        aria-hidden
      />

      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/45 bg-emerald-400/15 font-mono text-[11px] text-emerald-300">
          {stop.index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-400/90">
            {stop.period || `Stop ${String(stop.index).padStart(2, '0')}`}
          </span>
          <span className="mt-1 block truncate text-[15px] font-semibold tracking-tight text-white">
            {stop.title}
          </span>
          <span className="mt-0.5 block truncate text-xs text-zinc-300">
            {stop.location}
          </span>
        </span>
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
            aria-hidden
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </div>
    </button>
  )
}

export function TimelineScrolly () {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const mapRef = useRef<TimelineMapHandle>(null)
  const scrollContext = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const showHint =
    (scrollContext?.scrollY ?? 0) === 0 && !isSheetOpen

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setIsDesktop(media.matches)
      if (media.matches) setIsSheetOpen(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current)
    return () => scrollContext?.registerScrollContainer(null)
  }, [scrollContext])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    let frame = 0
    let settleTimer = 0

    function commitActiveIndex (nextIndex: number) {
      setActiveIndex((prev) => {
        if (prev === nextIndex) return prev
        setIsSheetOpen(false)
        return nextIndex
      })
    }

    function updateActiveFromScroll () {
      const sections = sectionRefs.current
      if (!sections.length) return

      const rootRect = root!.getBoundingClientRect()
      const isLg = window.matchMedia('(min-width: 1024px)').matches
      // Mobile teasers sit near the bottom; desktop cards sit mid-column
      const focusY = rootRect.top + rootRect.height * (isLg ? 0.42 : 0.62)

      // Last section whose top has crossed the focus line
      let nextIndex = 0
      for (let index = 0; index < sections.length; index += 1) {
        const section = sections[index]
        if (!section) continue
        const rect = section.getBoundingClientRect()
        if (rect.top <= focusY) nextIndex = index
      }

      if (isLg) {
        commitActiveIndex(nextIndex)
        return
      }

      // On mobile, wait for scroll to settle a bit so the camera eases once
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        commitActiveIndex(nextIndex)
      }, 90)
    }

    function onScroll () {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveFromScroll)
    }

    updateActiveFromScroll()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (isDesktop || !isSheetOpen) return
    const root = scrollRef.current
    const previousBody = document.body.style.overflow
    const previousRoot = root?.style.overflow ?? ''
    document.body.style.overflow = 'hidden'
    if (root) root.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBody
      if (root) root.style.overflow = previousRoot
    }
  }, [isDesktop, isSheetOpen])

  const activeStop = timelineStops[activeIndex] ?? timelineStops[0]

  function openStop (index: number) {
    setActiveIndex(index)
    if (!isDesktop) setIsSheetOpen(true)
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="h-full w-full">
          <TimelineMap
            ref={mapRef}
            stops={timelineStops}
            activeIndex={activeIndex}
            onSelectStop={openStop}
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

      {!isDesktop && !isSheetOpen && activeStop && (
        <FloatingStopCard
          key={activeStop.id}
          stop={activeStop}
          onOpen={() => openStop(activeIndex)}
        />
      )}

      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col lg:min-h-full lg:flex-row">
          <div className="hidden lg:block lg:w-[58%] lg:shrink-0" aria-hidden />

          <div className="w-full px-4 pb-28 pt-24 sm:px-6 lg:w-[42%] lg:px-8 lg:pb-32 lg:pt-20">
            <header className="pointer-events-none mb-8 lg:mb-16">
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

            <div className="flex flex-col gap-0">
              {timelineStops.map((stop, index) => {
                const isActive = index === activeIndex
                return (
                  <section
                    key={stop.id}
                    ref={(node) => {
                      sectionRefs.current[index] = node
                    }}
                    data-index={index}
                    className="flex min-h-[50dvh] items-center lg:min-h-[100dvh]"
                    aria-label={`${stop.title}, ${stop.location}`}
                  >
                    <div className="hidden w-full lg:block">
                      <TimelineCard stop={stop} isActive={isActive} />
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {!isDesktop && isSheetOpen && activeStop && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Close chapter"
            onClick={() => setIsSheetOpen(false)}
          />
          <div className="relative max-h-[78dvh] overflow-y-auto overscroll-contain px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
            <TimelineCard
              stop={activeStop}
              onClose={() => setIsSheetOpen(false)}
            />
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center transition-all duration-300 lg:bottom-10 ${
          showHint ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
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
  )
}
