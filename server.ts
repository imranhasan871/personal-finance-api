import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB = `${process.env.DATABASE_LOCAL}`;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database Connected!');
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    });
