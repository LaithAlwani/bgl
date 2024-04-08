"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";

export default function CreateBoardgameForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bggLink, setBggLink] = useState("");
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(5);
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
        const data = await res.json();
        toast.success(data.message);
        router.push("/admin/create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="Boardgame Title" type="text" value={title} method={setTitle} />
      <Input name="Image" type="text" value={image} method={setImage} />
      <Input name="Thumbnail" type="text" value={thumbnail} method={setThumbnail} />
      <Input name="BGG Link" type="text" value={bggLink} method={setBggLink} />
      <Input name="Max. Players" type="number" value={minPlayers} method={setMinPlayers} />
      <Input name="Max. Players" type="number" value={maxPlayers} method={setMaxPlayers} />
      <Input name="Description" type="textarea" value={desc} method={setDesc} />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
