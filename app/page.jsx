import Image from "next/image";
import Link from "next/link";
import "./home-page.css"

export default function Home() {
  return (
    <div className="flex-page home-page">
      <h1>Welcome to Meelpe Nation</h1>
      <h2>A Boardgameing League</h2>
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
        <Image
          src="/images/bg.jpg"
          alt="a game of thrones board game"
          fill
          sizes="100vw"
          priority
          objectFit="cover"
        />
      </div>

      {/* game poll */}
      {/* upcomimg leagues  */}

      {/* */}
    </div>
  );
}
