import React from 'react'
import { Link } from 'react-router-dom'
import { logoImage } from '@/assets/images'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className="inline-flex items-center">
      {logoImage ? (
        <img
          src={logoImage}
          alt="Elerea Logo"
          className={`h-[100px] w-auto object-contain brightness-0 invert md:h-[100px] lg:h-[174px] ${className}`}
        />
      ) : (
        <span className={`inline-block h-[50px] text-xl font-bold leading-[50px] text-white md:h-[100px] md:leading-[100px] lg:h-[174px] lg:leading-[174px] ${className}`}>
          ELEREA
        </span>
      )}
    </Link>
  )
}

export default Logo

