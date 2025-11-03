import { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  inDevelopment?: boolean
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Archon-viz',
      description:
        'Web-based tool for visualizing and manipulating hierarchical data from tabular formats (CSV/Excel). Features a radial tree layout using D3.js, allowing users to explore, reorganize, and export data in JSON or CSV formats. Built as my bachelor\'s degree final project.',
      technologies: ['JavaScript', 'D3.js', 'HTML', 'CSS', 'jQuery'],
      githubUrl: 'https://github.com/gabrieldasneves/Archon-viz',
      image: '/arconviz.png',
    },
    {
      id: 2,
      title: 'DigFinder',
      description:
        'Paleontological discovery and analysis full application for organizing and exploring fossil data. Built to help researchers manage and visualize paleontological findings with an intuitive interface.',
      technologies: ['React Native', 'Node JS + Express','Prisma ORM','TypeScript','Zod',],
      githubUrl: 'https://github.com/gabrieldasneves/DigFinder-app',
      image: '/digfinder.png',
      inDevelopment: true,
    },
    {
      id: 3,
      title: 'Credit Card Form',
      description:
        'Interactive credit card form component with real-time visual updates. Features input masking using iMask, automatic card pattern detection (Visa/Mastercard), and dynamic HTML element updates via DOM manipulation. Clean, modern UX/UI design.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vite', 'iMask'],
      githubUrl: 'https://github.com/gabrieldasneves/credit_card_sys_interface',
      liveUrl: 'https://credit-card-sys-interface.vercel.app',
      image: '/credit_card_mastercard.png',
    },
    {
      id: 4,
      title: 'Basic Node.js Server',
      description:
        'RESTful API server built with pure Node.js focusing on fundamentals. Demonstrates core concepts like HTTP handling, routing, request/response management, and file system operations without external frameworks.',
      technologies: ['Node.js', 'JavaScript'],
      githubUrl: 'https://github.com/gabrieldasneves/BasicNodeServer',
      image: '/nodejsapi.png',
    },
  ]

  const getSlidesPerView = () => {
    return window.innerWidth >= 1200 ? 2 : 1
  }

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())
  const maxSlide = Math.max(0, projects.length - slidesPerView)

  useEffect(() => {
    const onResize = () => {
      setSlidesPerView(getSlidesPerView())
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (currentIndex > maxSlide && maxSlide >= 0) {
      setCurrentIndex(maxSlide)
    }
  }, [slidesPerView, maxSlide, currentIndex])

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  const jumpTo = (idx: number) => {
    setCurrentIndex(idx)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const dist = touchStart - touchEnd
    if (dist > 50) {
      goNext()
    } else if (dist < -50) {
      goPrev()
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <div className="section-number">02</div>
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A curated collection of my work, where code meets creativity
        </p>
      </div>

      <div className="carousel-container">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={goPrev}
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </button>

        <div
          className="carousel-wrapper"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="carousel-track"
            style={{
              transform: slidesPerView === 2
                ? `translateX(calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 2}rem))`
                : `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            }}
          >
            {projects.map((project, idx) => {
              const visible = idx >= currentIndex && idx < currentIndex + slidesPerView
              return (
              <div key={project.id} className={`project-card ${visible ? 'visible' : ''}`}>
                <div className="project-image">
                  {project.image ? (
                    <>
                      <img src={project.image} alt={project.title} className="project-img" />
                      {project.inDevelopment && (
                        <div className="development-badge">
                          <span>In Development</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="project-placeholder">
                      <span>{project.title}</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="GitHub"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={goNext}
          aria-label="Next project"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-indicators">
        {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => jumpTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
