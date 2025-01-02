"use client";

import { logoutAction } from "@/actions";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

// JSX.Element: This is the standard type for React components that return JSX.
//  It avoids implicit any errors and makes the component explicit.
function Logout(): JSX.Element {
  const router = useRouter();

  async function handleLogout(): Promise<void> {
    await logoutAction();
    router.push("/"); 
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
