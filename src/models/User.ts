import { model, Schema } from 'mongoose';
import IUser from '../interfaces/User';

const userSchema: Schema = new Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accounts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
});

export default model<IUser>('User', userSchema);
