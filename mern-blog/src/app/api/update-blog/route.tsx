import connectDB from "@/Database";
import BlogModel from "@/models/blogschema";
import { NextResponse } from "next/server";


type RequestType = {
  url: string;
  json: () => Promise<{ title: string; description: string }>;
};


function validateBlogData(data: { title: string; description: string }): string | null {
  if (!data.title || typeof data.title !== "string") {
    return "Title is required and must be a string.";
  }
  if (!data.description || typeof data.description !== "string") {
    return "Description is required and must be a string.";
  }
  return null;
}

export async function PUT(req: RequestType): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const { title, description } = await req.json();

    
    const validationError = validateBlogData({ title, description });
    if (validationError) {
      return NextResponse.json({
        success: false,
        message: validationError,
      });
    }

    const updateBlogByBlogID = await BlogModel.findOneAndUpdate(
      { _id: getCurrentBlogID },
      { title, description },
      { new: true }
    );

    if (updateBlogByBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
