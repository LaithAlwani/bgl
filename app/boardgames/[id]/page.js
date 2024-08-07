"use client";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/boardgames.css";
import "@/styles/contact.css";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function BoardgamePage() {
  const params = useParams();
  const [boardgame, setBoardgame] = useState(null);
  const [loading, setLoding] = useState(false);
  const [modleToggle, setModleToggle] = useState(false);

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
        <>
          <BoardGame
            boardgame={boardgame}
            modleToggle={modleToggle}
            setModleToggle={setModleToggle}
          />
          <GamePlays sessions={boardgame?.sessions} />
          <Modle modleToggle={modleToggle} setModleToggle={setModleToggle}>
            <LogPlay
              boardgame={boardgame}
              setBoardgame={setBoardgame}
              setModleToggle={setModleToggle}
            />
          </Modle>
        </>
      )}
    </div>
  );
}

const BoardGame = ({ boardgame, modleToggle, setModleToggle }) => {
  return (
    boardgame && (
      <div className="boardgame">
        <img src={boardgame.thumbnail} />
        <div>
          <h2>{boardgame.title}</h2>
          <p>
            Players: {boardgame.minPlayers} - {boardgame.maxPlayers}
          </p>
          <p>
            Time: {boardgame.minPlayTime} - {boardgame.maxPlayTime}
          </p>
          <button className="btn btn-green" onClick={(e) => setModleToggle(!modleToggle)}>Log Play</button>
        </div>
      </div>
    )
  );
};

const GamePlays = ({ sessions }) => {
  return (
    sessions?.length > 0 &&
    sessions.map((session) =>
      session.players.map((player, i) => (
        <p key={i}>
          {player.player} points:{player.points}
        </p>
      ))
    )
  );
};

const LogPlay = ({ boardgame, setBoardgame, setModleToggle }) => {
  const [inputFields, setInputFields] = useState([
    {
      player: "",
      points: 0,
    },
  ]);

  const handleChange = (e, index) => {
    let data = [...inputFields];
    console.log(e.target.name);
    data[index][e.target.name] = e.target.value;
    console.log(data[index]);
    setInputFields(data);
  };
  const addPlayer = () => {
    let newField = { player: "", points: 0 };
    setInputFields((prev) => [...prev, newField]);
  };
  const removePlayer = (idx) => {
    const data = [...inputFields];
    data.splice(idx, 1);
    setInputFields(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify({ players: inputFields, boardgameId: boardgame._id }),
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
      const fields = [{ player: "", points: 0 }];
      const newSessions = boardgame.sessions;
      newSessions.push(data.session);
      setBoardgame((prev) => prev, { sessions: newSessions });
      setInputFields(fields);
      setModleToggle(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold">log play</h2>
      {inputFields.map((input, idx) => (
        <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            type="text"
            name={`player`}
            onChange={(e) => handleChange(e, idx)}
            placeholder={`player ${idx + 1}`}
            value={input.player}
            style={{ flexBasis: "1 0 0" }}
          />
          <input
            type="number"
            name={`points`}
            onChange={(e) => handleChange(e, idx)}
            value={input.points}
            min={0}
            placeholder="score"
            autoComplete="false"
            style={{ flexBasis: "content" }}
          />
          <MdOutlineDeleteOutline onClick={() => removePlayer(idx)} color="#b8373c" size={64} />
        </div>
      ))}
      <button type="button" onClick={addPlayer} className="btn">
        Add
      </button>

      <button className="btn btn-green">Submit</button>
    </form>
  );
};

const Modle = ({ children, modleToggle, setModleToggle }) => {
  return (
    <div className={`modle ${modleToggle ? "open" : ""}`}>
      <span onClick={() => setModleToggle(false)}>X</span>
      {children}
    </div>
  );
};
