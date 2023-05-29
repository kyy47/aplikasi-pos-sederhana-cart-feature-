import React from "react";
import "./home.css";
import { Cart, Products } from "../../components";
import CartProvider from "../../context/CartContext";
const Home = () => {
  return (
    <div className="home">
      <CartProvider>
        <Products />
        <Cart />
      </CartProvider>
    </div>
  );
};
export default Home;
