'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

interface ScrollContextValue {
  scrollY: number
  registerScrollContainer: (element: HTMLElement | null) => void
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  const registerScrollContainer = useCallback((element: HTMLElement | null) => {
    setScrollContainer(element)
  }, [])

  useEffect(() => {
    if (!scrollContainer) return

    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop)
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [scrollContainer])

  return (
    <ScrollContext.Provider value={{ scrollY, registerScrollContainer }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  return context
}
