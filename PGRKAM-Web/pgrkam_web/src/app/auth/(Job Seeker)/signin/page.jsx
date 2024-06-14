import React from 'react'
import Navbar from '@/Components/LandingPage/Navbar/Navbar'
import Signin from '@/Components/Authentication/Signin'
import Footer from '@/Components/LandingPage/Footer/Footer'
const SignIn = () => {
  return (
    <div>
      <Navbar />
      <Signin/>
      <Footer />
    </div>
  )
}

export default SignIn

