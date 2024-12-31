import connectDB from "@/Database";
import BlogModel from "@/models/blogschema";
import { NextResponse } from "next/server";


type RequestType = {
  url: string;
};

export async function DELETE(req: RequestType): Promise<NextResponse> {
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

   
    const deleteCurrentBlogByID = await BlogModel.findByIdAndDelete(getCurrentBlogID);

    if (deleteCurrentBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Blog not found! Please try again",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
