import { fetchData } from "../helpers";
import { Outlet, useLoaderData } from "react-router-dom";
import React from "react";
import wave from "../assets/wave.svg";
import Nav from "../Components/Nav";

export function mainLoader() {
  const username = fetchData("username");
  return { username };
}

export const Main = () => {
  const { username } = useLoaderData();

  return (
    <div className="layout">
      <Nav username />
      <h1>Hello {username}</h1>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="footer background" />
    </div>
  );
};
