import React from "react";
import "./styles/globalStyles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// routes
import Layout from "./components/layout/layout";
import Expenses from "./components/expenses/expenses";
import Income from "./components/incomes/income";
import Sidebar from "./components/sidebar/sidebar";
import Transctions from "./components/transactions/transcations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Sidebar />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "transactions",
        element: <Transctions />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not found</h1>,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
