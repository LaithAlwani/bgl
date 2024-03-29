"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function CreatePollForms() {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [itemNumbers, setItemNumbers] = useState(1);
  const router = useRouter();

  const handleClick = (value) => {
    setItemNumbers((prevState) => prevState + value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInputs = []
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        newInputs.push({item:inputs[key], votes:0});
      }
    }
    console.log(newInputs);
    try {
      const res = await fetch("http://localhost:3000/api/polls", {
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
      <div>
        {Array.from(Array(itemNumbers), (e, i) => (
          <div key={i}>
            <input
              name={`item${i + 1}`}
              
              value={inputs[`item${i + 1}`] || ""}
              placeholder={`item ${i + 1}`}
              onChange={handleChange}
            />
            {i > 0 && (
              <MdOutlineDeleteForever color="red" size={24} onClick={() => handleClick(-1)} />
            )}
          </div>
        ))}
      </div>
      <button className="btn " type="button" onClick={() => handleClick(1)}>
        Add item
      </button>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
