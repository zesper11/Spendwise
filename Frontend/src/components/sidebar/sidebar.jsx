import { NavLink } from "react-router-dom";
import "./sidebar-new.css";

const Sidebar = () => {
  return (
    <aside className="sidebar" role="navigation">
      <div className="profile">
        <img
          src="https://www.bing.com/th/id/OIP.Sko8CQSOZhYy3u_kQB6J3QHaHa?w=132&h=128&c=8&rs=1&qlt=90&o=6&pid=ImgAns&rm=2"
          alt="User profile picture"
        />
        <div className="profile-text">
          <span className="profile-label">Welcome back</span>
          <strong>Rohan</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/transactions"
        >
          Transactions
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/expenses"
        >
          Expenses
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/income"
        >
          Income
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
