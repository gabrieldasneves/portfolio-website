'use client'

import Link from 'next/link'
import { Aurora } from '@/components/aurora'
import { TargetCursor } from '@/components/target-cursor'
import { BentoGrid } from '@/components/bento-grid'

const projects = [
  {
    id: '1',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 1',
    description: 'Descrição do projeto 1',
  },
  {
    id: '2',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 2',
    description: 'Descrição do projeto 2',
  },
  {
    id: '3',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 3',
    description: 'Descrição do projeto 3',
    rowSpan: 2,
  },
  {
    id: '4',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 4',
    description: 'Descrição do projeto 4',
    colSpan: 2,
  },
  {
    id: '5',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 5',
    description: 'Descrição do projeto 5',
  },
  {
    id: '6',
    primaryTitle: 'Projeto',
    secondaryTitle: 'Projeto 6',
    description: 'Descrição do projeto 6',
  },
]

export default function ProjectsPage() {
  return (
    <>
      <Aurora
        colorStops={['#6B46C1', '#B19EEF', '#6B46C1']}
        amplitude={0.7}
        blend={0.5}
      />
      <TargetCursor targetSelector="a, button, .cursor-target" />
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <nav className="relative z-30 flex justify-between items-center px-8 py-6">
          <Link
            href="/"
            className="cursor-target transition-colors"
            style={{ color: '#000000' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
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
            href="/contact"
            className="cursor-target transition-colors"
            style={{ color: '#000000' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
            aria-label="Contact Me"
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </Link>
        </nav>
        <div className="relative z-20 flex min-h-screen w-full flex-col items-center px-4 py-20">
          <BentoGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
