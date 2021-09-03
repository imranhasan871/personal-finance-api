import { Document } from 'mongoose';

export default interface IAccount extends Document {
    name: string;
    amount: number;
    author: string;
}
