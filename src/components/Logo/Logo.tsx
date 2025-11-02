import React from 'react'
import { Link } from 'react-router-dom'
import { logoImage } from '@/assets/images'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      {logoImage ? (
        <img
          src={logoImage}
          alt="Elerea Logo"
          className="inline-block h-[50px] w-auto object-contain md:h-[100px] lg:h-[174px]"
        />
      ) : (
        <span className="inline-block h-[50px] text-xl font-bold leading-[50px] text-white md:h-[100px] md:leading-[100px] lg:h-[174px] lg:leading-[174px]">
          ELEREA
        </span>
      )}
    </Link>
  )
}

export default Logo

