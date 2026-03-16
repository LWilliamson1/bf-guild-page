import Link from "next/link";
import { Swords } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#080909", borderTop: "1px solid #1e2230", marginTop: "5rem" }}>
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #8a7035, #c8a951, #8a7035, transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Swords size={20} style={{ color: "#a330c9" }} />
              <span style={{ color: "#c8a951", fontWeight: 700, letterSpacing: "0.05em" }}>Belligerent Fury</span>
            </div>
            <p style={{ color: "#8892a4", fontSize: "0.875rem", lineHeight: 1.7 }}>
              A mixed-faction raiding guild on Antonidas. United by fury, bound by glory.
            </p>
            <p style={{ color: "#6a7480", fontSize: "0.75rem", marginTop: "0.75rem" }}>
              Guild Master:{" "}
              <span style={{ color: "#a330c9" }}>Zhath</span>{" "}
              <span style={{ color: "#6a7480" }}>(Demon Hunter)</span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ color: "#c8a951", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Quick Links
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Guild News" },
                { href: "/gallery", label: "Conquest Gallery" },
                { href: "/recruit", label: "Apply to Join" },
              ].map((l) => (
                <li key={l.href} style={{ marginBottom: "0.4rem" }}>
                  <Link href={l.href} style={{ color: "#8892a4", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                    className="nav-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div style={{ color: "#c8a951", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Raid Info
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#8892a4", fontSize: "0.875rem" }}>
              <li style={{ marginBottom: "0.4rem" }}>Server: <span style={{ color: "#e8dfc8" }}>Antonidas (US)</span></li>
              <li style={{ marginBottom: "0.4rem" }}>Faction: <span style={{ color: "#e8dfc8" }}>Mixed (Both)</span></li>
              <li style={{ marginBottom: "0.4rem" }}>Raid Days: <span style={{ color: "#e8dfc8" }}>Tue / Thu</span></li>
              <li style={{ marginBottom: "0.4rem" }}>Raid Time: <span style={{ color: "#e8dfc8" }}>8–11 PM ST</span></li>
              <li>Focus: <span style={{ color: "#e8dfc8" }}>Progression + M+</span></li>
            </ul>
          </div>
        </div>

        <div className="wow-divider" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p style={{ color: "#4a5568", fontSize: "0.75rem" }}>
            &copy; {new Date().getFullYear()} Belligerent Fury — Antonidas. All rights reserved.
          </p>
          <p style={{ color: "#4a5568", fontSize: "0.75rem" }}>
            World of Warcraft is a trademark of Blizzard Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
