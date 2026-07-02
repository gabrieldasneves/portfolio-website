"use client";

import { useRef, useEffect } from "react";
import { BentoGrid } from "@/components/bento-grid";
import { useScroll } from "@/contexts/scroll-context";
import ThreeDCarousel, { CarouselItem } from "@/components/ui/3d-carousel";

const projects = [
  {
    id: "1",
    primaryTitle: "Next.js, Agentic AI, Claude API, Opencode",
    secondaryTitle: "IsMyCodeTrash",
    description:
      "AI-powered code roaster. Paste your code and get brutally honest feedback from Claude — shame scores, verdicts, suggested fixes, and a public leaderboard. Built with Next.js 16, tRPC, Drizzle, Vercel AI SDK, and Shiki.",
    image: "/projects/ismycodetrash.png",
    url: "https://github.com/gabrieldasneves/IsMyCodeTrash",
    imageBrightness: 0.65,
    objectPosition: "center top",
  },
  {
    id: "2",
    primaryTitle: "React Native, NodeJS",
    secondaryTitle: "DigFinder-app",
    inProgress: true,
    description:
      "A mobile app designed for amateur paleontologists and fossil enthusiasts. It allows users to log, map, and share fossil findings around the world.",
    image: "/projects/digfinder-app.png",
    url: "https://github.com/gabrieldasneves/DigFinder-app",
  },
  {
    id: "3",
    primaryTitle: "Chrome MV3, React, TypeScript, Vite, Tailwind",
    secondaryTitle: "Luma",
    description:
      "Chrome extension that captures highlights as you browse and exports them to Word or PDF with source links included. Activate observation mode, collect text across tabs, preview, and download.",
    image: "/projects/luma.png",
    url: "https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege?utm_source=item-share-cb",
    colSpan: 2,
    imageBrightness: 1,
    imageSize: 128,
    imageSizeMd: 90,
  },
  {
    id: "4",
    primaryTitle: "D3.js, HTML & CSS",
    secondaryTitle: "Archon-viz",
    description:
      "Turn tabular data into clear, visual hierarchies. Drag, edit, and explore your structure through an intuitive UI. Export your modified data in seconds.",
    image: "/projects/archon-viz.png",
    url: "https://github.com/gabrieldasneves/Archon-viz",
    colSpan: 3,
  },
  {
    id: "5",
    primaryTitle: "NodeJS, Prisma, Fastify",
    secondaryTitle: "Node API with TDD and SOLID",
    inProgress: true,
    description:
      "Node.js backend project focused on Clean Architecture, SOLID, Design Patterns, TDD, and automated testing from unit to E2E.",
    colSpan: 3,
    url: "https://github.com/gabrieldasneves/Node-api-tdd-solid",
  },
  {
    id: "6",
    primaryTitle: "Python, Jupyter Notebook",
    secondaryTitle: "Machine Learning Studies",
    description:
      "Here you'll find my collection of AI/ML/DS projects, including algorithm benchmarks, CNN practice with CIFAR-10, NBA injury prediction, and a fun manga EDA. Feel free to dive in!",
    image: "/projects/machine-learn-studies.png",
    url: "https://github.com/gabrieldasneves/MachineLearnStudies",
    colSpan: 6,
  },
];

const carouselItems: CarouselItem[] = [
  {
    title: "IsMyCodeTrash",
    subtitle: "Next.js · Agentic AI · Claude API",
    description:
      "AI-powered code roaster. Paste your code and get brutally honest feedback from Claude — shame scores, verdicts, and suggested fixes.",
    image: "/projects/ismycodetrash.png",
    url: "https://github.com/gabrieldasneves/IsMyCodeTrash",
    tags: "Next.js · tRPC · Drizzle · Vercel AI SDK",
  },
  {
    title: "DigFinder",
    subtitle: "React Native · NodeJS",
    description:
      "Mobile app for amateur paleontologists to log, map, and share fossil findings around the world.",
    image: "/projects/digfinder-app.png",
    url: "https://github.com/gabrieldasneves/DigFinder-app",
    tags: "React Native · NodeJS",
  },
  {
    title: "Luma",
    subtitle: "Chrome Extension · MV3",
    description:
      "Chrome extension that captures highlights as you browse and exports them to Word or PDF with source links included.",
    image: "/projects/luma.png",
    url: "https://chromewebstore.google.com/detail/okifnkjgkefnhikolbijhhnmlkoiiege",
    tags: "React · TypeScript · Vite · Tailwind",
  },
  {
    title: "Archon-viz",
    subtitle: "D3.js · Data Viz",
    description:
      "Turn tabular data into clear visual hierarchies. Drag, edit, and explore your structure through an intuitive UI.",
    image: "/projects/archon-viz.png",
    url: "https://github.com/gabrieldasneves/Archon-viz",
    tags: "D3.js · HTML · CSS",
  },
  {
    title: "Node API TDD + SOLID",
    subtitle: "NodeJS · Clean Architecture",
    description:
      "Node.js backend focused on Clean Architecture, SOLID, Design Patterns, TDD, and automated testing from unit to E2E.",
    url: "https://github.com/gabrieldasneves/Node-api-tdd-solid",
    tags: "NodeJS · Prisma · Fastify",
  },
  {
    title: "ML Studies",
    subtitle: "Python · Data Science",
    description:
      "Collection of AI/ML/DS projects: algorithm benchmarks, CNN on CIFAR-10, NBA injury prediction, and manga EDA.",
    image: "/projects/machine-learn-studies.png",
    url: "https://github.com/gabrieldasneves/MachineLearnStudies",
    tags: "Python · Jupyter · scikit-learn",
  },
];

export default function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContext = useScroll();

  useEffect(() => {
    scrollContext?.registerScrollContainer(scrollRef.current);
    return () => scrollContext?.registerScrollContainer(null);
  }, [scrollContext]);

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden bg-black">
      <div
        ref={scrollRef}
        className="relative z-20 flex-1 min-h-0 w-full overflow-auto pt-24"
      >
        {/* Mobile: bento list */}
        <div className="block md:hidden h-full">
          <BentoGrid projects={projects} />
        </div>

        {/* Desktop: 3D carousel */}
        <div className="hidden md:flex items-center justify-center h-full">
          <ThreeDCarousel
            items={carouselItems}
            radius={320}
            cardW={360}
            cardH={280}
          />
        </div>
      </div>
    </section>
  );
}
