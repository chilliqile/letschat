import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const unameChange = (e) => {
    setUsername(e.target.value);
  };

  const pwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle submit logic
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.status === 401) {
      setError("Invalid username or password");
      return;
    }

    navigate("/chats");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login to LetsChat</h1>
        {error && <span className={styles.errorMessage}>{error}</span>}
        <div>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            onChange={unameChange}
            type="text"
            name="username"
            id="username"
            value={username}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            onChange={pwChange}
            type="password"
            name="password"
            id="password"
            value={password}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
        <p>
          Don't have an account? Register <Link to="/sign-up">here</Link>
        </p>
      </form>
    </div>
  );
}
