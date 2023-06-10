import { Router } from "express";
import { checkToken } from "../../middleware/check.token.js";
import { PostsContr } from "./controller.js";

const postRouter: Router = Router();


postRouter.get('/', checkToken, PostsContr.GetPost)
postRouter.get('/:id', checkToken, PostsContr.GetPost)
postRouter.post('/', checkToken, PostsContr.AddPost)
postRouter.put('/:id', checkToken, PostsContr.EditPost)
postRouter.delete('/:id', checkToken, PostsContr.DeletePost)
  
export default postRouter;