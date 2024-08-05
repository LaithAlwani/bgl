"use client";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardgamePage() {
  const params = useParams();
  const [boardgame, setBoardgame] = useState({});
  const [loading, setLoding] = useState(false);

  const getBoardgame = async () => {
    setLoding(true);
    const res = await fetch(`/api/boardgames/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      setBoardgame(data);
    }
    setLoding(false);
  };

  useEffect(() => {
    getBoardgame();
  }, []);

  return (
    <div className="page flex-page">
      {loading ? (
        <Loader size={128} />
      ) : (
        boardgame && (
          <>
            <img src={boardgame.thumbnail} />
            <h2>{boardgame.title}</h2>
            <p>
              {boardgame.minPlayers} - {boardgame.maxPlayers}
            </p>
            <p>
              {boardgame.minPlayTime} - {boardgame.maxPlayTime}
            </p>
          </>
        )
      )}
    </div>
  );
}
