import { useAuth } from "../context/AuthContext";

export default function useApi() {
  const { handleSessionExpired } = useAuth();

  return async function apiFetch(path, options = {}) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}${path}`, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401) {
      handleSessionExpired();
    }

    return res;
  };
}
