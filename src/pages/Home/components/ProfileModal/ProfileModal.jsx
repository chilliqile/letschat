import { useState, useEffect } from "react";
import styles from "./ProfileModal.module.css";

export default function ProfileModal({ ref, onClose }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", bio: "" });

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, []);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (res.status === 400) {
      setError("Username is required");
      return;
    }

    if (res.status === 409) {
      setError("Username is already in use");
      return;
    }

    if (!res.ok) {
      setError("An error has occured. Please try again later.");
      return;
    }

    onClose();
  };

  return (
    <dialog className={styles.dialog} ref={ref}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Edit Profile</h1>
        <div>
          <label className={styles.label}>Avatar</label>
          <input
            className={styles.field}
            type="file"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div>
          <label className={styles.label}>Username</label>
          <input
            className={styles.field}
            type="text"
            name="username"
            value={user.username}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Bio</label>
          <input
            className={styles.field}
            type="text"
            name="bio"
            value={user.bio}
            onChange={onInputChange}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.buttonContainer}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </dialog>
  );
}
