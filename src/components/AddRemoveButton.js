import React from "react";

export default function AddRemoveButton({
  pet,
  cartItems,
  addItem,
  removeItem,
}) {
  const itemInCart = cartItems[pet.id];

  if (itemInCart) {
    return (
      <div className="button-group">
        <button className="button" onClick={() => removeItem(pet)}>
          -
        </button>
        <div className="button-label">{itemInCart.quantity}</div>
        <button className="button" onClick={() => addItem(pet)}>
          +
        </button>
      </div>
    );
  } else {
    return (
      <button className="button" onClick={() => addItem(pet)}>
        Add to Cart
      </button>
    );
  }

  // return <button>Add to Cart</button>;
}
