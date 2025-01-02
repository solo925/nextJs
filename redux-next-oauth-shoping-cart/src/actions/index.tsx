"use server";

import { signIn, signOut } from "@/auth";


interface Product {
  id: number;
  name: string;
  price: number;
  
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}


export async function fetchAllProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const result = await fetch("https://dummyjson.com/products", {
      method: "GET",
      cache: "no-store",
    });
    const data = await result.json();

    return {
      success: true,
      data: data?.products,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Some error occurred! Please try again",
    };
  }
}


export async function fetchProductDetails(currentProductID: number): Promise<Product | ApiResponse<null>> {
  try {
    const result = await fetch(
      `https://dummyjson.com/products/${currentProductID}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await result.json();

    return data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Some error occurred! Please try again",
    };
  }
}


export async function loginAction(): Promise<void> {
  await signIn("github");
}


export async function logoutAction(): Promise<void> {
  await signOut();
}
