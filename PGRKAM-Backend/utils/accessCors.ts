import { Request, Response, NextFunction } from 'express';
module.exports = (req: Request, res: Response, next: NextFunction) => {
  const corsWhitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5500/aframe/examples/new-location-based/pgrkam-ar/index.html',
  ];
  if (req.headers.origin && corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  next();
};
