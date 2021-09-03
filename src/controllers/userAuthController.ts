import { Request, Response } from 'express';
import User from '../models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** This function return users full information.*/
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const data = await User.find({ _id: req.userId })
            .select('fullname email -_id')
            .populate('accounts', 'name amount -_id')
            .populate('transactions', '-_id name amount types');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

/** This Controller Create User from User Model and Save on Database.*/
export const createUserController = async (req: Request, res: Response) => {
    const { fullname, email } = req.body;
    try {
        const user = await User.findOne(email);
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 11);
            const user = new User({
                fullname,
                email,
                password: hashedPassword,
            });
            await user.save();
            return res.json({
                message: 'Signup was successful!',
            });
        }
        res.json({
            message: 'User Already Exist',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Sighup Failed',
        });
    }
};

/** This Controller Can Login login with authanticate user.*/
export const loginPostController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    'SECRET',
                    { expiresIn: '8h' }
                );
                return res.json({
                    message: 'Login Successful',
                    access_token: token,
                });
            } else {
                return res.json({
                    message: 'Authentication failed!',
                });
            }
        }
        return res.json({
            message: 'Please Create Your Account!',
        });
    } catch (error) {
        console.log(error);
    }
};
export const updateUsercontroller = async (req: Request, res: Response) => {
    console.log('hello from update');
    const { fullname, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.userId },
            {
                $set: {
                    fullname,
                },
            }
        );
        res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

/*This function delete user from database.*/
export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.userId });
        res.json({
            message: 'User Deleted Successfuly.',
            user,
        });
    } catch (error) {
        console.log(error);
    }
};
