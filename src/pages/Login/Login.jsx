import { useState } from "react";
import { Link } from "react-router";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const unameChange = (e) => {
    setUsername(e.target.value);
  };

  const pwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login to LetsChat</h1>
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
