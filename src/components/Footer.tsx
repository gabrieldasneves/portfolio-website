import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>&copy; {currentYear} Gabriel das Neves. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a
            href="https://github.com/gabrieldasneves"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-das-neves"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:galvesdasneves@gmail.com"
            className="footer-link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

