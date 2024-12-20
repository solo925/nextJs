import Link from "next/link";

export default function Home() {
  return (
      <div className=" flex justify-center items-center font-semibold ">
      <h1>Welcome to our Recipe page</h1>
      <Link href = {'/recipe-list'}>Explore Our Recipe</Link>
    </div>
  );
}
