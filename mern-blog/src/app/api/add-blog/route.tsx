import connectDB from "@/Database";
import BlogModel from "@/models/blogschema";
import { NextRequest, NextResponse } from "next/server";


type BlogPost = {
  title: string;
  description: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
   
    await connectDB();

    
    const { title, description }: BlogPost = await req.json();

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "Title and description are required.",
      });
    }

  
    const newlyCreatedBlogItem = await BlogModel.create({ title, description });

   
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
        data: newlyCreatedBlogItem, 
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}
