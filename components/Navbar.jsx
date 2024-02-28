"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  
  return (
    <nav>
      <div
        className={`mobile-nav-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="burger-icon"></div>
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <ActiveLink name="Home" path="/" setIsMenuOpen={setIsMenuOpen} />
          {isSignedIn && (
            <ActiveLink name="Dashboard" path="/dashboard" setIsMenuOpen={setIsMenuOpen} />
          )}
          <ActiveLink name="Leagues" path="/leagues" setIsMenuOpen={setIsMenuOpen} />
          {!isSignedIn && (
            <>
              <ActiveLink name="Sign In" path="/sign-in" setIsMenuOpen={setIsMenuOpen} />
              <ActiveLink name="Sign Up" path="/sign-up" setIsMenuOpen={setIsMenuOpen} />
            </>
          )}
          <ActiveLink name="About" path="/about" setIsMenuOpen={setIsMenuOpen} />
          <ActiveLink name="Contact" path="/contact" setIsMenuOpen={setIsMenuOpen} />

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <Link href="/" onClick={() => setIsMenuOpen(false)} className="logo">
        BGL
      </Link>
    </nav>
  );
}

const ActiveLink = ({ name, path, setIsMenuOpen }) => {
  const pathname = usePathname();
  const active = pathname === path ? "active" : "";
  return (
    <Link href={path} className={active} onClick={() => setIsMenuOpen(false)}>
      {name}
    </Link>
  );
};
