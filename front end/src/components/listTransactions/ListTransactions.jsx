import React, { useEffect, useState } from "react";

import "./list-transactions.css";
import axios from "axios";

const ListTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/transactions").then((res) => {
      setTransactions(res.data.payload.transactions);
    });
  }, []);
  return (
    <section className="list-transactions">
      <h3>List Transactions</h3>
      <div className="box-list-transactions">
        {transactions.length ? (
          transactions.map((transaction) => (
            <div className="card-transaction" key={transaction.no_order}>
              <span className="no-order">{transaction.no_order}</span>
              <div className="detail-transaction">
                <div className="detail-transaction-left">
                  <div className="total-price">
                    <p>Total Price</p>
                    <h3>Rp. {transaction.total_price}</h3>
                  </div>
                  <div className="paid">
                    <p>Paid Amount</p>
                    <h3>Rp. {transaction.paid_amount}</h3>
                  </div>
                </div>
                <div className="detail-transaction-right">
                  <p>items</p>
                  {transaction.products.map((product, i) => (
                    <div className="items" key={i}>
                      <span>{product.product}</span>
                      <span>{product.quantity}pcs</span>
                    </div>
                  ))}
                </div>
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

export default ListTransactions;
