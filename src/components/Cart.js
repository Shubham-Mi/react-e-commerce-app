import React, { useContext } from "react";
import CartItems from "./CartItems";
import { store } from "../App";

export default function Cart() {
  const [state] = useContext(store);
  const { totalPrice } = state;
  const closeCart = () => {
    const cart = document.querySelector(".cart");
    cart.classList.remove("is-open");
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Cart</h3>
        <button onClick={() => closeCart()} className="button is-danger">
          Close
        </button>
      </div>
      <CartItems />
      <div className="cart-footer">Total cost: Rs. {totalPrice}</div>
    </div>
  );
}
