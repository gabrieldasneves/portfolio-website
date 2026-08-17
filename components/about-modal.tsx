'use client'

import { useEffect, useRef } from 'react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Fechar modal"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-600/50 bg-black/90 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-4 border-b border-gray-700/60 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">
              About
            </p>
            <h2 id="about-modal-title" className="mt-1 text-2xl font-bold text-white">
              Gabriel das Neves
            </h2>
            <p className="mt-1 text-sm text-gray-400">Full-stack Software Engineer</p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-600/50 text-gray-400 transition-colors hover:border-gray-500 hover:bg-gray-800/60 hover:text-white"
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 text-sm leading-relaxed text-gray-300">
          <p>
            Full-stack Software Engineer with 5+ years of experience building scalable web and
            mobile applications, specializing in AI-powered systems. Proven track record leading
            end-to-end product development, from system design and stakeholder alignment to delivery
            and team mentorship. Multilingual professional (native Portuguese, fluent English,
            advanced French, and working proficiency in Spanish) with international experience
            across Japan, France, and Brazil. Open to international opportunities.
          </p>
        </div>
      </div>
    </div>
  )
}
