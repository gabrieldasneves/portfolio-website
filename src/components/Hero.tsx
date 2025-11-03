import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const roles = ['Lead Full Stack Engineer', 'AI Integration Specialist', 'UI/UX Designer']
    let roleIdx = 0
    let charIdx = 0
    let deleting = false
    let timer: number

    const type = () => {
      const role = roles[roleIdx]

      if (deleting) {
        setDisplayText(role.substring(0, charIdx - 1))
        charIdx--
      } else {
        setDisplayText(role.substring(0, charIdx + 1))
        charIdx++
      }

      if (!deleting && charIdx === role.length) {
        timer = window.setTimeout(() => {
          deleting = true
        }, 2000)
      } else if (deleting && charIdx === 0) {
        deleting = false
        roleIdx = (roleIdx + 1) % roles.length
      }

      const delay = deleting ? 50 : 100
      timer = window.setTimeout(type, delay)
    }

    timer = window.setTimeout(type, 100)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const scrollToContact = () => {
    const contact = document.querySelector('#contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="gradient-text">Gabriel das Neves</span>
          </h1>
          <h2 className="hero-subtitle">
            <span className="typing-text">{displayText}</span>
            <span className="cursor-blink">|</span>
          </h2>
          <p className="hero-description">
            Lead Full Stack Engineer based in Tokyo, Japan. I architect scalable applications, 
            integrate AI technologies, and design beautiful user experiences. Passionate about 
            Clean Code, mentoring engineers, and building products that make an impact.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToContact}>
              <span>Get In Touch</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <a
              href="#projects"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault()
                const projects = document.querySelector('#projects')
                projects?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </a>
          </div>
          <div className="hero-social">
            <a
              href="https://github.com/gabrieldasneves"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-das-neves"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:galvesdasneves@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-avatar">
            <div className="avatar-container">
              <img src="/profile-photo.jpg" alt="Gabriel das Neves" className="profile-photo" />
              <div className="avatar-decoration"></div>
            </div>
            <div className="code-snippet">
              <div className="code-line">
                <span className="code-keyword">const</span>
                <span className="code-variable"> engineer</span>
                <span className="code-operator"> = </span>
                <span className="code-string">{`{`}</span>
              </div>
              <div className="code-line indent">
                <span className="code-property">location</span>
                <span className="code-operator">:</span>
                <span className="code-string"> 'Tokyo, Japan'</span>
              </div>
              <div className="code-line indent">
                <span className="code-property">specialties</span>
                <span className="code-operator">:</span>
                <span className="code-string"> ['AI', 'React', 'Node.js']</span>
              </div>
              <div className="code-line">
                <span className="code-string">{`}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
