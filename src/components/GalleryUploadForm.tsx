"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Plus, X } from "lucide-react";

export default function GalleryUploadForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    tagInput: "",
    tags: [] as string[],
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function addTag() {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((p) => ({ ...p, tags: [...p.tags, t], tagInput: "" }));
    }
  }

  function removeTag(tag: string) {
    setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          date: form.date,
          tags: form.tags,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add item");
      }

      setStatus("success");
      setForm({ title: "", description: "", date: new Date().toISOString().split("T")[0], tagInput: "", tags: [] });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="wow-card" style={{ maxWidth: "640px", margin: "0 auto", padding: "2rem", borderRadius: "4px" }}>
      {status === "success" && (
        <div
          style={{
            background: "rgba(0,255,152,0.08)",
            border: "1px solid rgba(0,255,152,0.25)",
            borderRadius: "4px",
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            color: "#00cc80",
            fontSize: "0.875rem",
          }}
        >
          <CheckCircle size={16} /> Conquest added successfully!
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            background: "rgba(196,30,58,0.08)",
            border: "1px solid rgba(196,30,58,0.25)",
            borderRadius: "4px",
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            color: "#ff6b6b",
            fontSize: "0.875rem",
          }}
        >
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <div className="mb-4">
        <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
          Title <span style={{ color: "#c41e3a" }}>*</span>
        </label>
        <input
          className="wow-input"
          placeholder="e.g. Heroic Queen Ansurek Kill"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
        />
      </div>

      <div className="mb-4">
        <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
          Description <span style={{ color: "#c41e3a" }}>*</span>
        </label>
        <textarea
          className="wow-input"
          rows={3}
          placeholder="Brief description of the achievement..."
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="mb-4">
        <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
          Date <span style={{ color: "#c41e3a" }}>*</span>
        </label>
        <input
          type="date"
          className="wow-input"
          value={form.date}
          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          required
          style={{ colorScheme: "dark" }}
        />
      </div>

      <div className="mb-6">
        <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            className="wow-input"
            placeholder="Add a tag and press Enter"
            value={form.tagInput}
            onChange={(e) => setForm((p) => ({ ...p, tagInput: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={addTag} className="btn-wow" style={{ padding: "0.5rem 0.75rem" }}>
            <Plus size={16} />
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  background: "rgba(200,169,81,0.1)",
                  border: "1px solid rgba(200,169,81,0.25)",
                  color: "#c8a951",
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.6rem",
                }}
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#8a7035", padding: 0, display: "flex" }}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-wow-primary"
          disabled={status === "submitting"}
          style={{ opacity: status === "submitting" ? 0.7 : 1 }}
        >
          {status === "submitting" ? "Adding..." : "Add Conquest"}
        </button>
      </div>
    </form>
  );
}
