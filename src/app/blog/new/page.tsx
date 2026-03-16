"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Plus, X } from "lucide-react";

const WOW_CLASSES = [
  "Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter",
  "Mage", "Monk", "Paladin", "Priest", "Rogue",
  "Shaman", "Warlock", "Warrior",
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Zhath",
    authorClass: "Demon Hunter",
    date: new Date().toISOString().split("T")[0],
    tagInput: "",
    tags: [] as string[],
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (field === "title") {
      setForm((p) => ({
        ...p,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      }));
    }
  }

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
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.content,
          author: form.author,
          authorClass: form.authorClass,
          date: form.date,
          tags: form.tags,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create post");
      }

      const data = await res.json();
      router.push(`/blog/${data.post.slug}`);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Guild News
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#e8dfc8" }}>New Blog Post</h1>
      </div>

      {status === "error" && (
        <div
          style={{
            background: "rgba(196,30,58,0.1)",
            border: "1px solid rgba(196,30,58,0.3)",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            color: "#ff6b6b",
            fontSize: "0.875rem",
          }}
        >
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="wow-card" style={{ padding: "2rem", borderRadius: "4px" }}>
        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Title <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <input className="wow-input" placeholder="Post title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            URL Slug <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <input
            className="wow-input"
            placeholder="url-friendly-slug"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            required
            style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
          />
        </div>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Excerpt <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <textarea
            className="wow-input"
            rows={2}
            placeholder="Brief summary shown on the blog list page"
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Full Content <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <textarea
            className="wow-input"
            rows={10}
            placeholder="Full post content. Separate paragraphs with blank lines."
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Author <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <input className="wow-input" value={form.author} onChange={(e) => set("author", e.target.value)} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Class
            </label>
            <select
              className="wow-input"
              value={form.authorClass}
              onChange={(e) => set("authorClass", e.target.value)}
              style={{ appearance: "none" }}
            >
              {WOW_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Date
            </label>
            <input type="date" className="wow-input" value={form.date} onChange={(e) => set("date", e.target.value)} style={{ colorScheme: "dark" }} />
          </div>
        </div>

        <div className="mb-8">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              className="wow-input"
              placeholder="Add tag and press Enter"
              value={form.tagInput}
              onChange={(e) => setForm((p) => ({ ...p, tagInput: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
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
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    background: "rgba(200,169,81,0.1)", border: "1px solid rgba(200,169,81,0.25)",
                    color: "#c8a951", fontSize: "0.75rem", padding: "0.2rem 0.6rem",
                  }}
                >
                  {t}
                  <button type="button" onClick={() => removeTag(t)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a7035", padding: 0, display: "flex" }}>
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button type="button" onClick={() => router.back()} className="btn-wow" style={{ fontSize: "0.875rem" }}>
            Cancel
          </button>
          <button type="submit" className="btn-wow-primary" disabled={status === "submitting"} style={{ opacity: status === "submitting" ? 0.7 : 1 }}>
            {status === "submitting" ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
