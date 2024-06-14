import { Request, Response, NextFunction } from 'express';

const createAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      return next(err);
    });
  };
};

export default createAsync;
