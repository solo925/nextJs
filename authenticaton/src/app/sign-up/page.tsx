"use client";

import { registerUserAction } from "@/actions";
import CommonFormElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { initialSignUpFormData, userRegistrationFormControls } from "../utils";


interface SignUpFormData {
  [key: string]: string;
}

function SignUp(): JSX.Element {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData | any>(
    initialSignUpFormData
  );
  const router = useRouter();

  function handleSignUpBtnValid(): boolean {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  }

  async function handleSignUp(): Promise<void> {
    const result = await registerUserAction(signUpFormData);
    console.log(result);

    if (result?.data) {
      router.push("/sign-in");
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setSignUpFormData((prevState: SignUpFormData) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <h1>Registration</h1>
      <form action={handleSignUp}>
        {userRegistrationFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              value={signUpFormData[controlItem.name]}
              currentItem={controlItem}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <Button
          disabled={!handleSignUpBtnValid()}
          className="disabled:opacity-65"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
