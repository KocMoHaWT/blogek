import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import * as PostController from "../controllers/PostController";
import postPermissionMiddleware from "../middlewares/postPermissionMiddleware";
import permissionMiddleware from "../middlewares/permissionMiddleware";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  permissionMiddleware,
  PostController.createPost
);

router.get("/:id", authMiddleware, PostController.getPost);

router.delete(
  "/:id",
  authMiddleware,
  postPermissionMiddleware,
  PostController.deletePost
);

router.get("/", authMiddleware, PostController.getPosts);

router.patch(
  '/:id',
  authMiddleware,
  postPermissionMiddleware,
  PostController.updatePost
);

router.get("/", authMiddleware, PostController.getPosts);

router.post("/:id/comment/:commentId", authMiddleware, PostController.addComment);

router.post("/:id/like", authMiddleware, PostController.toggleLike);

export default router;
