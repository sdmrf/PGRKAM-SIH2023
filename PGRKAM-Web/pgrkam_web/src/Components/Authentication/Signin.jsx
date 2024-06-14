"use client"
import React from 'react'
import { useState } from 'react';
import JobSeekerSignin from "./JobSeekerSignin"
import RecruiterSignin from "./RecruiterSignin"
import SigninSelection from "./SigninSelection"
const Signin = () => {

    const [isRecruiter, setIsRecruiter] = useState(false);
    const [isJobSeeker, setIsJobSeeker] = useState(false);

    const handleLoginClick = (isJobSeeker) => {
      setIsJobSeeker(isJobSeeker);
      setIsRecruiter(!isJobSeeker);
    };
  return (
    <div>
      {!isJobSeeker && !isRecruiter && (<SigninSelection setIsJobSeeker={setIsJobSeeker} setIsRecruiter={setIsRecruiter} handleLoginClick={handleLoginClick}/>)}  
      {isJobSeeker && <JobSeekerSignin /> }
      {isRecruiter && <RecruiterSignin /> }
    </div>
  )
}

export default Signin
