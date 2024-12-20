import connectToDatabase from '@/Database';
import BlogModel from '@/models/blogschema';
import type { NextApiRequest, NextApiResponse } from 'next';

async function CreateBlog(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, content } = req.body;

  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
   
      await connectToDatabase();
    
    const newBlog = new BlogModel({
      title,
      content,
    });

  
    await newBlog.save();

   
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: 'Error adding blog' });
  }
}

export default CreateBlog;
