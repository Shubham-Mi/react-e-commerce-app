import React, { useContext } from "react";
import { store } from "../App";
import AddRemoveButton from "./AddRemoveButton";

export default function Cart({ showCart }) {
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
    });
  }

  if (showCart === false) {
    return null;
  } else if (Object.keys(cartItems).length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">Cart</h2>
        <span className="empty-cart">Cart is empty</span>
      </div>
    );
  } else {
    return (
      <div className="cart">
        <h2 className="cart-title">Cart</h2>
        <ol>
          {Object.keys(cartItems).map((key) => {
            return (
              <li key={key}>
                {cartItems[key].quantity} * {cartItems[key].name}
                <AddRemoveButton
                  pet={cartItems[key]}
                  cartItems={cartItems}
                  addItem={() => addItem(cartItems[key])}
                  removeItem={() => removeItem(cartItems[key])}
                />
              </li>
            );
          })}
        </ol>
        <div className="cart-total">
          <span>Total: Rs. {state.totalPrice}</span>
        </div>
      </div>
    );
  }
}
