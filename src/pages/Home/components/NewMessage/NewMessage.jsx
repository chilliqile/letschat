import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./NewMessage.module.css";

export default function NewMessage({ ref, onClose }) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const search = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const params = new URLSearchParams();
    params.append("username", input);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/users?${params}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    const data = await res.json();
    setResults(data);
  };

  const handleClick = (username) => {
    navigate(`/chats/${username}`);
    onClose();
  };

  return (
    <dialog ref={ref}>
      <header className={styles.header}>
        <h1>New message</h1>
        <button onClick={onClose}>X</button>
      </header>
      <form onSubmit={search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search contact..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        ></input>
        <button>Search</button>
      </form>
      {results.length > 0 && (
        <div>
          <h2>Users</h2>
          {results.map((r, index) => (
            <div
              className={styles.result}
              key={index}
              onClick={() => handleClick(r.username)}
            >
              <img />
              <span>{r.username}</span>
            </div>
          ))}
        </div>
      )}
    </dialog>
  );
}
