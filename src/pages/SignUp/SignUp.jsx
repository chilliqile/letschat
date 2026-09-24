import { useState } from "react";
import { Link } from "react-router";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = data;

  const validateInput = () => {
    if (!username) return false;
    if (!password) return false;
    if (!confirmPassword) return false;
    if (password !== confirmPassword) return false;

    return true;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInput();
    // handle submit logic
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register for LetsChat</h1>
        <div>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </form>
    </div>
  );
}
