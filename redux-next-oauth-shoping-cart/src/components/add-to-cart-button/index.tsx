"use client";

import { addToCart, removeFromCart } from "@/store/slices/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";


interface ProductItem {
  id: number;
  name: string;
  price: number;
  
}

interface CartItem {
  id: number;
  quantity: number;
  
}

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}


interface AddToCartButtonProps {
  productItem: ProductItem;
}

function AddToCartButton({ productItem }: AddToCartButtonProps) {
  const { cart } = useSelector((state: RootState) => state);
  console.log(cart?.cartItems);
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(productItem));
  }

  function handleRemoveFromCart() {
    dispatch(removeFromCart(productItem?.id));
  }

  return (
    <div className="mt-8 max-w-md">
      <Button
        type="button"
        onClick={
          cart?.cartItems.some((item) => item.id === productItem.id)
            ? handleRemoveFromCart
            : handleAddToCart
        }
      >
        {cart?.cartItems.some((item) => item.id === productItem.id)
          ? "Remove from cart"
          : "Add to cart"}
      </Button>
    </div>
  );
}

export default AddToCartButton;
