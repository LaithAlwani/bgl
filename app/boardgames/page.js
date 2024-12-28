"use client";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/boardgames.css"

export default function BoardgamesPage() {
  const [boardgames, setBoardgames] = useState([]);
  const [loading, setLoding] = useState(false);

  const getBoardgames = async () => {
    setLoding(true);
    setBoardgames([]);
    const res = await fetch("/api/boardgames");
    if (res.ok) {
      const data = await res.json();
      setBoardgames(data);
    }
    setLoding(false);
  };

  useEffect(() => {
    getBoardgames();
  }, []);

  return (
    <section className="page flex-page">
      <div className="boardgame-container">
        {!loading ? (
          boardgames.map((bg) => (
            <Link href={`/boardgames/${bg._id}`} key={bg._id} style={{minHeight:"9rem"}}>
              <img src={bg.thumbnail} style={{minHeight:"9rem"}}/>
            </Link>
          ))
        ) : (
          <Loader size={96} />
        )}
      </div>
    </section>
  );
}
