"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:3002/auth/user", {
          withCredentials: true,
        });
        setUser(response.data);
        console.log("userrr", response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
