"use server";

import connectDB from "@/Database";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface FormData {
  userName?: string;
  email: string;
  password: string;
}


interface ActionResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

interface DecodedToken {
  id?: string;
  userName?: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function registerUserAction(formData: FormData): Promise<ActionResponse> {
  await connectDB();
  try {
    const { userName, email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "User already exists! Please try with a different email.",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newlyCreatedUser.save();

    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}

export async function loginUserAction(formData: FormData): Promise<ActionResponse> {
  await connectDB();
  try {
    const { email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User does not exist! Please sign up.",
      };
    }

    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "Password is incorrect. Please check.",
      };
    }

    const createdTokenData: DecodedToken = {
      id: checkUser._id.toString(),
      userName: checkUser.userName,
      email: checkUser.email,
    };

    const token = jwt.sign(createdTokenData, "DEFAULT_KEY", { expiresIn: "1d" });

    const getCookies = await cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "Login is successful.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again.",
    };
  }
}

export async function fetchAuthUserAction(): Promise<ActionResponse> {
  await connectDB();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value || "";

    if (!token) {
      return {
        success: false,
        message: "Token is invalid.",
      };
    }

    const decodedToken = jwt.verify(token, "DEFAULT_KEY") as DecodedToken;
    const getUserInfo = await User.findOne({ _id: decodedToken.id });

    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: "An error occurred. Please try again.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const getCookies = await cookies();
  getCookies.set("token", "");
}
