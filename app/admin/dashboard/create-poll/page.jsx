'use client'
import Input from "@/components/Input";
import "@/styles/contact.css"
import { useState } from "react";

export default function CreatePollPage() {
  const [pollTitle, setPollTitle] = useState("")
  const [pollTitleError, setPollTitleError] = useState("")
  const [pollItems, setPollItems] = useState([""]);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitting");
  }

  return (
    <div className='flex-page'>
      <h1>Create a poll</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="Poll Name"
          type="text"
          method={setPollTitle}
          value={pollTitle}
          error={pollTitleError}
          setError={setPollTitleError}
        />
        {pollItems && pollItems.map((item, i)=><Input type="text" name={`item ${i+1}`}/>)}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
