"use client";
import { useEffect } from "react";

// export const metadata = {
//   title: "Game Districts | Leagues",
//   description: "League leaders, upcoming leagues and game sessions",
// };

const getLeagues = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues`);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  }
};
export default function page() {
  useEffect(() => {
    getLeagues();
  }, []);

  return (
    <div className="page">
      <h1>Leagues</h1>
    </div>
  );
}
