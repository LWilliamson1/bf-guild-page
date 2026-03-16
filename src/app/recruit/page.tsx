"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, ChevronDown } from "lucide-react";

const WOW_CLASSES = [
  "Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter",
  "Mage", "Monk", "Paladin", "Priest", "Rogue",
  "Shaman", "Warlock", "Warrior",
];

const CLASS_COLOR: Record<string, string> = {
  "Death Knight": "#c41e3a",
  "Demon Hunter": "#a330c9",
  "Druid": "#ff7c0a",
  "Evoker": "#33937f",
  "Hunter": "#aad372",
  "Mage": "#3fc7eb",
  "Monk": "#00ff98",
  "Paladin": "#f48cba",
  "Priest": "#cccccc",
  "Rogue": "#fff468",
  "Shaman": "#0070dd",
  "Warlock": "#8788ee",
  "Warrior": "#c79c6e",
};

const initialForm = {
  characterName: "",
  realm: "",
  faction: "Alliance" as "Alliance" | "Horde",
  characterClass: "",
  spec: "",
  ilvl: "",
  raiderio: "",
  warcraftlogs: "",
  experience: "",
  availability: "",
  aboutYou: "",
  referral: "",
};

export default function RecruitPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div
          style={{
            width: 72,
            height: 72,
            background: "rgba(0,255,152,0.1)",
            border: "1px solid rgba(0,255,152,0.3)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <CheckCircle size={36} style={{ color: "#00ff98" }} />
        </div>
        <h1 className="wow-heading" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Application Received!
        </h1>
        <p style={{ color: "#8892a4", lineHeight: 1.7, marginBottom: "2rem" }}>
          Thank you for applying to Belligerent Fury. Zhath or one of our officers will review
          your application and reach out within 48 hours. Check your in-game mail and Discord.
        </p>
        <button
          className="btn-wow-primary"
          onClick={() => setStatus("idle")}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-12">
        <div style={{ color: "#c8a951", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Join Belligerent Fury
        </div>
        <h1 className="wow-heading" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Recruitment Application
        </h1>
        <p style={{ color: "#8892a4", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          We welcome skilled players of all factions. Fill out the form below and
          Zhath or an officer will contact you within 48 hours.
        </p>
      </div>

      {/* Requirements box */}
      <div
        className="wow-card"
        style={{ padding: "1.25rem", borderRadius: "4px", marginBottom: "2rem", borderLeft: "3px solid #c8a951" }}
      >
        <div style={{ color: "#c8a951", fontWeight: 600, marginBottom: "0.5rem" }}>Before You Apply</div>
        <ul style={{ color: "#8892a4", fontSize: "0.875rem", lineHeight: 2, paddingLeft: "1.25rem" }}>
          <li>Raid days: Tuesday & Thursday, 8–11 PM Server Time</li>
          <li>Minimum item level varies by role — ask in Discord if unsure</li>
          <li>Discord required for voice communication during raids</li>
          <li>All factions and classes are considered</li>
        </ul>
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
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="wow-card" style={{ padding: "2rem", borderRadius: "4px" }}>
        <h2 style={{ color: "#c8a951", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem", borderBottom: "1px solid #1e2230", paddingBottom: "0.75rem" }}>
          Character Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>
              Character Name <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <input
              className="wow-input"
              placeholder="e.g. Zhath"
              value={form.characterName}
              onChange={(e) => set("characterName", e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>
              Realm <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <input
              className="wow-input"
              placeholder="e.g. Antonidas"
              value={form.realm}
              onChange={(e) => set("realm", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Faction */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>
              Faction <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <div className="flex gap-2">
              {(["Alliance", "Horde"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => set("faction", f)}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    background: form.faction === f
                      ? f === "Alliance" ? "rgba(0,112,221,0.2)" : "rgba(196,30,58,0.2)"
                      : "#0a0c10",
                    border: form.faction === f
                      ? `1px solid ${f === "Alliance" ? "#0070dd" : "#c41e3a"}`
                      : "1px solid #2a3040",
                    color: form.faction === f
                      ? f === "Alliance" ? "#60a8f0" : "#ff6b6b"
                      : "#8892a4",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {f === "Alliance" ? "⚔ Alliance" : "🔥 Horde"}
                </button>
              ))}
            </div>
          </div>

          {/* Class */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>
              Class <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                className="wow-input"
                value={form.characterClass}
                onChange={(e) => set("characterClass", e.target.value)}
                required
                style={{
                  appearance: "none",
                  color: form.characterClass ? (CLASS_COLOR[form.characterClass] || "#e8dfc8") : "#4a5568",
                  paddingRight: "2rem",
                }}
              >
                <option value="" disabled>Select class</option>
                {WOW_CLASSES.map((c) => (
                  <option key={c} value={c} style={{ color: CLASS_COLOR[c] || "#e8dfc8", background: "#0a0c10" }}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#8892a4", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Spec */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>
              Main Spec <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <input
              className="wow-input"
              placeholder="e.g. Havoc"
              value={form.spec}
              onChange={(e) => set("spec", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Item Level <span style={{ color: "#c41e3a" }}>*</span>
            </label>
            <input
              className="wow-input"
              placeholder="e.g. 636"
              value={form.ilvl}
              onChange={(e) => set("ilvl", e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Raider.io Profile URL
            </label>
            <input
              className="wow-input"
              placeholder="https://raider.io/..."
              value={form.raiderio}
              onChange={(e) => set("raiderio", e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
              Warcraft Logs URL
            </label>
            <input
              className="wow-input"
              placeholder="https://www.warcraftlogs.com/..."
              value={form.warcraftlogs}
              onChange={(e) => set("warcraftlogs", e.target.value)}
            />
          </div>
        </div>

        <h2 style={{ color: "#c8a951", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem", borderBottom: "1px solid #1e2230", paddingBottom: "0.75rem" }}>
          Raid Experience
        </h2>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Raiding Experience <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <textarea
            className="wow-input"
            rows={4}
            placeholder="Describe your raiding history — current tier progress, previous tiers, CE achievements, etc."
            value={form.experience}
            onChange={(e) => set("experience", e.target.value)}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="mb-8">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Availability <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <input
            className="wow-input"
            placeholder="Can you make Tue/Thu 8–11 PM ST? Any schedule constraints?"
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
            required
          />
        </div>

        <h2 style={{ color: "#c8a951", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem", borderBottom: "1px solid #1e2230", paddingBottom: "0.75rem" }}>
          About You
        </h2>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Tell Us About Yourself <span style={{ color: "#c41e3a" }}>*</span>
          </label>
          <textarea
            className="wow-input"
            rows={5}
            placeholder="Why do you want to join Belligerent Fury? What do you bring to the team beyond your character sheet?"
            value={form.aboutYou}
            onChange={(e) => set("aboutYou", e.target.value)}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="mb-8">
          <label style={{ display: "block", fontSize: "0.8rem", color: "#8892a4", marginBottom: "0.4rem" }}>
            Referred By (Optional)
          </label>
          <input
            className="wow-input"
            placeholder="Guild member who referred you, if any"
            value={form.referral}
            onChange={(e) => set("referral", e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-wow-primary"
            disabled={status === "submitting"}
            style={{ opacity: status === "submitting" ? 0.7 : 1 }}
          >
            {status === "submitting" ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
