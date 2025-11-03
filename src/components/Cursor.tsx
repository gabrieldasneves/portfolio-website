import { useEffect, useState } from 'react'
import './Cursor.css'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const onHover = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    const elements = document.querySelectorAll('a, button, .project-card, .feature-card')
    elements.forEach(el => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        className={`cursor-dot ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  )
}

export default Cursor

