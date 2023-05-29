import { Outlet, RouterProvider } from "react-router-dom";
import "./app.css";
import { router } from "./router/router";
import CartProvider from "./context/CartContext";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
