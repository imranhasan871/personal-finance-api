import { model, Schema } from 'mongoose';
import ITransaction from '../interfaces/Transaction';
const transactionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        accountName: {
            type: String,
            required: true,
        },
        types: {
            type: String,
            enum: ['income', 'expense'],
        },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // },
    },
    { timestamps: true }
);
const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
