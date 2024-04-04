"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateBoardgameForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bggLink, setBggLink] = useState("");
  const [minPlayers, setMinPlayers] = useState();
  const [maxPlayers, setMaxPlayers] = useState();
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boardgames`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, image, thumbnail, bggLink, minPlayers, maxPlayers, desc }),
      });
      if (res.ok) {
        const data = await res.json()
        toast.success(data.message);
        router.push("/admin/create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Boardgame Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image string"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Thumbnail string"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <input
        type="text"
        placeholder="BGG Link"
        value={bggLink}
        onChange={(e) => setBggLink(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min. Players"
        value={minPlayers}
        onChange={(e) => setMinPlayers(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max. Players"
        value={maxPlayers}
        onChange={(e) => setMaxPlayers(e.target.value)}
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Description"></textarea>
      <button className="btn " type="button" onClick={() => handleClick(1)}>
        Add item
      </button>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
