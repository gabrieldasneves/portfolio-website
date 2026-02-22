'use client'

import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-screen w-full bg-black">
        <nav className="sticky top-0 z-30 flex justify-between items-center px-8 py-6 bg-black/80 backdrop-blur-sm">
          <Link
            href="/"
            className="transition-colors text-white hover:opacity-80"
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
            className="transition-colors text-white hover:opacity-80"
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
