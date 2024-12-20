import mongoose, { Document, Schema } from 'mongoose';

export interface Blog extends Document {
  title: string;
  content: string;
  createdAt: Date;
}

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.models.Blog || mongoose.model<Blog>('Blog', blogSchema);

export default BlogModel;
