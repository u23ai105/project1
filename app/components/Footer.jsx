import Link from 'next/link'
import Instagram from '../../public/icons/instagram.svg';
import Facebook from '../../public/icons/facebook.svg';
import Twitter from '../../public/icons/twitter.svg';
import LinkedIn from '../../public/icons/linkedin.svg';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Helper-Buddy</h3>
            <p className="text-gray-400">Your trusted partner for everyday assistance</p>
            <div className='w-full bg-black flex flex-col pt-3'>
          <h2 className='text-3xl font-bold mb-5 text-white'>Follow Us</h2>
          <div className='flex space-x-4'>
            <a href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:text-blue-800'>
            <Facebook width={4} height={4} className="w-7 h-7" />
            </a>
            <a href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:text-blue-600'>
            <Twitter width={4} height={4} className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/helperbuddy.in/#" target="_blank" rel="noopener noreferrer" className='text-pink-600 hover:text-pink-800 '>
              <Instagram width={4} height={4} className="w-7 h-7" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='text-blue-700 hover:text-blue-900'>
            <LinkedIn width={4} height={4} className="w-7 h-7" />
            </a>
          </div>
        </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white">Home Cleaning</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Repairs</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Personal Assistant</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Professional Help</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>contact@helper-buddy.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Helper Street</li>
              <li>Service City, SC 12345</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Helper-Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}