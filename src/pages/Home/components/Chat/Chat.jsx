import { useParams } from "react-router";
import { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import useApi from "../../../../hooks/useApiFetch";

export default function Chat() {
  const apiFetch = useApi();
  const { username } = useParams();
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChat() {
      setError("");
      setChat([]);
      setIsLoading(true);
      try {
        const res = await apiFetch(`/messages/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
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

    if (username) {
      fetchChat();
    } else {
      setError("");
      setChat([]);
      setIsLoading(false);
    }
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const text = formData.get("text").trim();

    if (!text) {
      form.reset();
      return;
    }

    const res = await apiFetch(`/messages/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (res.status === 400) {
      alert("Text cannot be empty");
      form.reset();
      return;
    }

    if (res.status === 404) {
      alert("User not found");
      window.location.reload();
      return;
    }

    window.location.reload();
  };

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
        {chat &&
          chat.map((msg) => (
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
      <form onSubmit={handleSubmit} className={styles.sendMessageForm}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message"
          name="text"
        ></input>
        <button className={styles.sendBtn}>
          <svg
            className={styles.btnImg}
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#F3F3F3"
          >
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
