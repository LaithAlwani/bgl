"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  
  return (
    <nav className={pathname === "/" ? "transparent" : ""}>
      <Link href="/" onClick={() => setIsMenuOpen(false)} className="logo">
        <Image
          src={pathname === "/" ? "/logo_white.png" : "/logo-min.png"}
          alt="logo"
          width={120}
          height={50}
        />
      </Link>
      <div
        className={`mobile-nav-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`burger-icon ${pathname === "/" ? "white" : ""}`}></div>
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <ActiveLink name="Home" path="/" setIsMenuOpen={setIsMenuOpen} pathname={pathname} />
          {isSignedIn && (
            <ActiveLink
              name="Dashboard"
              path="/dashboard"
              setIsMenuOpen={setIsMenuOpen}
              pathname={pathname}
            />
          )}
          <ActiveLink
            name="Boardgames"
            path="/boardgames"
            setIsMenuOpen={setIsMenuOpen}
            pathname={pathname}
          />
          {!isSignedIn && (
            <>
              <ActiveLink
                name="Sign In"
                path="/sign-in"
                setIsMenuOpen={setIsMenuOpen}
                pathname={pathname}
              />
              <ActiveLink
                name="Sign Up"
                path="/sign-up"
                setIsMenuOpen={setIsMenuOpen}
                pathname={pathname}
              />
            </>
          )}
          <ActiveLink
            name="About"
            path="/about"
            setIsMenuOpen={setIsMenuOpen}
            pathname={pathname}
          />
          <ActiveLink name="F.A.Q." path="/faq" setIsMenuOpen={setIsMenuOpen} pathname={pathname} />
          <ActiveLink
            name="Contact"
            path="/contact"
            setIsMenuOpen={setIsMenuOpen}
            pathname={pathname}
          />

          {user?.publicMetadata.role === "admin" && (
            <ActiveLink
              name="Admin"
              path="/admin"
              setIsMenuOpen={setIsMenuOpen}
              pathname={pathname}
            />
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}

const ActiveLink = ({ name, path, pathname, setIsMenuOpen }) => {
  const active = pathname === path ? "active" : "";
  return (
    <Link href={path} className={`${active}`} onClick={() => setIsMenuOpen(false)}>
      {name}
    </Link>
  );
};
