import { SignUp } from "@clerk/nextjs";
import React from "react";

export const metadata = {
  title: "Meeple Nation | Sign Up",
  description: "Sign up to Meeple Nations and take your gaming to the next level",
};

function SignUpPage() {
  return (
    <div className="flex-page">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
