"use client";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  
  return (
    <nav>
      <div
        className={`mobile-nav-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="burger-icon"></div>
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <Link href="/leagues">Leagues</Link>
          {!isSignedIn ? (
            <SignInButton className="btn" />
          ) : (
            <>
              <Link href="/profile" className="profile">
              {user.username} <img src={user.imageUrl} className="avatar" /> 
              </Link>
              <SignOutButton className=" btn btn-primary" />
            </>
          )}
        </div>
      </div>
      <Link href="/">BGL</Link>
      {/* <h3>BGL</h3> */}
    </nav>
  );
}
