import { useParams } from "react-router";
import { useState, useEffect } from "react";
import styles from "./Chat.module.css";

const mockUser = {
  username: "iamnotakit",
  avatarUrl: "",
};

const mockChat = [
  {
    username: "iamnotakit",
    // receiver: "itsqile",
    message: "hello",
    sentAt: new Date(),
  },
  {
    username: "itsqile",
    // receiver: "iamnotakit"
    message: "hi, it's been a long time",
    sentAt: new Date(),
  },
  {
    username: "itsqile",
    // receiver: "iamnotakit"
    message: "how have you been?",
    sentAt: new Date(),
  },
];

export default function Chat() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  if (!username) {
    return <p>start a new chat</p>;
  }

  useEffect(() => {
    async function fetchChat() {
      try {
        setUser(null);
        setChat(null);
        setIsLoading(true);
        // fetch chat from api
        setUser(mockUser);
        setChat(mockChat);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChat();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userHeader}>
        <div className={styles.profileIcon}>
          {/* <img src={user.avatarUrl} /> */}
        </div>
        <span>{user.username}</span>
      </div>
      <div className={styles.chatLogs}>
        {chat.map((msg) => (
          <div
            className={`${styles.message}
              ${
                user.username === msg.username
                  ? styles.contactMessage
                  : styles.selfMessage
              }`}
          >
            <p>{msg.message}</p>
            <span className={styles.time}>{msg.sentAt.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
