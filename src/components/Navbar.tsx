"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Swords } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/blog", label: "News" },
  { href: "/gallery", label: "Conquests" },
  { href: "/recruit", label: "Recruit" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: "rgba(8,9,12,0.97)", borderBottom: "1px solid #1e2230" }}>
      {/* Gold top accent */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #8a7035, #c8a951, #c8a951, #8a7035, transparent)" }} />

      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ height: "64px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #1a0530, #2a0840)",
              border: "1px solid #a330c9",
              borderRadius: "4px",
            }}
          >
            <Swords size={18} style={{ color: "#a330c9" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", color: "#c8a951", lineHeight: 1.1 }}>
              Belligerent Fury
            </div>
            <div style={{ fontSize: "0.65rem", color: "#8892a4", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Antonidas
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                color: pathname === l.href ? "#c8a951" : "#8892a4",
                borderBottom: pathname === l.href ? "1px solid #c8a951" : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Recruit CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/recruit" className="btn-wow-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1.2rem" }}>
            Join the Guild
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ color: "#c8a951", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{ background: "#0a0b0e", borderTop: "1px solid #1e2230", padding: "1rem" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 nav-link"
              style={{
                color: pathname === l.href ? "#c8a951" : "#8892a4",
                borderBottom: "1px solid #1e2230",
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/recruit"
            className="btn-wow-primary block text-center mt-4"
            style={{ fontSize: "0.875rem" }}
            onClick={() => setOpen(false)}
          >
            Join the Guild
          </Link>
        </div>
      )}
    </header>
  );
}
