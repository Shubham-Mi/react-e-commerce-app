import React, { useContext } from "react";
import { store } from "../App";

export default function Navbar({ items }) {
  const [state, setState] = useContext(store);
  const { activeCategory } = state;

  return (
    <div className="navbar">
      {items.map((item) => {
        return (
          <div
            onClick={() => {
              setState({ ...state, activeCategory: item.name });
            }}
            key={item.key}
            className={`navbar-item ${
              activeCategory === item.name ? "is-selected" : ""
            }`}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
