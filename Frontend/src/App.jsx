import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { mainLoader, Main } from "./Layout/main.jsx";
import { Error } from "./pages/Error";
import Dashboard from "./pages/Dashboard.jsx";
import { Logout } from "./actions/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/logout",
        action: Logout,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
