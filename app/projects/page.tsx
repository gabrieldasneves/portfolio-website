'use client'

import Link from 'next/link'
import { Aurora } from '@/components/aurora'
import { TargetCursor } from '@/components/target-cursor'
import { BentoGrid } from '@/components/bento-grid'

const projects = [
  {
    id: '1',
    primaryTitle: 'D3.js, HTML & CSS',
    secondaryTitle: 'Archon-viz',
    description:
      'Turn tabular data into clear, visual hierarchies. Drag, edit, and explore your structure through an intuitive UI. Export your modified data in seconds.',
    image: '/projects/archon-viz.png',
    url: 'https://github.com/gabrieldasneves/Archon-viz',
  },
  {
    id: '2',
    primaryTitle: 'React Native, NodeJS',
    secondaryTitle: 'DigFinder-app',
    description:
      'A mobile app designed for amateur paleontologists and fossil enthusiasts. It allows users to log, map, and share fossil findings around the world.',
    image: '/projects/digfinder-app.png',
    url: 'https://github.com/gabrieldasneves/DigFinder-app',
  },
  {
    id: '3',
    primaryTitle: 'Jupyter Notebook',
    secondaryTitle: 'MachineLearnStudies',
    description:
      "Here you'll find my collection of AI/ML/DS projects, including algorithm benchmarks, CNN practice with CIFAR-10, NBA injury prediction, and a fun manga EDA. Feel free to dive in!",
    rowSpan: 2,
    image: '/projects/machine-learn-studies.png',
    url: 'https://github.com/gabrieldasneves/MachineLearnStudies',
  },
  {
    id: '4',
    primaryTitle: 'TypeScript',
    secondaryTitle: 'Node-api-tdd-solid',
    description:
      'Node.js backend project focused on Clean Architecture, SOLID, Design Patterns, TDD, and automated testing from unit to E2E.',
    colSpan: 2,
    url: 'https://github.com/gabrieldasneves/Node-api-tdd-solid',
  },
  {
    id: '5',
    primaryTitle: 'HTML',
    secondaryTitle: 'credit_card_sys_interface',
    description:
      'This component simulates a credit card form, where it is possible to add mask to the inputs and update HTML elements via DOM.',
    image: '/projects/credit-card-sys-interface.png',
    url: 'https://github.com/gabrieldasneves/credit_card_sys_interface',
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
