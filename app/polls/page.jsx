"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PollsPage() {
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

  const SubmitVote = async (poll_id, item_id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ poll_id, item_id }),
    });
    if (res.ok) {
      toast.success("Votes submitted");
      window.location.reload();
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
            {console.log(polls)}
            <h2>{poll.title}</h2>
            <ul>
              {poll.items.map((item) => (
                <li key={item._id} onClick={() => SubmitVote(poll._id, item._id)}>
                  <span>{item.name}</span> <span>{item.votes}</span>
                </li>
              ))}
            </ul>
            <span>Total {poll.total_votes}</span>
          </div>
        ))}
    </>
  );
}
