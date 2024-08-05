"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";
import { XMLParser } from "fast-xml-parser";

export default function CreateBoardgameForm() {
  const [bggLink, setBggLink] = useState("");
  const [boardgames, setBoardgames] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/boardgames", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ boardgames }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        router.push("/boardgames");
      }
    } catch (err) {
      toast.error(err.message)
    }
  };

  const getBggGameInfo = (e) => {
    e.preventDefault();
    const id = bggLink.split("/")[4];
    fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .then((res) => res.text())
      .then((data) => {
        const parser = new XMLParser({ ignoreAttributes: false });
        const {
          items: { item },
        } = parser.parse(data);
        if (item) {
          // const exps = item.link.filter((link) => link["@_type"] === "boardgameexpansion");
          setBoardgames((prevState) => [
            ...prevState,
            {
              title: item.name[0]
                ? item.name[0]["@_value"].toLowerCase()
                : item.name["@_value"].toLowerCase(),
              thumbnail: item.thumbnail,
              image: item.image,
              isExpansion: item["@_type"] === "boardgameexpansion",
              year: item.yearpublished["@_value"],
              minPlayers: item.minplayers["@_value"],
              maxPlayers: item.maxplayers["@_value"],
              minPlayTime: item.minplaytime["@_value"],
              maxPlayTime: item.maxplaytime["@_value"],
              minAge: item.minage["@_value"],
              description: item.description,
              bggId: id,
            },
          ]);
          setBggLink("");
        } else {
          toast.error("please try again");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <form onSubmit={getBggGameInfo}>
        <Input name="BGG Link" type="text" value={bggLink} method={setBggLink} />
        <button className="btn btn-primary">Get Game</button>
      </form>
      {boardgames.length > 0 &&
        boardgames.map((bg) => (
          <div key={bg.bggId}>
            <h2>{bg.title}</h2>
            <img src={bg.thumbnail} alt="" />
            {bg.isExpansion === true && (
              <select name="" id="">
                <option value="">Catan</option>
              </select>
            )}
            <p>{bg.isExpansion.toString()}</p>
          </div>
        ))}
      {boardgames.length > 0 && <button onClick={handleSubmit} className="btn btn-primary">Add Game</button>}
    </>
  );
}
