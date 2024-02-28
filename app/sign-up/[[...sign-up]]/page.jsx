import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <div className="flex-page">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
