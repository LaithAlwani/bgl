import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackTopBtn from "@/components/BackTopBtn";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareYoutube, FaXTwitter } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BGL | Home",
  description: "Take your bord game to the next level!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <Toaster />
          <main>{children}</main>
          <Footer />
          <BackTopBtn />
        </body>
      </html>
    </ClerkProvider>
  );
}

const Footer = () => {
  const size = 24;
  return (
    <footer>
      <div className="social-links">
        <a href="#" aria-label="Facebook page">
          <FaFacebookF size={size} />
        </a>
        <a href="#">
          <FaInstagram size={size} aria-label="Instagram page" />
        </a>
        <a href="#">
          <FaSquareYoutube size={size} aria-label="Linkedin page" />
        </a>
        <a href="#">
          <FaXTwitter size={size} aria-label="X page" />
        </a>
      </div>

      <span className="copy-right">&copy;2024 Ottawa, ON.</span>
    </footer>
  );
};
