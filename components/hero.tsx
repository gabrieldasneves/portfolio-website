'use client'

import Image from 'next/image'
import { ShinyText } from './shiny-text'
import { TechLogoLoop } from './logo-loop'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
      <div
        className="fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0">
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

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-end pb-16 pt-4 px-4 text-center">
        <div className="flex flex-col items-center gap-6 w-full">
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
          <p className="text-base md:text-lg text-center max-w-4xl mx-auto px-4">
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
          <ShinyText
            text="Paleontology enthusiast"
            speed={2}
            delay={0.7}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
        </p>
        <div className="w-full px-4 md:px-8">
          <TechLogoLoop />
        </div>
      </div>
      </div>
    </section>
  )
}
