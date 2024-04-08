"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./leagues.css";


// export const metadata = {
//   title: "Game Districts | Leagues",
//   description: "League leaders, upcoming leagues and game sessions",
// };

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);

  const getLeagues = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`);
    if (res.ok) {
      const data = await res.json();
      setLeagues([]);
      data.forEach((league) => setLeagues((prevState) => [...prevState, league]));
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  return (
    <div className="page">
      <h1>Leagues</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league._id} className="leauge-wrapper">
            <div className="league-img">
              <Image src={league.boardgame.thumbnail} alt="" fill />
            </div>
              <h3>{league.boardgame.title}</h3>
            <div className="date-register">
              <span>Start: {league.startDate}</span>
              <span>End: {league.endDate}</span>
            </div>
            <div className="date-register">
              <button className="btn btn-primary">Register</button>
              <span>{league.maxPlayers - league.players.length} spots left!</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
