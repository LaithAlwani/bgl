"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePollForms() {
  const [title, setTitle] = useState('')
  const [inputs, setInputs] = useState([]);
  const [itemNumbers, setItemNumbers] = useState(1);
  const router = useRouter();

  const handleClick = () => {
    setItemNumbers((prevState) => prevState + 1);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value, votes:0}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    toast.success(`poll ${title} created`);
    setTitle('');
    setInputs({});
    router.push("/admin/dashboard");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <div>
        {Array.from(Array(itemNumbers), (e, i) => (
          <input
            name={`item${i + 1}`}
            key={i}
            value={inputs[`item${i + 1}`] || ""}
            placeholder={`item ${i + 1}`}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn " type="button" onClick={handleClick}>
        Add item
      </button>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
