"use client";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  return (
    <nav>
      <div
        className={`mobile-nav-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="burger-icon"></div>
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            href="/"
            className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            href="/leagues"
            className={pathname === "/leagues" ? "active" : ""}>
            Leagues
          </Link>
          {!isSignedIn ? (
            <SignInButton className="btn" />
          ) : (
            <>
              <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/my-leagues"
                className={pathname === "/my-leagues" ? "active" : ""}>
                My Leagues
              </Link>

              <UserButton />
            </>
          )}
        </div>
      </div>
      <Link href="/" onClick={()=>setIsMenuOpen(false)}>BGL</Link>
      {/* <h3>BGL</h3> */}
    </nav>
  );
}
