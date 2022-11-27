import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="max-width-container">
        <Link href="/">
          <span>
            <span className="title-s">IRE</span>
            <span className="title-b">Archive</span>
          </span>
        </Link>
        <ul className="category-text">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="https://github.com/ire4564">GitHub</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
