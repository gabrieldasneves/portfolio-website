'use client'

import LogoLoop from './LogoLoop'

const technologies = [
  { src: 'https://cdn.simpleicons.org/typescript/3178C6', alt: 'TypeScript', title: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/nodedotjs/339933', alt: 'Node.js', title: 'Node.js' },
  { src: 'https://cdn.simpleicons.org/react/61DAFB', alt: 'React', title: 'React' },
  { src: 'https://cdn.simpleicons.org/nestjs/E0234E', alt: 'NestJS', title: 'NestJS' },
  { src: 'https://cdn.simpleicons.org/nextdotjs/ffffff', alt: 'Next.js', title: 'Next.js' },
  { src: 'https://cdn.simpleicons.org/d3/F9A03C', alt: 'D3.js', title: 'D3.js' },
  { src: 'https://cdn.simpleicons.org/docker/2496ED', alt: 'Docker', title: 'Docker' },
  { src: 'https://api.iconify.design/simple-icons/amazonaws.svg?height=40&color=%23FF9900', alt: 'AWS', title: 'AWS' },
  { src: 'https://cdn.simpleicons.org/python/3776AB', alt: 'Python', title: 'Python' },
  { src: 'https://cdn.simpleicons.org/jest/C21325', alt: 'Jest', title: 'Jest' },
  { src: 'https://cdn.simpleicons.org/prisma/2D3748', alt: 'Prisma', title: 'Prisma' },
  { src: 'https://cdn.simpleicons.org/postgresql/4169E1', alt: 'PostgreSQL', title: 'PostgreSQL' },
]

export function TechLogoLoop() {
  return (
    <div className="h-16 w-full">
      <LogoLoop
        className="logoloop--grayscale"
        logos={technologies}
        speed={60}
        direction="left"
        logoHeight={40}
        gap={48}
        hoverSpeed={0}
        fadeOut
        fadeOutColor="#000000"
        scaleOnHover
        ariaLabel="Technologies"
      />
    </div>
  )
}
