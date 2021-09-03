import express from 'express';
import {
    createTransController,
    deleteTransactionController,
    getAllTransaction,
    updateTransactionController,
} from '../controllers/transactionController';
import accountId from '../middlewares/accountId';
import checkLogin from '../middlewares/checkLogin';
const router = express.Router();

router.get('/', checkLogin, accountId, getAllTransaction);
router.post('/', checkLogin, accountId, createTransController);
router.patch('/:id', checkLogin, accountId, updateTransactionController);
router.delete('/:id', checkLogin, deleteTransactionController);

export default router;
