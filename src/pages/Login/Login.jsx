import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const unameChange = (e) => {
    setUsername(e.target.value);
  };

  const pwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(username, password);

    if (!res.success) {
      setError(res.error);
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
