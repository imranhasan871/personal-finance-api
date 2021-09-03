import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
        const token: any = authorization?.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRET');
        const { userId, email } = decoded as any;
        req.email = email;
        req.userId = userId;
        next();
    } catch (error) {
        next('Authentication failure!');
        console.log(error);
    }
};

export default checkLogin;
