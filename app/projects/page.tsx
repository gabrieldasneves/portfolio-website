'use client'

import { useRef, useEffect } from 'react'
import { BentoGrid } from '@/components/bento-grid'
import { useScroll } from '@/contexts/scroll-context'

const projects = [
  {
    id: '1',
    primaryTitle: 'Next.js, Agentic AI, Claude API, Opencode',
    secondaryTitle: 'IsMyCodeTrash',
    description:
      'AI-powered code roaster. Paste your code and get brutally honest feedback from Claude — shame scores, verdicts, suggested fixes, and a public leaderboard. Built with Next.js 16, tRPC, Drizzle, Vercel AI SDK, and Shiki.',
    image: '/projects/ismycodetrash.png',
    url: 'https://github.com/gabrieldasneves/IsMyCodeTrash',
    imageBrightness: 0.65,
    objectPosition: 'center top',
  },
  {
    id: '2',
    primaryTitle: 'React Native, NodeJS',
    secondaryTitle: 'DigFinder-app',
    inProgress: true,
    description:
      'A mobile app designed for amateur paleontologists and fossil enthusiasts. It allows users to log, map, and share fossil findings around the world.',
    image: '/projects/digfinder-app.png',
    url: 'https://github.com/gabrieldasneves/DigFinder-app',
  },
  {
    id: '3',
    primaryTitle: 'Python, Jupyter Notebook',
    secondaryTitle: 'Machine Learning Studies',
    description:
      "Here you'll find my collection of AI/ML/DS projects, including algorithm benchmarks, CNN practice with CIFAR-10, NBA injury prediction, and a fun manga EDA. Feel free to dive in!",
    image: '/projects/machine-learn-studies.png',
    url: 'https://github.com/gabrieldasneves/MachineLearnStudies',
    colSpan: 2,
  },
  {
    id: '4',
    primaryTitle: 'D3.js, HTML & CSS',
    secondaryTitle: 'Archon-viz',
    description:
      'Turn tabular data into clear, visual hierarchies. Drag, edit, and explore your structure through an intuitive UI. Export your modified data in seconds.',
    image: '/projects/archon-viz.png',
    url: 'https://github.com/gabrieldasneves/Archon-viz',
    colSpan: 3,
  },
  {
    id: '5',
    primaryTitle: 'NodeJS, Prisma, Fastify',
    secondaryTitle: 'Node API with TDD and SOLID',
    inProgress: true,
    description:
      'Node.js backend project focused on Clean Architecture, SOLID, Design Patterns, TDD, and automated testing from unit to E2E.',
    colSpan: 3,
    url: 'https://github.com/gabrieldasneves/Node-api-tdd-solid',
  },
  {
    id: '6',
    primaryTitle: 'HTML, CSS, FIGMA',
    secondaryTitle: 'Credit card system interface',
    description:
      'This component simulates a credit card form, where it is possible to add mask to the inputs and update HTML elements via DOM.',
    image: '/projects/credit-card-sys-interface.png',
    url: 'https://github.com/gabrieldasneves/credit_card_sys_interface',
    colSpan: 6,
  },
]

export default function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContext = useScroll()

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current)
    return () => scrollContext?.registerScrollContainer(null)
  }, [scrollContext])

  return (
    <>
      <section className="relative h-screen w-full flex flex-col overflow-hidden bg-black">
        <div
          ref={scrollRef}
          className="relative z-20 flex-1 min-h-0 w-full overflow-auto pt-24"
        >
          <BentoGrid projects={projects} />
        </div>
      </section>
    </>
  )
}
