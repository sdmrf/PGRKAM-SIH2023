import express from 'express';

import { getAllJobs, updateJobs } from '../controllers/jobsController';

const router = express.Router();

router.route('/:email').patch(updateJobs);
router.route('/').get(getAllJobs);

module.exports = router;
