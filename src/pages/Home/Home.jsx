import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import { Outlet, NavLink, useNavigate } from "react-router";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import NewMessage from "./components/NewMessage/NewMessage";

export default function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const newMessageRef = useRef();
  const editProfileRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const displayMessages = searchInput
    ? messages.filter((msg) => {
        if (
          msg.user.username
            .toLowerCase()
            .includes(searchInput.toLowerCase().trim()) ||
          msg.lastMessage
            .toLowerCase()
            .includes(searchInput.toLowerCase().trim())
        )
          return msg;
      })
    : messages;

  const closeNewMessage = () => {
    newMessageRef.current.close();
    setIsNewMessageOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    editProfileRef.current.close();
  };

  const onInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      navigate("/login");
    }
  };

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);
      try {
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
            onClick={() => setShowDropdown(!showDropdown)}
            className={`${styles.profileIcon} ${styles.dropdown}`}
          >
            {showDropdown && (
              <ul className={styles.dropdownContent}>
                <li>
                  <button onClick={() => setIsModalOpen(true)}>
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </ul>
            )}
          </div>
        </header>
      </div>
      <div className={styles.main}>
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <h1>Messages</h1>
            <button onClick={() => setIsNewMessageOpen(true)}>+</button>
          </div>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            onChange={onInputChange}
          ></input>
          <div className={styles.messageList}>
            {displayMessages.map((msg) => (
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
