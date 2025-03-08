'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TextInput from '../components/shared/textinput';
import Password from '../components/shared/password';
import Logo from '../../public/icons/buddy.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const buttonRef = useRef(null);

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleLogin = async () => {
    setError('');
    if (!email) return setError('Email is required.');
    if (!isValidEmail(email)) return setError('Invalid email address.');
    if (!password) return setError('Password is required.');

    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      setError('Something went wrong. Please try again');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      const button = buttonRef.current;
      if (!button) return;
      button.style.transform = 'translate(0, 0)';
    };

    const button = buttonRef.current;
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Wave Backgrounds */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        initial={{ x: 0 }}
        animate={{ x: [-200, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 30,
            ease: 'linear',
          },
        }}
        fill="rgba(255,255,255,0.1)"
      >
        <path
          fillOpacity="1"
          d="M0,256L60,234.7C120,213,240,171,360,160C480,149,600,171,720,165.3C840,160,960,128,1080,122.7C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </motion.svg>

      <motion.svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        initial={{ x: 0 }}
        animate={{ x: [0, -200] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 20,
            ease: 'linear',
          },
        }}
        fill="rgba(255,255,255,0.07)"
      >
        <path
          fillOpacity="1"
          d="M0,224L60,213.3C120,203,240,181,360,154.7C480,128,600,96,720,101.3C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </motion.svg>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96">
        <Logo width={160} height={80} priority />
        <div className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
          Log in to Helper Buddy
        </div>

        <div className="w-full mb-4">
          <TextInput
            label="Email Address"
            placeholder="name@domain.com"
            value={email}
            setValue={setEmail}
          />
          <div className="text-sm text-blue-600 hover:underline flex justify-start mt-1">
            <Link href="/mobile">log in with phone number</Link>
          </div>
        </div>

        <Password
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          className="mb-4"
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          ref={buttonRef}
          onClick={handleLogin}
          disabled={loading}
          className={`magnetic-button bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          <span>{loading ? 'Logging in...' : 'Log In'}</span>
        </button>

        <Link href="/forgot" className="mt-4 text-sm text-blue-600 hover:underline">
          Forgot your password?
        </Link>

        <div className="mt-6 text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up for Helper Buddy
          </Link>
        </div>
      </div>

      <style jsx>{`
        .magnetic-button {
          position: relative;
          display: inline-block;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .magnetic-button span {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .magnetic-button:hover span {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import Head from 'next/head';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

// const WaveBackground = () => {
//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: {
//           color: '#000000',
//         },
//         particles: {
//           number: {
//             value: 50,
//           },
//           color: {
//             value: '#ffffff',
//           },
//           shape: {
//             type: 'circle',
//           },
//           opacity: {
//             value: 0.5,
//             random: true,
//           },
//           size: {
//             value: 3,
//             random: true,
//           },
//           move: {
//             enable: true,
//             speed: 1,
//             direction: 'none',
//             outMode: 'bounce',
//             straight: false,
//             warp: true,
//           },
//           lineLinked: {
//             enable: true,
//             distance: 150,
//             color: '#ffffff',
//             opacity: 0.4,
//             width: 1,
//           },
//         },
//       }}
//     />
//   );
// };

// export default function Home() {
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <>
//       <Head>
//         <title>3D Rotation Login / Signup Box</title>
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
//         />
//         <link
//           rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/material-icons@1.13.12/iconfont/material-icons.min.css"
//         />
//         <style>
//           {`
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }

//             body {
//               font-family: Arial, sans-serif;
//             }

//             nav {
//               background: #333;
//               padding: 10px 0;
//             }

//             .container {
//               width: 80%;
//               margin: 0 auto;
//             }

//             .row {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//             }

//             .logo {
//               font-size: 30px;
//               font-weight: bold;
//               color: #fff;
//             }

//             .logo span {
//               color: #f39c12;
//             }

//             .menu-btn {
//               display: none;
//             }

//             input[type="checkbox"]:checked ~ .menu-btn {
//               display: block;
//               font-size: 30px;
//               color: #fff;
//               cursor: pointer;
//             }

//             ul {
//               list-style: none;
//               display: flex;
//             }

//             ul li {
//               margin-left: 20px;
//             }

//             ul li a {
//               color: #fff;
//               text-decoration: none;
//             }

//             .active {
//               color: #f39c12;
//             }

//             section {
//               height: 100vh;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               background: #f4f4f4;
//             }

//             .left {
//               width: 50%;
//               padding: 20px;
//             }

//             .line {
//               width: 60px;
//               height: 2px;
//               background-color: #f39c12;
//               margin-bottom: 20px;
//             }

//             .left h2 {
//               font-size: 32px;
//               font-weight: bold;
//             }

//             .left p {
//               font-size: 18px;
//             }

//             .btn {
//               background-color: #f39c12;
//               padding: 10px 20px;
//               color: #fff;
//               text-decoration: none;
//               border-radius: 5px;
//               display: inline-block;
//               margin-top: 20px;
//             }

//             .social-media {
//               margin-top: 20px;
//             }

//             .social-media a {
//               margin-right: 10px;
//               color: #333;
//             }

//             .right {
//               width: 50%;
//               padding: 20px;
//             }

//             .form {
//               width: 100%;
//               max-width: 400px;
//               margin: 0 auto;
//             }

//             .card-3d-wrap {
//               position: relative;
//               perspective: 1000px;
//             }

//             .card-3d-wrapper {
//               transform-style: preserve-3d;
//               transition: transform 0.5s;
//             }

//             .card-front,
//             .card-back {
//               position: absolute;
//               width: 100%;
//               padding: 20px;
//               background: #fff;
//               border-radius: 5px;
//               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//               box-sizing: border-box;
//               backface-visibility: hidden;
//             }

//             .card-back {
//               transform: rotateY(180deg);
//             }

//             .form-group {
//               margin-bottom: 20px;
//             }

//             .form-style {
//               width: 100%;
//               padding: 10px;
//               border: 1px solid #ccc;
//               border-radius: 5px;
//             }

//             .input-icon {
//               position: absolute;
//               top: 10px;
//               left: 10px;
//               font-size: 20px;
//               color: #ccc;
//             }

//             .heading {
//               font-size: 28px;
//               text-align: center;
//             }

//             .text-center {
//               text-align: center;
//             }

//             .checkbox {
//               display: none;
//             }

//             .checkbox:checked ~ .card-3d-wrapper {
//               transform: rotateY(180deg);
//             }

//             .link {
//               text-decoration: none;
//               color: #f39c12;
//             }
//           `}
//         </style>
//       </Head>

//       <WaveBackground />

//       <nav>
//         <div className="container">
//           <div className="row">
//             <div className="logo">
//               Free<span>lancer</span>
//             </div>
//             <input type="checkbox" id="click" />
//             <label htmlFor="click" className="menu-btn">
//               <i className="material-icons">menu</i>
//             </label>
//             <ul>
//               <li><a href="#" className="active">Home</a></li>
//               <li><a href="#">About</a></li>
//               <li><a href="#">Services</a></li>
//               <li><a href="#">Gallery</a></li>
//               <li><a href="#">Feedback</a></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <section>
//         <div className="container">
//           <div className="row">
//             <div className="left">
//               <span className="line"></span>
//               <h2>Hello, I'm John More, <br/> a <span>digital designer</span></h2>
//               <p>Web Design Tutorial using HTML & CSS</p>
//               <a href="#" className="btn">Contact</a>
//               <div className="social-media">
//                 <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
//                 <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
//                 <a href="#"><i className="fa-brands fa-instagram"></i></a>
//                 <a href="#"><i className="fa-brands fa-youtube"></i></a>
//                 <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
//               </div>
//             </div>
//             <div className="right">
//               <div className="form">
//                 <div className="text-center">
//                   <h6>
//                     <span>Log In</span> <span>Sign Up</span>
//                   </h6>
//                   <input
//                     type="checkbox"
//                     className="checkbox"
//                     id="reg-log"
//                     checked={isSignUp}
//                     onChange={() => setIsSignUp(!isSignUp)}
//                   />
//                   <label htmlFor="reg-log"></label>
//                   <div className="card-3d-wrap">
//                     <div
//                       className="card-3d-wrapper"
//                       style={{
//                         transform: isSignUp ? 'rotateY(180deg)' : 'none',
//                       }}
//                     >
//                       <div className="card-front">
//                         <div className="center-wrap">
//                           <h4 className="heading">Log In</h4>
//                           <div className="form-group">
//                             <input
//                               type="email"
//                               className="form-style"
//                               placeholder="Your Email"
//                               autoComplete="off"
//                             />
//                             <i className="input-icon material-icons">alternate_email</i>
//                           </div>

//                           <div className="form-group">
//                             <input
//                               type="password"
//                               className="form-style"
//                               placeholder="Your Password"
//                               autoComplete="off"
//                             />
//                             <i className="input-icon material-icons">lock</i>
//                           </div>

//                           <a href="#" className="btn">Submit</a>
//                           <p className="text-center">
//                             <a href="#" className="link">Forgot your password?</a>
//                           </p>
//                         </div>
//                       </div>

//                       <div className="card-back">
//                         <div className="center-wrap">
//                           <h4 className="heading">Sign Up</h4>
//                           <div className="form-group">
//                             <input
//                               type="text"
//                               className="form-style"
//                               placeholder="Your Name"
//                               autoComplete="off"
//                             />
//                             <i className="input-icon material-icons">perm_identity</i>
//                           </div>

//                           <div className="form-group">
//                             <input
//                               type="email"
//                               className="form-style"
//                               placeholder="Your Email"
//                               autoComplete="off"
//                             />
//                             <i className="input-icon material-icons">alternate_email</i>
//                           </div>

//                           <div className="form-group">
//                             <input
//                               type="password"
//                               className="form-style"
//                               placeholder="Your Password"
//                               autoComplete="off"
//                             />
//                             <i className="input-icon material-icons">lock</i>
//                           </div>

//                           <a href="#" className="btn">Submit</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>  
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }