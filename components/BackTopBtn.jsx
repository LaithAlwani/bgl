"use client";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

export default function BackTopBtn() {
  const [atTop, setAtTop] = useState(true);

  const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setAtTop(true);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) setAtTop(false);
      else setAtTop(true);
    };

    return () => (window.onscroll = null);
  }, []);

  return (
    <button
      className={`back-top-btn ${atTop ? "" : "show-btn"}`}
      onClick={backToTop}
      aria-label="back to top">
      <FaAngleUp size={24} />
    </button>
  );
}