'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useScroll } from '@/contexts/scroll-context'
import Carousel from '@/components/ui/carousel'

const projects = [
  {
    id: '1',
    title: 'IsMyCodeTrash',
    subtitle: 'Next.js · Agentic AI · Claude API',
    description:
      'AI-powered code roaster. Paste your code and get brutally honest feedback from Claude — shame scores, verdicts, and suggested fixes.',
    image: '/projects/ismycodetrash.png',
    url: 'https://github.com/gabrieldasneves/IsMyCodeTrash',
    tags: 'Next.js · tRPC · Drizzle · Vercel AI SDK',
  },
  {
    id: '2',
    title: 'DigFinder',
    subtitle: 'React Native · NodeJS',
    description:
      'Mobile app for amateur paleontologists to log, map, and share fossil findings around the world.',
    image: '/projects/digfinder-app.png',
    url: 'https://github.com/gabrieldasneves/DigFinder-app',
    tags: 'React Native · NodeJS',
  },
  {
    id: '3',
    title: 'Luma',
    subtitle: 'Chrome Extension · MV3',
    description:
      'Chrome extension that captures highlights as you browse and exports them to Word or PDF with source links included.',
    image: '/projects/luma.png',
    url: 'https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege',
    tags: 'React · TypeScript · Vite · Tailwind',
  },
  {
    id: '4',
    title: 'Archon-viz',
    subtitle: 'D3.js · Data Viz',
    description:
      'Turn tabular data into clear visual hierarchies. Drag, edit, and explore your structure through an intuitive UI.',
    image: '/projects/archon-viz.png',
    url: 'https://github.com/gabrieldasneves/Archon-viz',
    tags: 'D3.js · HTML · CSS',
  },
  {
    id: '5',
    title: 'Node API TDD + SOLID',
    subtitle: 'NodeJS · Clean Architecture',
    description:
      'Node.js backend focused on Clean Architecture, SOLID, Design Patterns, TDD, and automated testing from unit to E2E.',
    url: 'https://github.com/gabrieldasneves/Node-api-tdd-solid',
    tags: 'NodeJS · Prisma · Fastify',
  },
  {
    id: '6',
    title: 'ML Studies',
    subtitle: 'Python · Data Science',
    description:
      'Collection of AI/ML/DS projects: algorithm benchmarks, CNN on CIFAR-10, NBA injury prediction, and manga EDA.',
    image: '/projects/machine-learn-studies.png',
    url: 'https://github.com/gabrieldasneves/MachineLearnStudies',
    tags: 'Python · Jupyter · scikit-learn',
  },
]

function ProjectCard ({
  title,
  subtitle,
  description,
  image,
  url,
  tags,
}: (typeof projects)[number]) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-full w-full flex-col overflow-hidden bg-zinc-900 text-left"
    >
      {image ? (
        <div className="relative h-[48%] w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            className="object-cover object-top"
            sizes="(max-width: 768px) 92vw, 560px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"
            aria-hidden
          />
        </div>
      ) : (
        <div className="flex h-[32%] items-center justify-center bg-zinc-800/80">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Code only
          </span>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-400/85">
          {subtitle}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-300/90">
          {description}
        </p>
        {tags && (
          <p className="mt-1 font-mono text-[11px] text-zinc-500">{tags}</p>
        )}
      </div>
    </a>
  )
}

export default function ProjectsPage () {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContext = useScroll()

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current)
    return () => scrollContext?.registerScrollContainer(null)
  }, [scrollContext])

  const items = projects.map((project) => (
    <ProjectCard key={project.id} {...project} />
  ))

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      <div
        ref={scrollRef}
        className="relative z-20 min-h-0 w-full flex-1 overflow-auto pt-24"
      >
        <div className="flex min-h-full items-center justify-center px-4 pb-16">
          <Carousel
            items={items}
            baseWidth={560}
            aspectRatio={0.72}
            peek={56}
            gap={20}
            radius={20}
            frame
            effect="tilt"
            indicator="bars"
            arrows
            autoplay
            autoplayDelay={4500}
            pauseOnHover
            loop
            draggable
            theme="dark"
          />
        </div>
      </div>
    </section>
  )
}
