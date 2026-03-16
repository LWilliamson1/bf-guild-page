import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <div style={{ fontSize: "5rem", fontWeight: 700, color: "#2a2f3d", marginBottom: "1rem" }}>404</div>
      <h1 className="wow-heading" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        Page Not Found
      </h1>
      <p style={{ color: "#8892a4", lineHeight: 1.7, marginBottom: "2rem" }}>
        That page has been lost to the void. Perhaps Sargeras took it.
      </p>
      <Link href="/" className="btn-wow-primary">
        Return to Home
      </Link>
    </div>
  );
}
