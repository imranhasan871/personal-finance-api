import { model, Schema } from 'mongoose';
import IAccount from '../interfaces/Account';

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Your Balance is low'],
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Account = model<IAccount>('Account', accountSchema);
export default Account;
