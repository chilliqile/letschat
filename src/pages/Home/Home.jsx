import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import { Outlet, NavLink } from "react-router";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import NewMessage from "./components/NewMessage/NewMessage";

const mockMessages = [
  { username: "sana", avatarUrl: "" },
  { username: "iamnotakit", avatarUrl: "" },
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
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
      {isModalOpen && (
        <ProfileModal ref={editProfileRef} onClose={closeModal} />
      )}
      {isNewMessageOpen && (
        <NewMessage ref={newMessageRef} onClose={closeNewMessage} />
      )}
    </div>
  );
}
