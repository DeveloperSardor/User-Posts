import { Schema, model, Types, InferSchemaType } from "mongoose";

const PostSchema = new Schema(  
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    desc: {
      title: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
    },
  },
  {
    timestamps: true,
  }
);

type Posts = InferSchemaType<typeof PostSchema>;
export default model<Posts>("Posts", PostSchema);
