import React from 'react'
import Link from 'next/link'
import Navbar from "../../Components/JobSeekerHomepage/Navbar/Navbar"
import Ar from "../../Components/JobSeekerHomepage/CTA/index"
import Filter from "../../Components/JobSeekerHomepage/Filters/Brands"
import Recom from '../../Components/JobSeekerHomepage/Recommendetions/Explore'
import Footer from "../../Components/JobSeekerHomepage/Footer/Footer"
const page = () => {
  return (
    <div>
        <Navbar />
        <Ar />
        <Filter />
        <Recom />
        <Footer />
    </div>
  )
}

export default page
