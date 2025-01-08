import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decoded: any) => {
   
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate' });
    }

    req.user = decoded;

    next();
  });
};
