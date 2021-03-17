import * as express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import * as BlogController from '../controllers/BlogController';
const router = express.Router();

router.post('/', authMiddleware, BlogController.createBlog);

router.get('/:id', authMiddleware, BlogController.getBlog);

export default router;