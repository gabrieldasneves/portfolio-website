'use client'

import { useRef, useEffect } from 'react'
import { ContactForm } from '@/components/contact-form'
import { useScroll } from '@/contexts/scroll-context'

export default function ContactPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContext = useScroll()

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current)
    return () => scrollContext?.registerScrollContainer(null)
  }, [scrollContext])

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div
          ref={scrollRef}
          className="relative z-20 flex min-h-full w-full flex-col items-center justify-center overflow-auto px-4 pt-24"
        >
          <ContactForm />
        </div>
      </section>
    </>
  )
}
