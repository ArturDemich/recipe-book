import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={`/`}>
        <h3>Home</h3>
      </Link>
      <h1>Recipe book</h1>
    </header>
  );
}
