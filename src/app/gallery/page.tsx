import { getGalleryItems } from "@/lib/data";
import { Calendar, Image as ImageIcon, Tag } from "lucide-react";
import GalleryUploadForm from "@/components/GalleryUploadForm";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Hall of Glory
        </div>
        <h1 className="wow-heading" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Guild Conquests
        </h1>
        <p style={{ color: "#8892a4", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
          A chronicle of Belligerent Fury&apos;s greatest victories — bosses felled, milestones reached,
          and memories forged on Antonidas.
        </p>
      </div>

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#8892a4" }}>
          <ImageIcon size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
          <p>No gallery items yet. Post a conquest!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((item) => (
            <div key={item.id} className="wow-card" style={{ borderRadius: "4px", overflow: "hidden" }}>
              {/* Image placeholder */}
              <div
                style={{
                  aspectRatio: "16/9",
                  background: "linear-gradient(135deg, #0e0d18, #141020)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid #1e2230",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at center, rgba(163,48,201,0.08) 0%, transparent 70%)",
                  }}
                />
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <ImageIcon size={32} style={{ color: "#3a3f50", margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.7rem", color: "#3a3f50", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Screenshot
                  </p>
                </div>
              </div>

              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e8dfc8", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#8892a4", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.2rem",
                        background: "rgba(200,169,81,0.08)",
                        border: "1px solid rgba(200,169,81,0.15)",
                        color: "#c8a951",
                        fontSize: "0.65rem",
                        padding: "0.1rem 0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <Tag size={8} />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "#6a7480" }}>
                  <Calendar size={11} />
                  {new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Conquest Section */}
      <div style={{ borderTop: "1px solid #1e2230", paddingTop: "3rem" }}>
        <div className="text-center mb-8">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e8dfc8", marginBottom: "0.5rem" }}>
            Add a <span style={{ color: "#c8a951" }}>New Conquest</span>
          </h2>
          <p style={{ color: "#8892a4", fontSize: "0.875rem" }}>
            Officers and members can log new guild achievements here.
          </p>
        </div>
        <GalleryUploadForm />
      </div>
    </div>
  );
}
