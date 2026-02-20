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
}

interface BentoGridProps {
  projects: Project[]
}

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <div
      className="grid gap-3 mx-auto p-4"
      style={{
        width: '61.8%',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(120px, auto)',
      }}
    >
      {projects.map((project) => {
        const colSpan = project.colSpan ?? 1
        const rowSpan = project.rowSpan ?? 1
        const cardClass =
          'cursor-target relative rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-colors min-h-[140px] block'
        const style = {
          gridColumn: `span ${colSpan}` as const,
          gridRow: `span ${rowSpan}` as const,
        }

        const content = (
          <>
            {project.image && (
              <>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover brightness-[0.5]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40" aria-hidden />
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
                <p className="text-xs text-gray-400 line-clamp-2">{project.description}</p>
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
              style={style}
            >
              {content}
            </a>
          )
        }

        return (
          <div key={project.id} className={cardClass} style={style}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
