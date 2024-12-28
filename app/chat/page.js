"use client";
import { useChat } from "ai/react";
export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="page">
      <div className="">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className=""
            value={input}
            placeholder="Ask a board game related question!"
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
