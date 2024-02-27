import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Board Game League</h1>
      <p>Take your game to the next level</p>
      <div className="button-group">
        <Link href="/signup" className="btn btn-primary">GetStarted</Link>
        <Link href="/leagues" className="btn">Register</Link>
      </div>

      {/* game poll */}
      {/* upcomimg leagues  */}

      {/* */}
    </main>
  );
}
