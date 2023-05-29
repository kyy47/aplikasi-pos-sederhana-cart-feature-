import React, { useEffect, useState } from "react";

import "./products.css";
import axios from "axios";
import { useCart, useCartDispatch } from "../../context/CartContext";

const Products = () => {
  const cart = useCart();
  const dispathCart = useCartDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/products").then(({ data }) => {
      setProducts(data.payload);
    });
  }, []);
  const handlerAddCart = (product) => {
    dispathCart({ type: "add", payload: product });
  };
  return (
    <section className="products-container">
      <h3>Home</h3>
      <div className="products">
        {products.length ? (
          products.map((product) => (
            <div className="card-product" key={product.id}>
              <img src={product.img_product} alt={product.name} />
              <div className="box-product">
                <div className="detail-product">
                  <span className="title-product">{product.name}</span>
                  <span className="price-product">
                    <b>Rp.</b> {product.price}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-plus"
                  onClick={() => handlerAddCart(product)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </section>
  );
};

export default Products;
