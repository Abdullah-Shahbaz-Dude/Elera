import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { useState, useEffect } from 'react'
import { useVideoContext } from '@/contexts/VideoContext'

const Navbar: React.FC = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeroSection, setIsHeroSection] = useState(false)
  
  // Check if we're on the home page (hero section)
  useEffect(() => {
    setIsHeroSection(location.pathname === '/')
  }, [location.pathname])

  // Detect scroll position for transparent navbar in hero section
  useEffect(() => {
    if (!isHeroSection) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Make navbar visible after scrolling past 100px
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeroSection])

  // Determine navbar styling based on position
  const isTransparent = isHeroSection && !isScrolled

  // Get current video index from context
  const { currentVideoIndex } = useVideoContext()
  // Only apply prominent styling when second video is active AND in hero section AND navbar is transparent
  // When navbar is visible (scrolled), don't apply color changes
  const isSecondVideo = currentVideoIndex === 1 && isHeroSection && isTransparent
  // Check if first video is active in hero section
  const isFirstVideo = currentVideoIndex === 0 && isHeroSection && isTransparent
  // Logo should be bright when navbar is visible OR when first video is active
  const shouldMakeLogoBright = !isTransparent || isFirstVideo

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/why-elerea-exist', label: 'Why Elerea Exist' },
    { path: '/our-services', label: 'Our Services' },
    { path: '/who-we-are', label: 'Who we are' },
    { path: '/who-we-work-with', label: 'Who we Work With' },
    { path: '/contact-us', label: 'Contact Us' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 pointer-events-none">
      {/* Navbar Container with Gradient Border */}
      <div className="relative mx-auto mt-6 max-w-[2000px] px-5 pointer-events-auto">
        {/* Gradient Border Container - Outer border with gradient */}
        <div
          className="relative h-[100px] rounded-[109px] p-[5px] transition-all duration-300"
          style={{
            background: isTransparent ? 'transparent' : 'rgba(29, 29, 29, 0.85)',
            boxShadow: isTransparent
              ? 'none'
              : '0px 4px 29px 13px rgba(255, 255, 255, 0.29)',
          }}
        >
          {/* Inner content container */}
          <div
            className={`relative flex h-full items-center rounded-[104px] px-6 transition-all duration-300 ${
              isTransparent
                ? 'bg-transparent backdrop-blur-none'
                : 'bg-[rgba(29,29,29,0.85)] backdrop-blur-md'
            }`}
          >
          <div className="flex w-full items-center justify-between">
            {/* Logo - Top Left with Light Effect when Visible or First Video */}
            <div
              className={`transition-all duration-300 ${
                shouldMakeLogoBright ? 'brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''
              }`}
            >
              <Logo className="h-[50px] w-auto md:h-[100px] lg:h-[174px]" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-3 lg:flex">
              {navigationLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out ${
                    isActive(link.path)
                      ? isSecondVideo
                        ? 'text-black'
                        : 'text-white'
                      : isSecondVideo
                      ? 'text-black/80 hover:text-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out ${
                      isActive(link.path)
                        ? 'scale-x-100 bg-gradient-blue'
                        : 'group-hover:scale-x-100 bg-gradient-blue'
                    }`}
                  />
                  {/* Active background glow */}
                  {isActive(link.path) && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-blue opacity-10 blur-sm transition-opacity duration-300" />
                  )}
                  {/* Hover background */}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-blue-start/10 to-primary-blue-end/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              ))}
              <Link
                to="/contact-us"
                className={`group relative overflow-hidden rounded-full px-8 py-2.5 text-base font-semibold transition-all duration-300 ease-out ${
                  isActive('/contact-us')
                    ? isSecondVideo
                      ? 'bg-gradient-blue text-white shadow-lg shadow-primary-blue-end/50'
                      : 'bg-gradient-blue text-white shadow-lg shadow-primary-blue-accent/50'
                    : isSecondVideo
                    ? 'border-2 border-primary-blue-end bg-transparent text-primary-blue-end hover:border-primary-blue-accent hover:bg-gradient-blue hover:text-white hover:shadow-lg hover:shadow-primary-blue-end/50'
                    : 'border-2 border-primary-blue-accent bg-transparent text-primary-blue-accent hover:bg-gradient-blue hover:text-white hover:shadow-lg hover:shadow-primary-blue-accent/50'
                }`}
              >
                <span className="relative z-10">Contact Us</span>
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={`absolute left-0 right-0 top-[182px] z-10 space-y-2 rounded-b-[109px] border-t px-6 pb-6 pt-4 transition-all duration-300 lg:hidden ${
                isTransparent
                  ? 'bg-transparent backdrop-blur-none border-transparent'
                  : 'bg-[rgba(29,29,29,0.85)] backdrop-blur-md border-gray-700'
              }`}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group relative block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 ease-out ${
                    isActive(link.path)
                      ? isSecondVideo
                        ? 'text-black bg-gradient-to-r from-primary-blue-start/20 to-primary-blue-end/20'
                        : 'text-white bg-gradient-to-r from-primary-blue-start/20 to-primary-blue-end/20'
                      : isSecondVideo
                      ? 'text-black/80 hover:text-black hover:bg-gradient-to-r hover:from-primary-blue-start/10 hover:to-primary-blue-end/10'
                      : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-primary-blue-start/10 hover:to-primary-blue-end/10'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive(link.path) && (
                    <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-blue" />
                  )}
                </Link>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

