import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import "./layout-new.css";
// import Expenses from "../expenses/expenses";
// import Income from "../incomes/income";
// import Transctions from "../transactions/transcations";

const Layout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
