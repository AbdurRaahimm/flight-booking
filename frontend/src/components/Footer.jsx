
import { Facebook, Twitter, Instagram, Linkedin, Github, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0B] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Left section - Navigation Links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link to="/policy" className="hover:text-gray-300 transition-colors">
              Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>

          {/* Center section - Logo and Copyright */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="size-6 text-blue-600" />
              <span className="text-xl font-semibold">Booking</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>Copyrights ©2024 Booking.</p>
              <p>Build by Abdur Rahim.</p>
            </div>
          </div>

          {/* Right section - Social Links */}
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-gray-300 transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

