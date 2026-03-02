import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white text-black shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Name */}
          <h1 className="text-xl font-semibold tracking-wide text-blue-600">
            Abutalha 
          </h1>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/examples"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Examples
              </Link>
            </li>
            <li>
              <Link
                to="/emotions"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Emotions
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-wide text-blue-600">
              4279
            </h1>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slides down smoothly */}
        <div
          className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col px-6 py-4 space-y-4">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/examples"
                className="block py-2 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
            </li>
            <li>
              <Link
                to="/emotions"
                className="block py-2 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Emotions
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
}