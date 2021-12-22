import React, { useContext } from "react";
import { store } from "../App";
import AddRemoveButton from "./AddRemoveButton";

export default function CartItems() {
  const [state, setState] = useContext(store);
  const { cartItems } = state;

  function addItem(pet) {
    if (cartItems[pet.id]) {
      setState({
        ...state,
        cartItems: {
          ...cartItems,
          [pet.id]: {
            ...cartItems[pet.id],
            quantity: cartItems[pet.id].quantity + 1,
          },
        },
        totalPrice: state.totalPrice + pet.price,
      });
    } else {
      setState({
        ...state,
        cartItems: {
          ...cartItems,
          [pet.id]: {
            ...pet,
            quantity: 1,
          },
        },
        totalPrice: state.totalPrice + pet.price,
      });
    }
  }

  function removeItem(pet) {
    const newCartItems = { ...cartItems };
    newCartItems[pet.id].quantity -= 1;

    if (newCartItems[pet.id].quantity === 0) {
      delete newCartItems[pet.id];
    }

    setState({
      ...state,
      cartItems: newCartItems,
      totalPrice: state.totalPrice - pet.price,
    });
  }

  if (Object.keys(cartItems).length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  } else {
    return (
      <div className="cart-items">
        {Object.values(cartItems).map((item) => {
          return (
            <div className="cart-item">
              <div className="cart-item-top">
                <span className="cart-item-title bold">{item.name}</span>
                <AddRemoveButton
                  pet={item}
                  cartItems={cartItems}
                  addItem={addItem}
                  removeItem={removeItem}
                />
              </div>
              <span className="cart-item-total">
                {item.price} x {item.quantity} = {item.price * item.quantity}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}
