import * as express from 'express';
import * as UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();


router.post('/', UserController.createUser);

router.get('/exists/:email', authMiddleware, UserController.isUserExist);

router.post('/login', UserController.loginUser);

router.post('/refresh', UserController.RefreshTokens);

router.get('/info', authMiddleware, UserController.getUser);

export default router;