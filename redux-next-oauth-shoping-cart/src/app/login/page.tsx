'use client';

import { signIn } from "next-auth/react";

function LoginPage() {
  return (
    <div className="p-20">
      <h2 className="text-4xl font-bold">Login</h2>
      <button
        onClick={() => signIn("github")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with GitHub
      </button>
    </div>
  );
}

export default LoginPage;
