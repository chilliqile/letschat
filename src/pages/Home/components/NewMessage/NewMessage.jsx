import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./NewMessage.module.css";
const mockResults = [{ username: "Hello", avatarUrl: "" }];

export default function NewMessage({ ref, onClose }) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const search = (e) => {
    e.preventDefault();
    // search database
    // set search results
    setResults(mockResults);
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
      <div>
        {results &&
          results.map((r, index) => (
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
    </dialog>
  );
}
