import { useState } from "react";
import styles from "./ProfileModal.module.css";

export default function ProfileModal({ ref, onClose }) {
  // profile: {avatar, username, bio}
  // fetch profile details, from context or from api

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic
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
          <input className={styles.field} type="text" required />
        </div>
        <div>
          <label className={styles.label}>Bio</label>
          <input className={styles.field} type="text" />
        </div>
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
