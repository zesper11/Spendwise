import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../context/useAuth";
import { defaultAvatar } from "../../utils/api";
import "./sidebar-new.css";

const Sidebar = () => {
  const { user, logout, updateAvatar } = useAuth();
  const photoInput = useRef(null);

  const uploadPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1_800_000) {
      window.alert("Choose an image under 1.8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      updateAvatar(String(reader.result)).catch((error) =>
        window.alert(error.message),
      );
    reader.readAsDataURL(file);
  };

  return (
    <aside className="sidebar" role="navigation">
      <div className="profile">
        <img
          src={user?.avatar || defaultAvatar(user?.name)}
          alt={`${user?.name || "Your"} profile`}
          onClick={() => photoInput.current?.click()}
          title="Change profile photo"
        />
        <div className="profile-text">
          <span className="profile-label">Welcome back</span>
          <strong>{user?.name}</strong>
        </div>
        <input
          ref={photoInput}
          className="profile-upload"
          type="file"
          accept="image/*"
          onChange={uploadPhoto}
          aria-label="Upload profile photo"
        />
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
      <button className="signout-button" type="button" onClick={logout}>
        Sign out
      </button>
    </aside>
  );
};

export default Sidebar;
