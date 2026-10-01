import { useEffect, useState } from "react";
import { apiFetch, clearSession, readSession, saveSession } from "../utils/api";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readSession()?.user || null);
  const [loading, setLoading] = useState(() => Boolean(readSession()?.token));

  useEffect(() => {
    if (!readSession()?.token) return;
    let active = true;
    apiFetch("/auth/me")
      .then((nextUser) => {
        if (!active) return;
        setUser(nextUser);
        saveSession({ ...readSession(), user: nextUser });
      })
      .catch(() => {
        clearSession();
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const authenticate = async (path, payload) => {
    const session = await apiFetch(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    saveSession(session);
    setUser(session.user);
  };

  const login = (payload) => authenticate("/auth/login", payload);
  const signup = (payload) => authenticate("/auth/signup", payload);
  const logout = () => {
    clearSession();
    setUser(null);
  };
  const updateAvatar = async (avatar) => {
    const updatedUser = await apiFetch("/auth/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
    setUser(updatedUser);
    saveSession({ ...readSession(), user: updatedUser });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};
