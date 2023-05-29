import { createBrowserRouter } from "react-router-dom";
import Home from "../routes/home/Home";
import Navigation from "../components/navigation/Navigation";
import Transactions from "../routes/transactions/Transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);
