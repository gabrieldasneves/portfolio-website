'use client'

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { LiquidEther } from '@/components/liquid-ether'
import { TargetCursor } from '@/components/target-cursor'

export default function ContactPage() {
  return (
    <>
      <TargetCursor targetSelector="a, button, .cursor-target" />
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <LiquidEther
            colors={['#6B46C1', '#B19EEF', '#8B6FE8']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'auto',
              zIndex: 10,
            }}
          />
        </div>
        <nav className="relative z-30 flex justify-between items-center px-8 py-6">
          <Link
            href="/"
            className="cursor-target transition-colors text-white hover:opacity-80"
            aria-label="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
          <Link
            href="/projects"
            className="cursor-target transition-colors text-white hover:opacity-80"
            aria-label="Projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
            </svg>
          </Link>
        </nav>
        <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-4">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
