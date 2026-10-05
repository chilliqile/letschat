import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import { Outlet, NavLink } from "react-router";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import NewMessage from "./components/NewMessage/NewMessage";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const newMessageRef = useRef();
  const editProfileRef = useRef(null);

  const closeNewMessage = () => {
    newMessageRef.current.close();
    setIsNewMessageOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    editProfileRef.current.close();
  };

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);
      try {
        // fetch message from api
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/messages`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      editProfileRef.current.showModal();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isNewMessageOpen) {
      newMessageRef.current.showModal();
    }
  }, [isNewMessageOpen]);

  if (isLoading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <span className={styles.logo}>LetsChat</span>
          <div
            onClick={() => setIsModalOpen(true)}
            className={styles.profileIcon}
          ></div>
        </header>
      </div>
      <div className={styles.main}>
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <h1>Messages</h1>
            <button onClick={() => setIsNewMessageOpen(true)}>+</button>
          </div>
          <form>
            <input
              className={styles.search}
              type="text"
              placeholder="Search"
            ></input>
          </form>
          <div className={styles.messageList}>
            {messages.map((msg) => (
              <NavLink
                key={msg.user.id}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.messageItem}`
                    : styles.messageItem
                }
                to={`/chats/${msg.user.username}`}
              >
                <div className={styles.profileIcon}>
                  {/* <img src={msg.avatarUrl} /> */}
                </div>
                <div className={styles.messageDetails}>
                  <span>{msg.user.username}</span>
                  <span className={styles.lastMessage}>{msg.lastMessage}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className={styles.rightPanel}>
          <Outlet />
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal ref={editProfileRef} onClose={closeModal} />
      )}
      {isNewMessageOpen && (
        <NewMessage ref={newMessageRef} onClose={closeNewMessage} />
      )}
    </div>
  );
}

// TODO: search existing conversation list
