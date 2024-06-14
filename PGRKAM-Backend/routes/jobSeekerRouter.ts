import express from 'express';
import {
  getJobSeeker,
  updateJobSeeker,
} from '../controllers/jobSeekerController';

const router = express.Router();

router.route('/:email').patch(updateJobSeeker).get(getJobSeeker);

module.exports = router;
