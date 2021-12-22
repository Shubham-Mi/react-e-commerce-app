import { Navbar, CardGrid, Cart } from "./components";
import "./styles.scss";
import { navbar } from "./data.js";
import { createContext, useState } from "react";

export const store = createContext([
  { activeCategory: "dogs", cartItems: [], totalPrice: 0 },
  (obj) => obj,
]);

function App() {
  const state = useState({
    activeCategory: "dogs",
    cartItems: {},
    totalPrice: 0,
  });

  const openCart = () => {
    const cart = document.querySelector(".cart");
    cart.classList.add("is-open");
  };

  return (
    <store.Provider value={state}>
      <div className="App">
        <header className="App-header">
          <Navbar items={navbar} />
          <button className="button" onClick={() => openCart()}>
            Cart
          </button>
        </header>
        <main className="App-main">
          <CardGrid />
          <Cart />
        </main>
      </div>
    </store.Provider>
  );
}

export default App;
