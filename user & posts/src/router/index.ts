import { Router } from "express";
import userRouter from "../modules/users/routes.js";
import postRouter from "../modules/posts/routes.js";
const router: Router = Router();

router.use(userRouter)
router.use('/posts',postRouter)
export default router;
