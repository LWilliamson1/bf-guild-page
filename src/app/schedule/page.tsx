import { getScheduleEvents } from "@/lib/data";
import WoWCalendar from "@/components/WoWCalendar";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const events = await getScheduleEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div
          style={{
            color: "#c8a951",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Belligerent Fury
        </div>
        <h1
          className="wow-heading"
          style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          Raid Schedule
        </h1>
        <p
          style={{
            color: "#8892a4",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Our weekly raid calendar. Click any day to see scheduled events, or browse
          upcoming events in the sidebar.
        </p>
      </div>

      {/* Weekly overview bar */}
      <div
        style={{
          background: "linear-gradient(180deg, #14120e 0%, #100e0a 100%)",
          border: "1px solid #2e2518",
          borderRadius: "4px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {[
          { day: "Tuesday", event: "Heroic Progression", time: "8–11 PM", color: "#c8a951" },
          { day: "Thursday", event: "Heroic / Mythic", time: "8–11 PM", color: "#a330c9" },
          { day: "Saturday", event: "M+ Push Night", time: "7–11 PM", color: "#3fc7eb" },
          { day: "Sunday", event: "Alt / Fun Run", time: "6–9 PM", color: "#00ff98" },
        ].map((s) => (
          <div
            key={s.day}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: s.color,
                boxShadow: `0 0 6px ${s.color}60`,
              }}
            />
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#e8dfc8" }}>{s.day}</div>
              <div style={{ fontSize: "0.65rem", color: "#6a5a3a" }}>
                {s.event} · {s.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <WoWCalendar events={events} />

      {/* Server time note */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.75rem",
          color: "#4a4030",
          letterSpacing: "0.05em",
        }}
      >
        All times listed in Server Time (ST). Be online 15 minutes before raid start for invites.
      </div>
    </div>
  );
}
