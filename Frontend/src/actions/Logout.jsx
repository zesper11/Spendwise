import { redirect } from "react-router-dom";
import DeleteUserData from "../helpers.js";

export const Logout = async () => {
  DeleteUserData({ key: "username" });
  return redirect("/");
};
