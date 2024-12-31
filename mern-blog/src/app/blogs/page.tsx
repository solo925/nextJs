import BlogOverview from "@/components/blog-oveview";
import { FC } from "react";


type Blog = {
  _id: string;
  title: string;
  description: string;
};

async function fetchListOfBlogs(): Promise<Blog[]> {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const result = await apiResponse.json();

    return result?.data ?? [];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching blogs");
  }
}


const Blogs: FC = async () => {
  const blogList = await fetchListOfBlogs();

  console.log(blogList, "blogList");

  return <BlogOverview blogList={blogList} />;
};

export default Blogs;
