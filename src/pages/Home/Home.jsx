import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Outlet, NavLink } from "react-router";

const mockMessages = [
  { username: "sana", avatarUrl: "" },
  { username: "iamnotakit", avatarUrl: "" },
];

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      setMessages([]);
      try {
        // fetch message from api
        setMessages(mockMessages);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <span className={styles.logo}>LetsChat</span>
          <div className={styles.profileIcon}></div>
        </header>
      </div>
      <div className={styles.main}>
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <h1>Messages</h1>
            <button>+</button>
          </div>
          <form>
            <input
              className={styles.search}
              type="text"
              placeholder="Search"
            ></input>
          </form>
          <div className={styles.messagesPanel}>
            {messages.map((msg) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.messageItem}`
                    : styles.messageItem
                }
                to={`/chats/${msg.username}`}
              >
                <div className={styles.profileIcon}>
                  {/* <img src={msg.avatarUrl} /> */}
                </div>
                <span>{msg.username}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="rightPanel">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
