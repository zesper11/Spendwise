import React from "react";
import { Form, NavLink } from "react-router-dom";
import logo from "../assets/logomark.svg";
import { TrashIcon } from "@heroicons/react/24/solid";

const Nav = ({ username }) => {
  return (
    <nav>
      <NavLink to="/">
        <img src={logo} alt="Spendwise Logo" />
        <span>SpendWise</span>
      </NavLink>

      {username && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!confirm("Would You Like To Delete ALl the Data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            Delete User
            <TrashIcon width={25} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
