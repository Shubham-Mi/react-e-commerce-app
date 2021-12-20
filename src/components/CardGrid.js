import React, { useContext } from "react";
import { pets } from "../data";
import { store } from "../App";
import AddRemoveButton from "./AddRemoveButton";

export default function CardGrid() {
  const [state, setState] = useContext(store);
  const { activeCategory, cartItems } = state;
  const filteredpets = pets.filter((pet) => pet.type === activeCategory);

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

  return (
    <div className="products">
      {filteredpets.map((pet) => {
        return (
          <div key={pet.id} className="product-item">
            <img src={pet.image} alt={pet.name} />
            <div className="product-details">
              <div className="product-title">{pet.name}</div>
              <div className="product-purchase">
                <span>Rs. {pet.price}</span>
                <AddRemoveButton
                  pet={pet}
                  cartItems={cartItems}
                  addItem={() => addItem(pet)}
                  removeItem={() => removeItem(pet)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
