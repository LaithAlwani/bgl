"use client";
import { useEffect, useState } from "react";

export default function page() {
  const [polls, setPolls] = useState([]);

  const getPolls = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      setPolls([]);
      data.forEach((item) => {
        setPolls((prevState) => [...prevState, item]);
      });
    }
  };

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <>
      <h1>Current Polls</h1>
      {polls.length > 0 &&
        polls.map((poll) => (
          <div key={poll._id}>
            
            <h2>{poll.title}</h2>
            <ul>
              {poll.items.map((item, i)=>(
                <li key={i}>
                  <span>{(item.item)}</span> <span>{item.votes}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      
    </>
  );
}
