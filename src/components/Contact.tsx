import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <div className="section-number">03</div>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Let's bring your ideas to life. I'm just one message away.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-intro">
          <p className="contact-intro-text">
            I'm always open to discussing new projects, creative ideas, or
            collaboration opportunities. Feel free to reach out through any of
            the channels below.
          </p>
        </div>

        <div className="contact-grid">
          <a
            href="mailto:galvesdasneves@gmail.com"
            className="contact-card"
          >
            <div className="contact-card-icon email">
              <FaEnvelope />
            </div>
            <h3 className="contact-card-title">Email</h3>
            <p className="contact-card-value">galvesdasneves@gmail.com</p>
            <span className="contact-card-action">Send me an email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/gabriel-das-neves"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon linkedin">
              <FaLinkedin />
            </div>
            <h3 className="contact-card-title">LinkedIn</h3>
            <p className="contact-card-value">gabriel-das-neves</p>
            <span className="contact-card-action">Connect with me</span>
          </a>

          <a
            href="https://github.com/gabrieldasneves"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon github">
              <FaGithub />
            </div>
            <h3 className="contact-card-title">GitHub</h3>
            <p className="contact-card-value">gabrieldasneves</p>
            <span className="contact-card-action">View my code</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
