"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "./Input";
import Loader from "./Loader";

export const metadata = {
  title: "Meeple Nation | Contact",
  description: "Connet with Meeple Nation",
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const validateFrom = () => {
    if (name && email && subject && message) {
      return true;
    }
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!subject) setSubjectError(true);
    if (!message) setMessageError(true);
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateFrom();
    if (valid) {
      setLoading(true);
      //code for form action
      //setTimeout is there to only behave like an api call
      setTimeout(() => {
        setLoading(false);
        toast.success("Message Sent!");
        resetForm();
      }, 3000);
    } else toast.error("Missing information");
  };

  return (
    <>
      <h3>Contact US</h3>
      <form onSubmit={handleSubmit}>
        <Input
          name="Name"
          type="text"
          method={setName}
          value={name}
          error={nameError}
          setError={setNameError}
        />
        <Input
          name="Email"
          type="email"
          method={setEmail}
          value={email}
          error={emailError}
          setError={setEmailError}
        />
        <Input
          name="Subject"
          type="text"
          method={setSubject}
          value={subject}
          error={subjectError}
          setError={setSubjectError}
        />
        <Input
          name="Message"
          type="textarea"
          method={setMessage}
          value={message}
          error={messageError}
          setError={setMessageError}
        />
        <button
          disabled={loading}
          className={`btn btn-form btn-primary ${loading ? "btn-disabled" : ""}`}>
          {loading ? <Loader size={24} /> : "Submit"}
        </button>
      </form>
    </>
  );
}
