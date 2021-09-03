import { Document } from 'mongoose';
export default interface ITransaction extends Document {
    name: string;
    amount: number;
    account: string;
    types: string;
}
