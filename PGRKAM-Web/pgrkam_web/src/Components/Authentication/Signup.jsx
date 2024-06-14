"use client"
import React, { useState } from 'react';
import JobSeekerSignup from './JobSeekerSignup';
import RecruiterSignup from './RecruiterSignup';
import SignupSelection from './SignupSelection';

const Signup = () => {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(false);

  const handleLoginClick = (isJobSeeker) => {
    setIsJobSeeker(isJobSeeker);
    setIsRecruiter(!isJobSeeker);
  };

  return (
    <div>
      {!isJobSeeker && !isRecruiter && (
        <SignupSelection
          setIsJobSeeker={setIsJobSeeker}
          setIsRecruiter={setIsRecruiter}
          handleLoginClick={handleLoginClick}
        />
      )}
      {isJobSeeker && <JobSeekerSignup />}
      {isRecruiter && <RecruiterSignup />}
    </div>
  );
};

export default Signup;