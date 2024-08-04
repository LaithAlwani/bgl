"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";
import { XMLParser } from "fast-xml-parser";


export default function CreateBoardgameForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bggLink, setBggLink] = useState("");
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [desc, setDesc] = useState("");
  const [boardgames, setBoardgames] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(boardgames)
    try {
      const res = await fetch("/api/boardgames", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({boardgames}),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        router.push("/boardgames");
      }
    } catch (err) {
      console.log(err);
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
          console.log(item);
          // const exp = item.link.filter((link) => link["@_type"] === "boardgameexpansion");
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
          console.log("please try again");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
    <form onSubmit={getBggGameInfo}>
      {/* <Input name="Boardgame Title" type="text" value={title} method={setTitle} />
      <Input name="Image" type="text" value={image} method={setImage} />
      <Input name="Thumbnail" type="text" value={thumbnail} method={setThumbnail} /> */}
      <Input name="BGG Link" type="text" value={bggLink} method={setBggLink} />
      {/* <Input name="Max. Players" type="number" value={minPlayers} method={setMinPlayers} />
      <Input name="Max. Players" type="number" value={maxPlayers} method={setMaxPlayers} />
      <Input name="Description" type="textarea" value={desc} method={setDesc} /> */}
      <button className="btn btn-primary">Submit</button>
      </form>
      {boardgames.length > 0 && boardgames.map(bg => (
        
        <div key={bg.bggId}>
          <h2>{bg.title}</h2>
          <img src={ bg.thumbnail} alt="" />
        </div>
      )) 
      }
      <button onClick={handleSubmit}>Submit</button>
      </>
  );
}
