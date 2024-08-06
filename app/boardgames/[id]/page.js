"use client";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/boardgames.css";
import toast from "react-hot-toast";

export default function BoardgamePage() {
  const params = useParams();
  const [boardgame, setBoardgame] = useState({});
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
      <Modle modleToggle={modleToggle} setModleToggle={setModleToggle}>
        <LogPlay boardgame={boardgame} setBoardgame={setBoardgame} setModleToggle={setModleToggle} />
      </Modle>
      <button onClick={(e) => setModleToggle(!modleToggle)}>Log Play</button>
      {boardgame.sessions?.length > 0 &&
        boardgame.sessions.map((session) =>
          session.players.map((player,i) => (
            <p key={i}>
              {player.player} points:{player.points}
            </p>
          ))
        )}
    </div>
  );
}

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
      const fields = [{ player: "", points: 0 }]
      const newSessions = boardgame.sessions
      newSessions.push(data.session);
      setBoardgame(prev=> prev, {sessions:newSessions})
      setInputFields(fields)
      setModleToggle(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>log play</h2>
      {inputFields.map((input, idx) => (
        <div key={idx}>
          <input
            type="text"
            name={`player`}
            onChange={(e) => handleChange(e, idx)}
            placeholder={`player ${idx + 1}`}
            value={input.player}
          />
          <input
            type="text"
            name={`points`}
            onChange={(e) => handleChange(e, idx)}
            value={input.points}
            placeholder={`points`}
          />
          <span onClick={() => removePlayer(idx)}>X</span>
        </div>
      ))}
      <span onClick={addPlayer}>Add</span>

      <button>Submit</button>
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
