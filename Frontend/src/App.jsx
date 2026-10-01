import "./styles/globalStyles-new.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// routes
import Layout from "./components/layout/layout";
import Expenses from "./components/expenses/expenses";
import Income from "./components/incomes/income";
import Transctions from "./components/transactions/transcations";
import Auth from "./components/auth/auth";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="app-loading">Opening your account...</div>;
  return user ? <Layout /> : <Navigate to="/auth" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/transactions" replace />,
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
  { path: "/auth", element: <Auth /> },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
