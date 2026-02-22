'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShinyText } from './shiny-text'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 origin-center scale-100 md:scale-95 lg:scale-90 xl:scale-85 2xl:scale-80">
          <Image
            src="/hero-photo.png"
            alt=""
            fill
            className="object-cover grayscale"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-between pt-4 pb-16 px-4 text-center">
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
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="link-silver pulsing-bottom-border rounded-lg border-t-0 border-l-0 border-r-0 border-b-0 bg-transparent px-8 py-3 text-lg font-semibold transition-all hover:border-2 hover:border-purple-500 hover:bg-black hover:scale-105"
          >
            <span className="text-silver">View Projects</span>
          </Link>
          <Link
            href="/contact"
            className="link-silver pulsing-bottom-border rounded-lg border-t-0 border-l-0 border-r-0 border-b-0 bg-transparent px-8 py-3 text-lg font-semibold transition-all hover:border-2 hover:border-purple-500 hover:bg-black hover:scale-105"
          >
            <span className="text-silver">Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
