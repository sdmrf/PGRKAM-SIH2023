const mongoose = require('mongoose');
const validator = require('validator');

const jobSchema = new mongoose.Schema({
  recruiterName: {
    type: String,
  },
  recruiterEmail: {
    type: String,
    lowercase: true,
  },
  jobTitle: {
    type: String,
  },
  companyLogo: { type: String },
  companyName: { type: String },
  specialization: { type: String },
  jobType: { type: String },

  minSalary: { type: String },
  maxSalary: { type: String },

  qualification: {
    type: String,
  },

  requirements: [],

  description: { type: String },

  location: { type: String },
  experience: { type: String },

  latitude: { type: String },
  longitude: { type: String },

  facilities: [],
  applications: [],
});

const Jobs = mongoose.model('Jobs', jobSchema);

export default Jobs;
