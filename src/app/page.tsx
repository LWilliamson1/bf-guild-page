import Link from "next/link";
import { Swords, Shield, Users, Trophy, ChevronRight, Star } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #0e0d18 0%, #0a0b0e 60%, #0a0b0e 100%)",
          borderBottom: "1px solid #1e2230",
          paddingTop: "5rem",
          paddingBottom: "6rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(163,48,201,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(200,169,81,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 text-center fade-in">
          {/* DH eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              background: "rgba(163,48,201,0.1)",
              border: "1px solid rgba(163,48,201,0.3)",
              borderRadius: "20px",
              padding: "0.3rem 1rem",
              fontSize: "0.75rem",
              color: "#a330c9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <Swords size={12} />
            Mixed Faction Guild · Antonidas
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
            className="wow-heading"
          >
            Belligerent Fury
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#8892a4",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Forged in fire, bound by purpose. A home for skilled players across all factions
            who demand excellence and camaraderie in equal measure.
          </p>

          {/* Guild Master callout */}
          <div
            className="inline-flex items-center gap-3 mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(163,48,201,0.15), rgba(100,21,128,0.1))",
              border: "1px solid rgba(163,48,201,0.25)",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #1a0530, #2a0840)",
                border: "1px solid #a330c9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Swords size={16} style={{ color: "#a330c9" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75rem", color: "#8892a4", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Guild Master
              </div>
              <div style={{ fontSize: "1rem", color: "#a330c9", fontWeight: 600 }}>
                Zhath{" "}
                <span style={{ fontSize: "0.8rem", color: "#6a3080" }}>· Demon Hunter</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/recruit" className="btn-wow-primary">
              Apply to Join
            </Link>
            <Link
              href="/gallery"
              className="btn-wow"
              style={{
                padding: "0.6rem 2rem",
                fontSize: "1rem",
              }}
            >
              View Conquests
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#0d0e14", borderBottom: "1px solid #1e2230" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Raid Nights/Week", value: "2", icon: <Shield size={18} /> },
              { label: "Current Tier", value: "TWW S2", icon: <Trophy size={18} /> },
              { label: "Faction", value: "Mixed", icon: <Users size={18} /> },
              { label: "Progression", value: "H / M", icon: <Star size={18} /> },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "1.5rem",
                  borderRight: i < 3 ? "1px solid #1e2230" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#c8a951", marginBottom: "0.4rem", display: "flex", justifyContent: "center" }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e8dfc8", marginBottom: "0.2rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#8892a4", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
              About the Guild
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.25rem", color: "#e8dfc8" }}>
              United Across Factions,<br />
              <span style={{ color: "#c8a951" }}>Driven by Glory</span>
            </h2>
            <p style={{ color: "#8892a4", lineHeight: 1.8, marginBottom: "1rem" }}>
              Belligerent Fury was built on the idea that the best players shouldn&apos;t have to choose
              between faction loyalty and a quality raid team. We accept both Alliance and Horde players,
              building a roster based purely on skill, attitude, and commitment.
            </p>
            <p style={{ color: "#8892a4", lineHeight: 1.8, marginBottom: "2rem" }}>
              Under the leadership of our Guild Master <strong style={{ color: "#a330c9" }}>Zhath</strong>,
              we push Heroic and Mythic content each tier while maintaining a positive, low-drama environment
              where every member is valued.
            </p>
            <div className="flex gap-4">
              <Link href="/recruit" className="btn-wow-primary" style={{ fontSize: "0.875rem" }}>
                Apply Now
              </Link>
              <Link href="/blog" className="btn-wow" style={{ fontSize: "0.875rem" }}>
                Read Our News
              </Link>
            </div>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Heroic & Mythic Progression",
                desc: "We consistently clear Heroic and push Mythic each tier, rewarding dedication with cutting-edge content.",
                icon: <Trophy size={20} style={{ color: "#c8a951" }} />,
              },
              {
                title: "Mixed Faction Welcome",
                desc: "Alliance or Horde — we don't care about your flag, only your play. Both factions raid side by side.",
                icon: <Users size={20} style={{ color: "#c8a951" }} />,
              },
              {
                title: "Skilled & Drama-Free",
                desc: "We expect preparation and performance, but keep the environment supportive and fun for everyone.",
                icon: <Shield size={20} style={{ color: "#c8a951" }} />,
              },
            ].map((v, i) => (
              <div key={i} className="wow-card" style={{ padding: "1.25rem", borderRadius: "4px" }}>
                <div className="flex gap-3 items-start">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(200,169,81,0.08)",
                      border: "1px solid rgba(200,169,81,0.15)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e8dfc8", marginBottom: "0.3rem" }}>{v.title}</div>
                    <div style={{ fontSize: "0.875rem", color: "#8892a4", lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news preview */}
      {latestPosts.length > 0 && (
        <section style={{ background: "#0d0e14", padding: "5rem 0" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Latest Updates
                </div>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#e8dfc8" }}>Guild News</h2>
              </div>
              <Link href="/blog" className="flex items-center gap-1 nav-link">
                All posts <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    className="wow-card"
                    style={{ padding: "1.5rem", borderRadius: "4px", height: "100%" }}
                  >
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          style={{
                            background: "rgba(200,169,81,0.1)",
                            border: "1px solid rgba(200,169,81,0.2)",
                            color: "#c8a951",
                            fontSize: "0.7rem",
                            padding: "0.15rem 0.6rem",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#e8dfc8", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: "#8892a4", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span style={{ fontSize: "0.75rem", color: "#6a7480" }}>
                        By <span style={{ color: "#a330c9" }}>{post.author}</span> · {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span style={{ color: "#c8a951", fontSize: "0.8rem" }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div
          style={{
            background: "linear-gradient(135deg, #0e0818 0%, #110d1a 50%, #0e0b12 100%)",
            border: "1px solid rgba(163,48,201,0.2)",
            borderRadius: "8px",
            padding: "4rem 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(163,48,201,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: "0.75rem", color: "#a330c9", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
            We Are Recruiting
          </div>
          <h2 className="wow-heading" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            Ready to Join the Fury?
          </h2>
          <p style={{ color: "#8892a4", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            We&apos;re looking for skilled players who bring both performance and a positive attitude.
            All classes and factions considered.
          </p>
          <Link href="/recruit" className="btn-wow-primary">
            Submit Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}
