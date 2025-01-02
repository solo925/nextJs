"use client";

import { loginUserAction } from "@/actions";
import CommonFormElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { initialLoginFormData, userLoginFormControls } from "../utils";


// Allows dynamic keys for form controls
interface LoginFormData {
  [key: string]: string; 
}

function SignIn() {
  const [signInFormData, setSignInFormData] = useState<LoginFormData | any>(initialLoginFormData);
  const router = useRouter();

  async function handleSignIn() {
    const result = await loginUserAction(signInFormData);
    console.log(result);
    if (result?.success) router.push("/");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignInFormData((prevState: LoginFormData) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <h1>Login</h1>
      <form action={handleSignIn}>
        {userLoginFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signInFormData[controlItem.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default SignIn;
