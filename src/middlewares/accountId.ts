import { NextFunction, Request, Response } from 'express';
import Account from '../models/Account';
const accountId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accId = await Account.findOne({ name: req.body.accountName });
        req.accountId = accId?._id;
        next();
    } catch (error) {
        next('AccountId Not Found');
        console.log(error);
    }
};

export default accountId;
