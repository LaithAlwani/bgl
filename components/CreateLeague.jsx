"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function CreateLeague() {
  const [title, setTitle] = useState("");
  const [maxNumPlayers, setMaxNumPlayers] = useState(16);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`, {
        method: "POST",
        headers: {
          "Content-type":"application/json"
        },
        body:JSON.stringify({title, items:newInputs})
      })
      if (res.ok) {
        router.push("/polls");
        setTitle("");
        setInputs({});
        console.log(res.message)
        toast.success(res.message);
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="title"
        type="number"
        placeholder="Max. Players"
        value={maxNumPlayers}
        onChange={(e) => setMaxNumPlayers(e.target.value)}
      />
      <button className="btn " type="button" onClick={() => handleClick(1)}>
        Add item
      </button>
      <button className="btn btn-primary">Submit</button>
    </form>
  )
}
