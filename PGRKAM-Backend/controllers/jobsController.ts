import { NextFunction, Request, Response } from 'express';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';
import Jobs from '../models/jobsModal';
export const updateJobs = createAsync(async (req: Request, res: Response) => {
  const updateJobs = await Jobs.findOneAndUpdate(
    { recruiterEmail: req.params.email },
    req.body,
    { upsert: true, new: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      jobs: updateJobs,
    },
  });
});

export const getJob = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await Jobs.findOne({ email: req.params.email });
    if (!user) return next(new AppError("User with email doesn't exists", 404));
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);

export const getAllJobs = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await Jobs.find();
    if (!users) return next(new AppError('No users found', 404));
    res.status(200).json({
      status: 'success',
      data: users,
    });
  }
);
