"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";

export default function CreateLeague() {
  const [title, setTitle] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(16);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, items: newInputs }),
      });
      if (res.ok) {
        router.push("/polls");
        setTitle("");
        setInputs({});
        console.log(res.message);
        toast.success(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="Boardgame" type="text" value={title} method={setTitle} />
      <Input name="Max. Players" type="number" value={maxPlayers} method={setMaxPlayers} />
      <Input name="Start Date" type="date" value={startDate} method={setStartDate} />
      <Input name="End Date" type="date" value={endDate} method={setEndDate} />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
