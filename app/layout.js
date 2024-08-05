import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareYoutube, FaXTwitter } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Districts | Home",
  description: "Take your bord game to the next level!",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "Laith Alwani",
      url: "https://www.laithalwani.ca",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <Toaster />
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
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
        <a href="https://www.facebook.com/GameDistricts/" aria-label="Facebook page">
          <FaFacebookF size={size} />
        </a>
        <a href="https://www.instagram.com/game_districts/">
          <FaInstagram size={size} aria-label="Instagram page" />
        </a>
        {/* <a href="#">
          <FaSquareYoutube size={size} aria-label="Linkedin page" />
        </a>
        <a href="#">
          <FaXTwitter size={size} aria-label="X page" />
        </a> */}
      </div>

      <span className="copy-right">&copy;2016 Ottawa, ON.</span>
    </footer>
  );
};
