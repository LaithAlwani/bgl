"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";
import connectToDB from "@/utils/database";

export default function CreateLeague() {
  const [boardgame, setBoardgame] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(16);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ boardgame, maxPlayers, startDate, endDate });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ boardgame, startDate, endDate }),
      });
      if (res.ok) {
        router.push("/leagues");
        const data = await res.json();
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <span>Boardgame</span>
        <select
          defaultValue="660f0bea9bae3f27688fab27"
          onChange={(e) => setBoardgame(e.target.value)}>
          <option value="660f0bea9bae3f27688fab27">Azul</option>
          <option value="66142ca55090ce47f485e7d0">Cascadia</option>
          <option value="660f07fe9bae3f27688fab0c">Catan</option>
          <option value="660f0a4c9bae3f27688fab17">Carcassone</option>
          <option value="660f0aae9bae3f27688fab19">Wingspan</option>
        </select>
      </div>
      {/* <Input name="Max. Players" type="number" value={maxPlayers} method={setMaxPlayers} /> */}
      <Input name="Start Date" type="date" value={startDate} method={setStartDate} />
      <Input name="End Date" type="date" value={endDate} method={setEndDate} />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
