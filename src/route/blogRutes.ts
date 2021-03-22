import * as express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import * as BlogController from '../controllers/BlogController';
const router = express.Router();

router.post('/', authMiddleware, BlogController.createBlog);

router.get('/:id', authMiddleware, BlogController.getBlog);

router.get('/', authMiddleware, BlogController.getBlogs);

router.get('/:page/:items', authMiddleware, BlogController.getBlogsPage);

export default router;