import express from 'express';
import morgan from 'morgan';
import accountRoute from '../src/routes/accountRoute';
import transRoute from '../src/routes/transactionRoute';
import usersRoute from '../src/routes/userAuthRoute';

const app = express();
app.use(morgan('dev'));

declare module 'express' {
    export interface Request {
        email?: string;
        userId?: string;
        accountId?: string;
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers Configaration

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/accounts', accountRoute);
app.use('/api/v1/trans', transRoute);

export default app;
