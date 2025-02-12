import { Facebook, Instagram, Twitter } from 'lucide-react';
import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';
import Logo from '../../public/icons/buddy.svg';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      {/* Hero Section with Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-20 ">
        <div className="text-center">
          <div className="inline-block transform transition-transform duration-300 hover:scale-110 mt-1">
              <Logo width={196} height={164} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Helper-Buddy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Helper-Buddy is your trusted partner in making everyday life easier. We connect skilled professionals 
            with people who need their services, ensuring quality, reliability, and convenience.
          </p>
        </div>
      </div>

      {/* Services Information Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center mb-16 transform transition-all duration-300 hover:text-blue-600">
          Our Service Information
        </h2>

        {/* Service Cards - Alternating Layout */}
        <div className="space-y-24">
          {/* Service 1 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200"
                    alt="Home Cleaning"
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Home Cleaning Excellence</h3>
                <p className="text-lg text-gray-600">
                  Our professional cleaning services bring sparkle and freshness to your home. 
                  With trained experts and eco-friendly cleaning solutions, we ensure your 
                  living space remains pristine and healthy.
                </p>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Personal Assistance</h3>
                <p className="text-lg text-gray-600">
                  From managing your schedule to handling daily tasks, our personal assistants 
                  are here to make your life easier. Experience the convenience of having a 
                  dedicated professional at your service.
                </p>
              </div>
              <div className="w-full md:w-1/2 group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&q=80&w=1200"
                    alt="Personal Assistant"
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
                    alt="Tech Support"
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Technical Support</h3>
                <p className="text-lg text-gray-600">
                  Our tech experts are ready to solve any technical issues you encounter. 
                  From computer repairs to network setup, we provide comprehensive technical 
                  support for both home and office needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Find Us Here</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1647043075590!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Follow Us</h2>
          <div className="flex justify-center space-x-8">
            <a 
              href="#" 
              className="transform transition-transform duration-300 hover:scale-125 hover:text-blue-400"
            >
              <Facebook size={32} />
            </a>
            <a 
              href="#" 
              className="transform transition-transform duration-300 hover:scale-125 hover:text-pink-400"
            >
              <Instagram size={32} />
            </a>
            <a 
              href="#" 
              className="transform transition-transform duration-300 hover:scale-125 hover:text-blue-400"
            >
              <Twitter size={32} />
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}