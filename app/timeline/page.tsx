import type { Metadata } from 'next'
import { TimelineScrolly } from '@/components/timeline-scrolly'

export const metadata: Metadata = {
  title: 'Timeline · Gabriel das Neves',
  description: 'A map of places and chapters across Brazil, France, and Japan.',
}

export default function TimelinePage () {
  return (
    <main className="min-h-screen bg-black">
      <TimelineScrolly />
    </main>
  )
}
