import React, { useContext, useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext();
const CartDispathContext = createContext();

const cartReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "add": {
      const index = state.findIndex((obj) => obj.id === payload.id);
      if (index === -1) {
        return [...state, { ...payload, quantity: 1 }];
      }
      return state.map((obj, i) => {
        if (i === index) {
          return { ...obj, quantity: obj.quantity + 1 };
        }
        return obj;
      });
    }
    case "decrease": {
      const index = state.findIndex((obj) => obj.id === payload.id);
      if (state[index].quantity === 1)
        return state.filter((obj) => obj.id !== payload.id);
      return state.map((obj, i) => {
        if (i === index) return { ...obj, quantity: obj.quantity - 1 };
        return obj;
      });
    }
    case "clear":
      return [];
    default: {
      throw Error("Unknown action: " + type);
    }
  }
};

const initialState = [];

const CartProvider = ({ children }) => {
  const [cart, dispathCart] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={cart}>
      <CartDispathContext.Provider value={dispathCart}>
        {children}
      </CartDispathContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispathContext);
}
