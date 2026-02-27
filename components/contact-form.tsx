'use client'

import { useState, useCallback } from 'react'

const ACCENT = '#B19EEF'
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/gabriel-das-neves/'
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'gabriel@example.com'

function buildMailtoLink(email: string, subject: string, body: string): string {
  const params = new URLSearchParams({
    subject: subject || 'Contact from portfolio',
    body: body || ''
  })
  return `mailto:${email}?${params.toString()}`
}

export function ContactForm() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSendEmail = useCallback(() => {
    const link = buildMailtoLink(CONTACT_EMAIL, subject, body)
    window.location.href = link
  }, [subject, body])

  return (
    <div className="relative w-full max-w-md">
      <div
        className="rounded-xl border border-gray-700 bg-black/60 px-8 pt-10 pb-20 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        style={{ boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(177,158,239,0.1)` }}
      >
        <h2 className="mb-8 text-center text-lg font-bold uppercase tracking-wide text-white/90">
          Contact
        </h2>

        <form
          id="contact-form"
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendEmail()
          }}
        >
          <div className="flex flex-col">
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full border-0 border-b border-gray-600 bg-transparent py-2 text-gray-200 placeholder:text-gray-500 focus:border-[#B19EEF] focus:outline-none"
              style={{ caretColor: ACCENT }}
            />
          </div>

          <div className="flex flex-col">
            <textarea
              id="contact-message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Your message"
              rows={4}
              className="w-full resize-y border-0 border-b border-gray-600 bg-transparent py-2 text-gray-200 placeholder:text-gray-500 focus:border-[#B19EEF] focus:outline-none"
              style={{ caretColor: ACCENT }}
            />
          </div>
        </form>
      </div>

      <div className="absolute -bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-4 px-6 md:px-0">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 min-w-[120px] items-center justify-center rounded-full border border-gray-600 bg-black px-6 text-sm font-semibold uppercase tracking-wide text-gray-200 transition-all duration-300 hover:scale-105 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B19EEF] focus:ring-offset-2 focus:ring-offset-black"
        >
          LinkedIn
        </a>
        <button
          type="submit"
          form="contact-form"
          className="relative flex h-12 min-w-[120px] items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B19EEF] focus:ring-offset-2 focus:ring-offset-black"
          style={{ backgroundColor: ACCENT }}
        >
          <span
            className="absolute right-1 top-1 opacity-80"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 10px 10px 0',
              borderColor: 'transparent rgba(0,0,0,0.3) transparent transparent'
            }}
          />
          Send Email
        </button>
      </div>
    </div>
  )
}
