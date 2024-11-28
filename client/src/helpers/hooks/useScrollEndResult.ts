import { useEffect, useState } from 'react'

type UseScrollEndProps = {
  offset?: number
}

type UseScrollEndResult = {
  isEnd: boolean
}

export const useScrollEnd = ({
  offset = 0,
}: UseScrollEndProps = {}): UseScrollEndResult => {
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const { scrollTop } = document.documentElement

      if (windowHeight + scrollTop + offset >= documentHeight) {
        setIsEnd(true)
      } else {
        setIsEnd(false)
      }
    }

    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [offset])

  return { isEnd }
}
