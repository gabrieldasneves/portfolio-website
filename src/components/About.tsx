import { FaCode, FaPalette, FaRocket, FaHeart } from 'react-icons/fa'
import './About.css'

const About = () => {
  const features = [
    {
      icon: <FaCode />,
      title: 'AI-Powered Development',
      description: 'Building browser extensions with OpenAI APIs, prompt engineering, and LLM integration to create intelligent, context-aware features like contextual replies and summarization.',
    },
    {
      icon: <FaPalette />,
      title: 'Design to Code',
      description: 'Designing complete UI/UX in Figma and implementing with React, Vite, and Tailwind CSS. Creating scalable design systems with Storybook for team collaboration.',
    },
    {
      icon: <FaRocket />,
      title: 'Full Stack Architecture',
      description: 'Architecting applications with React frontend and Node.js (Fastify) backend. Using Drizzle ORM, TypeScript, and modern tools for scalable, maintainable code.',
    },
    {
      icon: <FaHeart />,
      title: 'Team Leadership',
      description: 'Supervising engineers, creating tickets, conducting code reviews, and establishing workflows. Improving team productivity through documentation and technical standards.',
    },
  ]

  return (
    <section id="about" className="about">
      <div className="section-header">
        <div className="section-number">01</div>
        <h2 className="section-title">About me</h2>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a Lead Full Stack Engineer at Brastel Co. in Tokyo, Japan, where I lead the architecture 
            and development of an AI-powered browser extension assistant. I work with React (Vite, Tailwind CSS) 
            on the frontend and Node.js (Fastify, Drizzle ORM) on the backend. My focus is integrating OpenAI 
            APIs with advanced prompt engineering to deliver LLM-based features like contextual replies and 
            intelligent summarization.
          </p>
          <p>
            I design the complete UI/UX in Figma before implementation, ensuring both visual excellence and 
            technical feasibility. As a team lead, I supervise junior engineers by creating tickets, assigning 
            tasks, and conducting thorough code reviews. I'm passionate about improving team workflows through 
            clear documentation, establishing code standards, and facilitating regular technical reviews.
          </p>
          <p>
            My tech stack spans modern web development: React, Next.js, React Native for mobile, TypeScript 
            for type safety, and Node.js with Fastify for backend services. I work with Drizzle ORM for 
            database management, Jest for testing, and Docker for containerization. On the design side, I use 
            Figma for prototyping and UI/UX design, and I've built scalable design systems using Storybook. 
            I also create interactive data visualizations with D3.js and maintain clean, testable code 
            following Agile principles.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
