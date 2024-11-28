import { useEffect, useState } from 'react'

export const useWindowCoordinate = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowX, setWindowX] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleSize = () => {
      setWindowX(window.innerWidth)
    }

    setWindowX(window.innerWidth)

    window.addEventListener('resize', handleSize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleSize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { scrollY, windowX }
}
