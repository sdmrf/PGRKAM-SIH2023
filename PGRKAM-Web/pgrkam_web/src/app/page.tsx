"use client"
import Head from "./head"
import React from 'react'
import Lines from "@/Components/LandingPage/Lines/Lines"
import Navbar from "@/Components/LandingPage/Navbar/Navbar"
import Header from "@/Components/LandingPage/Header/Header"
import Brands from "@/Components/LandingPage/Collaboraters/Brands"
import Explore from "@/Components/LandingPage/Explore/Explore"
import About from "@/Components/LandingPage/About/About"
import Features from "@/Components/LandingPage/Features/Features"
import FunFact from '@/Components/LandingPage/FunFact'
import Companies from "@/Components/LandingPage/Companies/Companies"
import CTA from "@/Components/LandingPage/CTA/index"
import Founders from "@/Components/LandingPage/Founders/Founders"
import Pro from "@/Components/LandingPage/pgrkamPro/Pgrkampro"
import Testimonials from "@/Components/LandingPage/Testimonials/index"
import Footer from "@/Components/LandingPage/Footer/Footer"
import Scroll from "@/Components/LandingPage/ScrollToTop/index"

export default function Home() {
  return (
    <main>
      <Head />
      <Lines />
      <Navbar />
      <Header />
      <Brands />
      <Explore />
      <About />
      <Features />
      <FunFact />
      <CTA />
      <Founders />
      <Pro />
      <Testimonials />
      <Footer />
      <Scroll />
    </main>
  )
}
