import React, { useEffect, useState } from "react";

import "./cart.css";
import { useCart, useCartDispatch } from "../../context/CartContext";
import axios from "axios";
const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState("");
  const [change, setChange] = useState(0);
  const [noOrder, setNoOrder] = useState("0000");
  const cart = useCart();
  const dispathCart = useCartDispatch();

  useEffect(() => {
    getTotalPrice();
  }, [cart]);
  const handlerAddCart = (product) => {
    dispathCart({ type: "add", payload: product });
  };
  const handlerDecreaseCart = (product) => {
    dispathCart({ type: "decrease", payload: product });
  };
  const getTotalPrice = () => {
    let total_price = 0;
    for (let i = 0; i < cart.length; i++) {
      total_price += cart[i].quantity * cart[i].price;
    }
    setTotalPrice(total_price);
  };
  const hiddenBtnDone = () => {
    document.querySelector(".modal-checkout").style.display = "none";
    dispathCart({ type: "clear" });
    setTotalPrice(0);
    setPaidAmount("");
  };
  const handlerCheckOut = async () => {
    if (paidAmount < totalPrice) {
      alert("you paid amount not enough");
      return;
    }
    setChange(paidAmount - totalPrice);
    const products = cart.map((post) => ({
      id: post.id,
      quantity: post.quantity,
    }));
    const payload = {
      paid_amount: paidAmount,
      total_price: totalPrice,
      products,
    };
    await axios
      .post("http://localhost:3000/transactions", payload)
      .then((res) => {
        document.querySelector(".modal-checkout").style.display = "flex";
        const { data } = res;
        const { payload } = data;
        setNoOrder(payload[0].no_order);
      })
      .catch((err) => new Error("something wrong when send data"));
  };
  return (
    <div className="container-cart">
      <h3>Cart</h3>
      <div className="cart">
        <div className="box-cart">
          {cart.length
            ? cart.map((post) => (
                <div className="cart-card" key={post.id}>
                  <div>
                    <img
                      src={post.img_product}
                      alt={post.name}
                      className="img-cart"
                    />
                    <p>{post.name}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn-cart"
                      onClick={() => handlerDecreaseCart(post)}
                    >
                      -
                    </button>
                    <p>{post.quantity}</p>
                    <button
                      type="button"
                      className="btn-cart"
                      onClick={() => handlerAddCart(post)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="box-price">
          <p>Total Price Rp. {totalPrice}</p>
        </div>
        <div className="box-paid">
          <input
            type="number"
            className="input-paid"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            placeholder="paid"
          />
        </div>
        <div className="box-btn-checkout">
          <button
            type="button"
            className="btn-checkout"
            onClick={handlerCheckOut}
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="modal-checkout">
        <span className="no-transaction">{noOrder}</span>
        <p>Total Price : Rp.{totalPrice}</p>
        <p>Paid Amount : Rp.{paidAmount}</p>
        <p>change Amount : Rp.{change}</p>
        <button className="btn-done" onClick={hiddenBtnDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Cart;
