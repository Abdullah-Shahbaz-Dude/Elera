import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-dark-page pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-[2403px]">
          {/* Gradient Line */}
          <div className="mb-8 md:mb-12 h-[2px] w-full bg-gradient-to-r from-primary-blue-start via-white to-primary-blue-end"></div>

          {/* Footer Content */}
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Info */}
            <div className="flex items-start">
              <Logo className="mb-4 md:mb-6 h-[60px] w-auto md:h-[80px] lg:h-[100px] max-w-[150px] md:max-w-[200px] brightness-100 invert-0" />
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="mb-3 md:mb-4 text-base md:text-lg font-semibold text-white">
                Navigation
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    to="/our-goals-values"
                    className="text-sm md:text-base text-white/80 transition-colors hover:text-white"
                  >
                    Our Goals & Values
                  </Link>
                </li>
                <li>
                  <Link
                    to="/who-we-are"
                    className="text-sm md:text-base text-white/80 transition-colors hover:text-white"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-offer"
                    className="text-sm md:text-base text-white/80 transition-colors hover:text-white"
                  >
                    Our Offer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sm md:text-base text-white/80 transition-colors hover:text-white"
                  >
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/who-we-work-with"
                    className="text-sm md:text-base text-white/80 transition-colors hover:text-white"
                  >
                    Who We Work With
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-3 md:mb-4 text-base md:text-lg font-semibold text-white">
                Contact Us
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li className="text-sm md:text-base text-white break-words">
                  Hello@elera.com
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="mb-3 md:mb-4 text-base md:text-lg font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3 md:gap-4">
                {/* Social Media Icons - Placeholder */}
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-700"></div>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-700"></div>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-700"></div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 md:mt-16 border-t border-gray-700 pt-6 md:pt-8 text-center">
            <p className="text-xs md:text-sm text-white/70">
              © {new Date().getFullYear()} Elara. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
