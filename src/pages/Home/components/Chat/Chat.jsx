import { useParams } from "react-router";
import { useState, useEffect } from "react";
import styles from "./Chat.module.css";

export default function Chat() {
  const { username } = useParams();
  const [chat, setChat] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChat() {
      setError("");
      setChat({});
      setIsLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/messages/${username}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        if (res.status === 404) {
          setError("User does not exist");
        }

        const data = await res.json();
        setChat(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChat();
  }, [username]);

  if (isLoading) {
    return (
      <div className={styles.fillerContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!username) {
    return (
      <div className={styles.fillerContainer}>
        <p>Start a new chat</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.fillerContainer}>
        <p>User does not exist!</p>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userHeader}>
        <div className={styles.profileIcon}>
          {/* <img src={user.avatarUrl} /> */}
        </div>
        <span>{username}</span>
      </div>
      <div className={styles.chatLogs}>
        {chat.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message}
              ${
                username === msg.sender.username
                  ? styles.contactMessage
                  : styles.selfMessage
              }`}
          >
            <p>{msg.text}</p>
            <span className={styles.time}>
              {new Date(msg.createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
