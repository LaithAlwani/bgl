import { SignIn } from "@clerk/nextjs";
import React from "react";

export const metadata = {
  title: "Game Districts | Sign In",
  description: "Sign in to meeple Nations, check your game schdule and stats",
};

export default function SignInPage() {
  return (
    <div className="flex-page page">
      <SignIn />
    </div>
  );
}
