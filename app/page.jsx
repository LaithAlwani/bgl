import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-page">
      <h1>Board Game League</h1>
      <p>Elevate your game to the next level</p>
      <div className="button-group">
        <Link href="/leagues" className="btn btn-primary">
          Register
        </Link>
        <Link href="/contact" className="btn">
          Contact Us
        </Link>
      </div>
      <div className="img-wrapper">
        <Image src="/images/bg.jpg" alt="a game of thrones board game" fill />
      </div>

      {/* game poll */}
      {/* upcomimg leagues  */}

      {/* */}
    </div>
  );
}
