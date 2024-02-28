import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Board Game League</h1>
      <p>Take your game to the next level</p>
      <div className="button-group">
        <Link href="/leagues" className="btn btn-primary">Register</Link>
        <Link href="/contact" className="btn">Contact Us</Link>
      </div>

      {/* game poll */}
      {/* upcomimg leagues  */}

      {/* */}
    </main>
  );
}
