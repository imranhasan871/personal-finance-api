import express from 'express';
import {
    createAccountController,
    deleteAccountController,
    getAccount,
    updateAccountcontroller,
} from '../controllers/accountController';
import accountId from '../middlewares/accountId';
import checkLogin from '../middlewares/checkLogin';
const router = express.Router();

router.get('/', checkLogin, getAccount);
router.post('/', checkLogin, createAccountController);
router.patch('/', checkLogin, accountId, updateAccountcontroller);
router.delete('/', checkLogin, deleteAccountController);

export default router;
