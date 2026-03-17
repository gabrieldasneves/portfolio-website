'use client'

import Image from 'next/image'

interface Project {
  id: string
  primaryTitle: string
  secondaryTitle: string
  description: string
  image?: string
  url?: string
  colSpan?: number
  rowSpan?: number
  inProgress?: boolean
  imageBrightness?: number
  objectPosition?: string
}

interface BentoGridProps {
  projects: Project[]
}

const colSpanClasses: Record<number, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  6: 'md:col-span-6',
}

const rowSpanClasses: Record<number, string> = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
}

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mx-auto p-4 w-full md:w-[85%] md:max-w-6xl [grid-auto-rows:minmax(200px,auto)] md:[grid-auto-rows:minmax(120px,auto)]">
      {projects.map((project) => {
        const colSpan = project.colSpan ?? 2
        const rowSpan = project.rowSpan ?? 1
        const cardClass =
          'cursor-target relative rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-colors min-h-[220px] md:min-h-[140px] block col-span-1 row-span-1 ' +
          (colSpanClasses[colSpan] ?? colSpanClasses[2]) +
          ' ' +
          (rowSpanClasses[rowSpan] ?? rowSpanClasses[1])

        const content = (
          <>
            {project.inProgress && (
              <span
                className="absolute top-3 right-3 z-20 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.9)',
                  boxShadow: '0 0 12px rgba(220, 38, 38, 0.8), 0 0 24px rgba(220, 38, 38, 0.4)',
                }}
              >
                in Progress
              </span>
            )}
            {project.image && (
              <>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  style={{
                    filter: `brightness(${project.imageBrightness ?? 0.5})`,
                    objectPosition: project.objectPosition ?? 'center',
                  }}
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `rgba(0,0,0,${project.imageBrightness != null ? 0.2 : 0.4})` }}
                  aria-hidden
                />
              </>
            )}
            {!project.image && (
              <div className="absolute inset-0 bg-black/70" aria-hidden />
            )}
            <div className="relative z-10 p-4 flex flex-col h-full">
              <div className="text-xs text-gray-400 font-normal mb-auto">{project.primaryTitle}</div>
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {project.secondaryTitle}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3">{project.description}</p>
              </div>
            </div>
          </>
        )

        if (project.url) {
          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {content}
            </a>
          )
        }

        return (
          <div key={project.id} className={cardClass}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
