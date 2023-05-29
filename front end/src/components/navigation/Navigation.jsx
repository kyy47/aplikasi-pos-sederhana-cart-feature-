import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./navigation.css";
const Navigation = () => {
  const location = useLocation();
  return (
    <div className="container">
      <div className="navigation">
        <Link
          className={`menu-nav ${location.pathname === "/" ? "focus" : null}`}
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={`menu-nav ${
            location.pathname === "/transactions" ? "focus" : null
          }`}
          to={"/transactions"}
        >
          Transactions
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
