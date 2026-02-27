'use client'

import Image from 'next/image'
import { ShinyText } from './shiny-text'
import { TechLogoLoop } from './logo-loop'

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

        <div />

      <div className="absolute bottom-4 left-0 right-0 z-20 w-full max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
        <p className="text-base md:text-lg text-center">
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
        <TechLogoLoop />
      </div>
      </div>
    </section>
  )
}
