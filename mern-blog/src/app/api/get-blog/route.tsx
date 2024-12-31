import connectDB from "@/Database";
import BlogModel from "@/models/blogschema";
import { NextResponse } from "next/server";


type BlogType = {
  _id: string;
  title: string;
  description: string;
};

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB()
    const extractAllBlogsFromDatabase: BlogType[] = await BlogModel.find({});

    if (extractAllBlogsFromDatabase.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsFromDatabase,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No blogs found! Please try again later",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
