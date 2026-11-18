'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ShinyText } from './shiny-text'
import { TechLogoLoop } from './logo-loop'
import { useScroll } from '@/contexts/scroll-context'

export function Hero () {
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const scrollOffsetRef = useRef(0)
  const scrollContext = useScroll()
  const scrollY = scrollContext?.scrollY ?? 0

  useEffect(() => {
    scrollOffsetRef.current = Math.min(scrollY, window.innerHeight) * 0.12
  }, [scrollY])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let enabled = media.matches && !reduceMotion.matches

    function applyTransform () {
      const el = imageWrapRef.current
      if (!el) return
      const { x, y } = currentRef.current
      const scrollYOffset = enabled ? scrollOffsetRef.current : 0
      el.style.transform = `translate3d(${x}px, ${y + scrollYOffset}px, 0) scale(1.08)`
    }

    function tick () {
      const cur = currentRef.current
      const target = targetRef.current
      cur.x += (target.x - cur.x) * 0.08
      cur.y += (target.y - cur.y) * 0.08
      applyTransform()
      frame = requestAnimationFrame(tick)
    }

    function onPointerMove (event: PointerEvent) {
      if (!enabled) return
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      targetRef.current = {
        x: nx * 18,
        y: ny * 12,
      }
    }

    function onLeave () {
      targetRef.current = { x: 0, y: 0 }
    }

    function syncEnabled () {
      enabled = media.matches && !reduceMotion.matches
      if (!enabled) {
        targetRef.current = { x: 0, y: 0 }
        currentRef.current = { x: 0, y: 0 }
        applyTransform()
      }
    }

    syncEnabled()
    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    media.addEventListener('change', syncEnabled)
    reduceMotion.addEventListener('change', syncEnabled)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onLeave)
      media.removeEventListener('change', syncEnabled)
      reduceMotion.removeEventListener('change', syncEnabled)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          ref={imageWrapRef}
          className="absolute inset-[-4%] will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0) scale(1.08)' }}
        >
          <Image
            src="/hero-photo.png"
            alt=""
            fill
            unoptimized
            className="object-cover object-center grayscale"
            priority
            quality={92}
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_38%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_32%,rgba(0,0,0,0.38)_58%,rgba(0,0,0,0.68)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-end px-4 pb-16 pt-4 text-center">
        <div className="flex w-full flex-col items-center gap-6">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            <ShinyText
              text="Gabriel das Neves"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
            />
          </h1>
          <p className="mx-auto max-w-4xl px-4 text-center text-base md:text-lg">
            <ShinyText
              text="Computer engineer"
              speed={2}
              delay={0.5}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
            />
            <br />
          </p>
          <div className="-mx-4 w-full md:mx-0 md:px-8">
            <TechLogoLoop />
          </div>
        </div>
      </div>
    </section>
  )
}
