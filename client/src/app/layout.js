import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShortlistProvider } from "@/context/ShortlistContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EmptyCup",
  description: "EmptyCup project create sucessfully",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mobile-container`}
      >
        <ShortlistProvider>
          <Navbar></Navbar>
          <Hero></Hero>
          {children}
          <ToastContainer />
        </ShortlistProvider>
      </body>
    </html>
  );
}
