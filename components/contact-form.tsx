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
    <div
      className="w-full max-w-md rounded-sm border-2 bg-black/50 px-6 py-8 shadow-[0_0_20px_rgba(177,158,239,0.2)] sm:px-8 sm:py-10"
      style={{ borderColor: ACCENT }}
    >
      {/* Title bar */}
      <div
        className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider sm:text-sm"
        style={{ color: ACCENT }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <span>CONTACT</span>
      </div>

      <form
        className="flex flex-col gap-6 sm:gap-8"
        onSubmit={(e) => {
          e.preventDefault()
          handleSendEmail()
        }}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="contact-subject"
            className="font-mono text-xs uppercase tracking-wider sm:text-sm"
            style={{ color: ACCENT }}
          >
            SUBJECT
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder=" "
            className="w-full border-b bg-transparent py-2 font-mono text-sm uppercase tracking-wider placeholder:opacity-50 focus:outline-none sm:text-base"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
              caretColor: ACCENT
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="contact-message"
            className="font-mono text-xs uppercase tracking-wider sm:text-sm"
            style={{ color: ACCENT }}
          >
            MESSAGE
          </label>
          <textarea
            id="contact-message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder=" "
            rows={4}
            className="w-full resize-y border-b bg-transparent py-2 font-mono text-sm uppercase tracking-wider placeholder:opacity-50 focus:outline-none sm:text-base"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
              caretColor: ACCENT
            }}
          />
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-4">
          <button
            type="submit"
            className="cursor-target w-full border-2 py-3 font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
              ringColor: ACCENT
            }}
          >
            SEND_EMAIL
          </button>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target flex w-full items-center justify-center border-2 py-3 font-mono text-xs uppercase tracking-wider no-underline transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent sm:text-sm"
            style={{
              borderColor: ACCENT,
              color: ACCENT,
              ringColor: ACCENT
            }}
          >
            LINKEDIN
          </a>
        </div>
      </form>
    </div>
  )
}
