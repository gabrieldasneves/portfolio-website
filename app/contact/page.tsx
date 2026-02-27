'use client'

import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-screen w-full bg-black">
        <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 pt-20">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
