import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password, confirmPassword } = data;

  const validateInput = () => {
    setErrors({});
    let err = {};
    if (!username) {
      err = { username: { message: "Username is required" } };
    }
    if (!password) {
      err = { ...err, password: { message: "Password is required" } };
    }
    if (password !== confirmPassword) {
      err = {
        ...err,
        confirmPassword: { message: "Passwords do not match. Please re-enter" },
      };
    }

    if (Object.keys(err).length === 0) {
      return true;
    } else {
      setErrors(err);
      return false;
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 409) {
      setErrors({ username: { message: "Username is already in use" } });
      return;
    }

    if (res.status === 500) {
      setErrors({
        serverError: {
          message: "A server error occured. Please try again later.",
        },
      });
      return;
    }

    navigate("/login");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register for LetsChat</h1>
        {errors.serverError && (
          <span className={styles.errorMessage}>
            {errors.serverError.message}
          </span>
        )}
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
          {errors.username && (
            <span className={styles.errorMessage}>
              {errors.username.message}
            </span>
          )}
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
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
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
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          )}
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
