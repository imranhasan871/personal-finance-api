import { Request, Response } from 'express';
import Account from '../models/Account';
import User from '../models/User';

export const getAccount = async (req: Request, res: Response) => {
    try {
        const data = await Account.find()
            .populate('user', 'fullname email -_id')
            .populate('transactions', '-_id name amount types');

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

/** This Controller Create Account Collection with accountName, Ammount, User */
export const createAccountController = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    try {
        const account = new Account({
            name,
            amount,
            user: req.userId,
        });

        const newAccount = await account.save();
        await User.updateOne(
            { _id: req.userId },
            {
                $push: {
                    accounts: newAccount._id,
                },
            }
        );
        res.json({
            message: 'Account Created Successfuly',
            account,
        });
    } catch (error) {
        console.log(error);
    }
};
export const updateAccountcontroller = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    try {
        await Account.updateOne(
            { _id: req.accountId },
            {
                $set: {
                    name,
                    amount,
                },
            }
        );
        res.json({
            message: 'Account Update Successfuly',
        });
    } catch (error) {
        console.log(error);
    }
};

/*This Controller Delete Account From Database.*/
export const deleteAccountController = async (req: Request, res: Response) => {
    try {
        await Account.findByIdAndDelete(req.accountId);
        res.status(200).json({
            message: 'Transaction Deleted Successfuly!',
        });
    } catch (error) {
        console.log(error);
    }
};
