
import Image from "next/image";
import "./about.css";

export const metadata = {
  title: 'Game Districts | About',
  description: 'about meeple nation vision and mission',
}

export default function AboutPage() {
  return (
    <div className="about-page page">
      <h1>About Game Districts</h1>
      <div>
        <p>
          Founded in Ottawa, Ontario in 2024 by a passionate board game aficionado, Board Game
          League aims to cultivate a welcoming, secure, and spirited atmosphere for board game
          enthusiasts. Our mission is to foster a community where friendly competition thrives. With
          a vision to become a premier destination for board gaming in Canada, we aspire to
          introduce and encourage the hobby to a broader audience of players.
        </p>
        <div className="img-wrapper">
          <Image src="/images/players.webp" alt="image of players playing" fill objectFit="cover" />
        </div>
      </div>
      <h2>Meet the Orginizer</h2>
      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit eius quisquam perspiciatis
          dicta nemo sunt velit quidem rerum commodi labore.
        </p>
        <div className="img-wrapper">
          <Image src="/images/players.webp" alt="image of orgnizer" fill objectFit="cover" />
        </div>
      </div>
      <h2></h2>
    </div>
  );
}
