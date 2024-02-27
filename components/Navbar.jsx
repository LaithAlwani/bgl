import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        {/* <Link href="/">BGL</Link> */}
        <h3>BGL</h3>
      </div>
      <div className="nav-links">
        <Link href="/leagues">Leagues</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
        <Link href="/leagues">Profile</Link>
      </div>
    </nav>
  );
}
