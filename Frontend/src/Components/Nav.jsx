import React from "react";
import { Form, NavLink } from "react-router-dom";
import logo from "../assets/logomark.svg";

const Nav = ({ username }) => {
  return (
    <nav>
      <NavLink to="/">
        <img src={logo} alt="Spendwise Logo" />
        <span>SpendWise</span>
      </NavLink>

      {username && (
        <Form method="post" action="/logout">
          <button type="submit" className="btn btn--warning">
            Delete User
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
