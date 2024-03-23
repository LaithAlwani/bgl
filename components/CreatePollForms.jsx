'use client'
import { useState } from "react";

export default function CreatePollForms() {
  const [inputs, setInputs] = useState({});
  const [itemNumbers, setItemNumbers] = useState(1);
  const handleClick = () => {
    setItemNumbers((prevState) => prevState + 1);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Poll Title"
        value={inputs.title || ""}
        onChange={handleChange}
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
