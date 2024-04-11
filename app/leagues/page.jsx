"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import "./leagues.css";
import { toast } from "react-hot-toast";

// export const metadata = {
//   title: "Game Districts | Leagues",
//   description: "League leaders, upcoming leagues and game sessions",
// };

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const { isSignedIn, user } = useUser();

  const getLeagues = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`);
    if (res.ok) {
      const data = await res.json();
      setLeagues([]);
      data.forEach((league) => setLeagues((prevState) => [...prevState, league]));
    }
  };

  const handleRegistration = async (leagueId) => {
    if (!isSignedIn) return toast.error("Please sign in to register");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues/${leagueId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, leagueId }),
    });
    
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  return (
    <div className="page">
      <h1>Leagues</h1>
      <ul>
        {leagues.map(({ _id, boardgame, startDate, endDate, maxPlayers, players }) => (
          <li key={_id} className="leauge-wrapper">
            <div className="league-img">
              <Image src={boardgame.thumbnail} alt="" fill />
            </div>
            <h3>{boardgame.title}</h3>
            <div className="date-register">
              <span>Start: {new Date(startDate).toDateString()}</span>
              <span>End: {new Date(endDate).toDateString()}</span>
            </div>
            <div className="date-register">
              <button className="btn btn-primary" onClick={() => handleRegistration(_id)}>
                Register
              </button>
              <span>{maxPlayers - players.length} spots left!</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
