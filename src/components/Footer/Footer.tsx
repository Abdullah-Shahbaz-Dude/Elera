import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-dark-page pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-[2403px]">
          {/* Gradient Line */}
          <div className="mb-12 h-[2px] w-full bg-gradient-to-r from-primary-blue-start via-white to-primary-blue-end"></div>

          {/* Footer Content */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Info */}
            <div>
              <Logo className="mb-6 h-auto w-auto max-w-[512px]" />
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-base text-white transition-colors hover:text-primary-blue-accent"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/why-elerea-exist"
                    className="text-base text-white transition-colors hover:text-primary-blue-accent"
                  >
                    Why Elerea Exist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-services"
                    className="text-base text-white transition-colors hover:text-primary-blue-accent"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/who-we-are"
                    className="text-base text-white transition-colors hover:text-primary-blue-accent"
                  >
                    Who we are
                  </Link>
                </li>
                <li>
                  <Link
                    to="/who-we-work-with"
                    className="text-base text-white transition-colors hover:text-primary-blue-accent"
                  >
                    Who we Work With
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="text-base text-white">+44 55 66 77 88</li>
                <li className="text-base text-white">elayara@gmail.com</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {/* Social Media Icons - Placeholder */}
                <div className="h-12 w-12 rounded-lg bg-gray-700"></div>
                <div className="h-12 w-12 rounded-lg bg-gray-700"></div>
                <div className="h-12 w-12 rounded-lg bg-gray-700"></div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Elara. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

