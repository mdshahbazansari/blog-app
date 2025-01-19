import mongoose, { Schema, model } from 'mongoose'

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
)

mongoose.models = {}

const BlogSchema = model('Blog', blogSchema)
export default BlogSchema
