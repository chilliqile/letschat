import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });
  useEffect(() => {
    async function checkAuthentication() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        setAuthState({ isAuthenticated: true, isLoading: false });
      } else {
        setAuthState({ isAuthenticated: false, isLoading: false });
      }
    }
    checkAuthentication();
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      setAuthState({ isAuthenticated: true, isLoading: false });
      return { success: true };
    }
    if (res.status === 401) {
      return { success: false, error: "Invalid username or password" };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuthState({ isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
