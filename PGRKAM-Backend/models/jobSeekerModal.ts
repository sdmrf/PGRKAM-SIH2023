const mongoose = require('mongoose');
const validator = require('validator');

const jobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  gender: {
    type: String,
  },
  video: { type: String },
  about: { type: String },
  experience: [
    {
      role: String,
      company: String,
      from: String,
      to: String,
      empType: String,
      description: String,
    },
  ],
  education: [
    {
      course: String,
      institute: String,
      major: String,
      from: String,
      to: String,
      description: String,
    },
  ],
  achievements: [
    {
      achievement: String,
      organization: String,
      date: String,
      description: String,
    },
  ],
  skills: [],
  languages: [],
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

export default JobSeeker;
