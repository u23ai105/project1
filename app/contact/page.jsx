import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';
import Phone from '../../public/icons/call.svg';
import Address from '../../public/icons/address.svg';
import Time from '../../public/icons/time.svg';
import Email from '../../public/icons/email.svg';
import contact from '../../public/images/customer.jpg';

export default function Contact() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-black" style={{ backgroundImage: "url('/services-background.jpg')" }}>
      <Navbar />
      <div className='w-full h-full bg-black backdrop-blur-sm flex flex-col items-center justify-center'>
        <div className='w-full bg-black flex flex-col items-center justify-center p-10 mt-10'>
          <div className='w-full mt-10 mb-10 flex justify-center text-5xl font-bold text-white'>Contact Us</div>
          <div className='w-full text-xl md:w-1/2 lg:w-1/3 mt-10 flex justify-center text-center text-slate-300'>Exceptional Cleaning, Reliable Service – Just One Call Away!
          Let Us Handle the Mess, So You Can Relax!</div>
        </div>
        <div className='w-full bg-black flex flex-col md:flex-row items-center justify-center p-10 mt-10 text-white border-t-2 border-b-2 border-gray-700'>
          <div className='w-full md:w-1/5 flex flex-col items-center justify-center mb-10 md:mb-0'>
            <div className=''>
              <Phone className='text-white mb-5' />
              <div className=''>Call Today</div>
            </div>
            <div>+91 9999999999</div>
          </div>
          <div className='w-full md:w-1/5 flex flex-col items-center justify-center mb-10 md:mb-0'>
            <div>
              <Address className='text-white mb-5' />
              <div className=''>Address</div>
            </div>
            <div>+91 9999999999</div>
          </div>
          <div className='w-full md:w-1/5 flex flex-col items-center justify-center mb-10 md:mb-0'>
            <div className=''>
              <Email className='text-white mb-5' />
              <div className=''>Email Us</div>
            </div>
            <div>sample@gmail.com</div>
          </div>
          <div className='w-full md:w-1/5 flex flex-col items-center justify-center'>
            <div className=''>
              <Time className='text-white mb-5' />
              <div className=''>Working Hours</div>
            </div>
            <div>+91 9999999999</div>
          </div>
        </div>
        <div className='w-full'>
          <img src={contact.src} alt='contact' className='w-full h-auto max-h-96 object-cover' />
        </div>
        <div className='w-full bg-black flex flex-col items-center justify-center p-10 mt-10 border-b-2 border-gray-700'>
          <h2 className='text-3xl font-bold mb-5 text-white'>Send Us a Message</h2>
          <form className='w-full md:w-1/2 lg:w-1/3'>
            <div className='mb-4'>
              <label className='block text-gray-300 text-sm font-bold mb-2' htmlFor='name'>Name</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Your Name' />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Your Email' />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300 text-sm font-bold mb-2' htmlFor='message'>Message</label>
              <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='message' placeholder='Your Message' rows='4'></textarea>
            </div>
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}