import { NextFunction, Request, Response } from 'express';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';
import JobSeeker from '../models/jobSeekerModal';
export const updateJobSeeker = createAsync(
  async (req: Request, res: Response) => {
    console.log('BOODDYYY : ========>  ', req.body);
    const updateJobSeeker = await JobSeeker.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { upsert: true, new: true }
    );
    console.log('Dateed', updateJobSeeker);
    res.status(200).json({
      status: 'success',
      data: {
        jobSeeker: updateJobSeeker,
      },
    });
  }
);

export const getJobSeeker = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Emaill : ', req.params.email);
    const user = await JobSeeker.findOne({ email: req.params.email });
    if (!user) return next(new AppError("User with email doesn't exists", 404));
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);
