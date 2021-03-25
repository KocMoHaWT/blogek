import * as express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import * as BlogController from '../controllers/BlogController';
const router = express.Router();

router.post('/', authMiddleware, BlogController.createBlog);

router.get('/', authMiddleware, BlogController.getBlogs);

router.get('/:id/posts/', authMiddleware, BlogController.getBlogPosts);

router.get('/:id', authMiddleware, BlogController.getBlog);

router.get('/upload', authMiddleware, BlogController.updateBlog);


export default router;