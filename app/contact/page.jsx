import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-cover bg-center  bg-slate-100" style={{ backgroundImage: "url('/services-background.jpg')" }}>
        <Navbar />
      <div className='w-full h-full bg-slate-100 backdrop-blur-sm flex flex-col items-center justify-center mb-20'>
        <div className='w-full bg-white flex flex-col items-center justify-center p-10  mt-10 mb-10'>
          <div className='w-full mt-10 mb-10 flex justify-center text-5xl font-bold'>Contact Us</div>
          <div className='w-1/3 mt-10flex justify-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo accusamus nesciunt assumenda quidem, </div>
        </div>
        <div className='w-full bg-black flex flex-row items-center justify-center p-10  mt-10 mb-10 text-white'>
          <div className='w-1/5 flex flex-col items-center justify-center pl-10'>
          <div className=''>
            <img></img>
            <div className=''>Call Today</div>
          </div>
          <div>+91 9999999999</div>
          </div>
          <div className='w-1/5 flex flex-col items-center justify-center'>
          <div className=''>
            <img></img>
            <div className=''>Address</div>
          </div>
          <div>+91 9999999999</div>
          </div>
          <div className='w-1/5 flex flex-col items-center justify-center'>
          <div className=''>
            <img></img>
            <div className=''>Email Us</div>
          </div>
          <div>sample@gmail.com</div>
          </div>
          <div className='w-1/5 flex flex-col items-center justify-center'>
          <div className=''>
            <img></img>
            <div className=''>Working Hours</div>
          </div>
          <div>+91 9999999999</div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}


{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-black mb-8">Contact Us</h1>
          
          <div className="bg-white/90 shadow-2xl rounded-xl p-8 md:p-10 backdrop-blur-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-black">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-black">contact@helper-buddy.com</p>
            </div>
            <div className="text-center text-black">
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-black">+1 (555) 123-4567</p>
            </div>
            <div className="text-center text-black">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-black">123 Helper Street<br />Service City, SC 12345</p>
            </div>
          </div>
        </div>
      </div> */}