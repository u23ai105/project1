"use client"

import Hero from './components/Hero'
import Services from './components/Services'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Reviews from './components/Reviews'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Reviews/>
      <Footer />
    </>
  )
}