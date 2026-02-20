'use client'

import Link from 'next/link'
import { GhostCursor } from './ghost-cursor'

export function Hero() {
  return (
    <>
      <GhostCursor
        color="#B19EEF"
        trailLength={50}
        inertia={0.5}
        brightness={2}
        mixBlendMode="screen"
      />
      <section className="relative h-screen w-full overflow-hidden bg-black">
      
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-8 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
          Gabriel das Neves
        </h1>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="pulsing-bottom-border rounded-lg border-t-0 border-l-0 border-r-0 border-b-0 bg-transparent px-8 py-3 text-lg font-semibold text-black transition-all hover:border-2 hover:border-purple-500 hover:text-purple-500 hover:bg-black hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="pulsing-bottom-border rounded-lg border-t-0 border-l-0 border-r-0 border-b-0 bg-transparent px-8 py-3 text-lg font-semibold text-black transition-all hover:border-2 hover:border-purple-500 hover:text-purple-500 hover:bg-black hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}
