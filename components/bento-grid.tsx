'use client'

interface Project {
  id: string
  primaryTitle: string
  secondaryTitle: string
  description: string
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
        const colSpan = project.colSpan || 1
        const rowSpan = project.rowSpan || 1
        
        return (
          <div
            key={project.id}
            className="cursor-target rounded-xl border border-gray-700 bg-black/50 p-4 flex flex-col hover:border-gray-500 transition-colors"
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            <div className="text-xs text-gray-400 font-normal mb-auto">{project.primaryTitle}</div>
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.secondaryTitle}</h3>
              <p className="text-xs text-gray-400">{project.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
