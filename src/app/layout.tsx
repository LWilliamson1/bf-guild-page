import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Belligerent Fury – Antonidas",
  description:
    "Official guild page for Belligerent Fury, a mixed-faction raiding guild on Antonidas. Led by Zhath (Demon Hunter). Recruiting now!",
  openGraph: {
    title: "Belligerent Fury – Antonidas",
    description: "Mixed-faction WoW raiding guild on Antonidas. Heroic & Mythic progression.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0b0e", color: "#e8dfc8", fontFamily: "Georgia, serif", margin: 0 }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
