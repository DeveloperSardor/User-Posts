import PostSchema from "./schema.js";
import { PostDto } from "../../interface/post.js";
import { Request, Response } from "express";
import Jwt from "../../utils/jwt.js";
const ErrorFunc: Function = (err: any): Object => {
  return {
    status: 200,
    success: true,
    message: err.message,
  };
};

export class PostsContr {
  constructor() {}
  static async GetPost(req: Request, res: Response) {
    try {
      let token: any = req.headers.token;
      let { user_id } = Jwt.Verify(token);
      let page = Number(req.query.page) || 1; 
      let limit = Number(req.query.limit) || 10;
      let skip = (page - 1) * limit;
      let search: any = req.query.search;
      let keyword: object = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { desc: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      let idParam: string | number = req.params.id;

      if (idParam) {
        let onePost = await PostSchema.findOne({ user: user_id, _id: idParam });
        if (onePost == null) {
          throw new Error(`Post is null! `);
        }
        res.send({
          status: 200,
          data: onePost,
          message: `Your ${idParam} - post`,
          success: true,
        });
      } else if (search) {
        const searchResults = await PostSchema.find({
          ...keyword,
          ...{ user: user_id },
        }).sort({ createdAt: -1 });
        if (searchResults != null) {
          res.send({
            status: 200,
            data: searchResults,
            message: "Search Results",
            success: true,
          });
        } else {
          throw new Error(`Search Results are null! `);
        }
      } else {
        let posts = await PostSchema.find({ user: user_id })
          .skip(skip)
          .limit(limit * 1)
          .sort({ createdAt: -1 });
        if (posts == null) {
          throw new Error(`Posts are null!`);
        }
        res.send({
          status: 200,
          data: posts,
          message: "Your Posts ✅",
          success: true,
        });
      }
    } catch (error: unknown) {
      res.send(ErrorFunc(error));
    }
  }

  static async AddPost(req: Request, res: Response) {
    try {
      let token: any = req.headers.token;
      let { user_id } = Jwt.Verify(token);
      let body: PostDto = req.body;
      let { title, desc } = body;
      if (!title || !desc) {
        throw new Error(`Data is uncomplated ! ❌`);
      }
      let newPost = await PostSchema.create({ title, desc, user: user_id });
      res.send({
        status: 200,
        data: newPost,
        success: true,
        message: "Post  added successfuly!",
      });
    } catch (error: unknown) {
      res.send(ErrorFunc(error));
    }
  }

  static async EditPost(req: Request, res: Response) {
    try {
      let token: any = req.headers.token;
      let { user_id } = Jwt.Verify(token);
      let idParam: string | number = req.params.id;
      let { title, desc } = req.body;
      if (!title && !desc) {
        throw new Error(`Not Found target ! `);
      }
      let findPostByid = await PostSchema.findById(idParam);
      if (findPostByid.user != user_id) {
        throw new Error(`You can't edit other people's post ❌`);
      }
      let updatedPost = await PostSchema.findByIdAndUpdate(
        idParam,
        { title, desc },
        { new: true }
      );
      res.send({
        status: 200,
        data: updatedPost,
        message: "Post edited successfuly!",
        success: true,
      });
    } catch (error: unknown) {
      res.send(ErrorFunc(error));
    }
  }

  static async DeletePost(req: Request, res: Response) {
    try {
      let token: any = req.headers.token;
      let { user_id } = Jwt.Verify(token);
      let idParam: string | number = req.params.id;
      let findPostByid = await PostSchema.findById(idParam);
      if (findPostByid.user != user_id) {
        throw new Error(`You can't delete other people's post ❌`);
      }
      let deletedPost = await PostSchema.findByIdAndDelete(idParam);
      res.send({
        status: 200,
        data: deletedPost,
        message: `Ok, deleted ${idParam} - post!`,
        success: true,
      });
    } catch (error) {
      res.send(ErrorFunc(error));
    }
  }
}
