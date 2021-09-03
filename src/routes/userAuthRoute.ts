import express from 'express';
import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    loginPostController,
    updateUsercontroller,
} from '../controllers/userAuthController';
import accountId from '../middlewares/accountId';
import checkLogin from '../middlewares/checkLogin';

const router = express.Router();

router.get('/', checkLogin, accountId, getAllUsersController);
router.post('/login', loginPostController);
router.post('/signup', createUserController);
router.patch('/', checkLogin, updateUsercontroller);
router.delete('/', deleteUserController);

export default router;
