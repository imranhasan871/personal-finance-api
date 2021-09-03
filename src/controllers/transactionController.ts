import { Request, Response } from 'express';
import IAccount from '../interfaces/Account';
import Account from '../models/Account';
import Transaction from '../models/Transaction';
import User from '../models/User';

export const getAllTransaction = async (req: Request, res: Response) => {
    try {
        const data = await Transaction.find()
            .populate('account', 'name amount -_id')
            .populate('user', 'fullname email -_id');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

export const createTransController = async (req: Request, res: Response) => {
    const { name, amount, types, accountName } = req.body;
    try {
        console.log(req.accountId);
        const accountMoney = (await Account.findOne({
            _id: req.accountId,
        }).select('amount')) as IAccount;

        const currentMoney =
            types === 'income'
                ? accountMoney.amount + amount
                : accountMoney.amount - amount;

        const trans = new Transaction({
            name,
            amount,
            types,
            accountName,
        });
        const transactionId = await trans.save();
        await User.updateOne(
            { _id: req.userId },
            {
                $push: {
                    transactions: transactionId._id,
                },
            }
        );
        await Account.updateOne(
            { _id: req.accountId },
            {
                $push: {
                    transactions: transactionId._id,
                },
            }
        );

        const newMoney = await Account.updateOne(
            { _id: req.accountId },
            {
                $set: {
                    amount: currentMoney,
                },
            }
        );

        res.json({
            message: transactionId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateTransactionController = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, amount, types } = req.body;
        await Transaction.findByIdAndUpdate(
            { _id: req.params.id },

            {
                $set: { name, amount, types },
            }
        );
        const accountMoney = (await Account.findOne({
            _id: req.accountId,
        }).select('amount')) as IAccount;

        const currentMoney =
            types === 'income'
                ? accountMoney.amount + amount
                : accountMoney.amount - amount;

        const newMoney = await Account.updateOne(
            { _id: req.accountId },
            {
                $set: {
                    amount: currentMoney,
                },
            }
        );
        res.status(200).json({
            message: 'Update Successful.',
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteTransactionController = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;
    try {
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Transaction Deleted Successfuly!',
        });
    } catch (error) {
        console.log(error);
    }
};
