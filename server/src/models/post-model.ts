import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type Post = InferSchemaType<typeof postSchema>;

export const PostModel = model("Post", postSchema);
