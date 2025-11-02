import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component automatically scrolls to the top of the page
 * whenever the route changes. This ensures users always start at the top
 * when navigating between pages.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Instant scroll to top on route change for immediate feedback
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

