"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Swords,
  Shield,
  Flame,
  PartyPopper,
  X,
  Crown,
} from "lucide-react";
import type { ScheduleEvent } from "@/lib/data";

// ── Helpers ──────────────────────────────────────────

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const RECURRING_MAP: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
};

const CLASS_COLOR: Record<string, string> = {
  "Death Knight": "#c41e3a",
  "Demon Hunter": "#a330c9",
  "Druid": "#ff7c0a",
  "Evoker": "#33937f",
  "Hunter": "#aad372",
  "Mage": "#3fc7eb",
  "Monk": "#00ff98",
  "Paladin": "#f48cba",
  "Priest": "#ffffff",
  "Rogue": "#fff468",
  "Shaman": "#0070dd",
  "Warlock": "#8788ee",
  "Warrior": "#c79c6e",
};

function typeIcon(type: string) {
  switch (type) {
    case "raid": return <Swords size={11} />;
    case "mythicplus": return <Shield size={11} />;
    case "pvp": return <Flame size={11} />;
    case "social": return <PartyPopper size={11} />;
    default: return <Swords size={11} />;
  }
}

function typeLabel(type: string) {
  switch (type) {
    case "raid": return "Raid";
    case "mythicplus": return "Mythic+";
    case "pvp": return "PvP";
    case "social": return "Social";
    default: return type;
  }
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// ── Component ────────────────────────────────────────

interface Props {
  events: ScheduleEvent[];
}

export default function WoWCalendar({ events }: Props) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const prevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) { setCurrentYear((y) => y - 1); return 11; }
      return m - 1;
    });
    setSelectedDay(null);
    setSelectedEvent(null);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) { setCurrentYear((y) => y + 1); return 0; }
      return m + 1;
    });
    setSelectedDay(null);
    setSelectedEvent(null);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today);
    setSelectedEvent(null);
  }, [today]);

  // Build the calendar grid data
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(
      currentMonth === 0 ? currentYear - 1 : currentYear,
      currentMonth === 0 ? 11 : currentMonth - 1
    );

    const cells: { date: Date; inMonth: boolean }[] = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const m = currentMonth === 0 ? 11 : currentMonth - 1;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      cells.push({ date: new Date(y, m, prevMonthDays - i), inMonth: false });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(currentYear, currentMonth, d), inMonth: true });
    }

    // Next month padding (fill to 42 cells = 6 rows)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = currentMonth === 11 ? 0 : currentMonth + 1;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      cells.push({ date: new Date(y, m, d), inMonth: false });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Map events to dates for the current view
  const eventsByDate = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();

    function addEvent(dateStr: string, ev: ScheduleEvent) {
      if (!map.has(dateStr)) map.set(dateStr, []);
      map.get(dateStr)!.push(ev);
    }

    for (const ev of events) {
      if (ev.recurring && RECURRING_MAP[ev.recurring] !== undefined) {
        const dayOfWeek = RECURRING_MAP[ev.recurring];
        for (const cell of calendarDays) {
          if (cell.date.getDay() === dayOfWeek && cell.inMonth) {
            addEvent(cell.date.toISOString().split("T")[0], ev);
          }
        }
      } else if (ev.date) {
        addEvent(ev.date, ev);
      }
    }

    return map;
  }, [events, calendarDays]);

  function getEventsForDate(date: Date): ScheduleEvent[] {
    return eventsByDate.get(date.toISOString().split("T")[0]) || [];
  }

  const selectedDayEvents = selectedDay ? getEventsForDate(selectedDay) : [];

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* ── Calendar Panel ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Parchment container */}
        <div
          style={{
            background: "linear-gradient(180deg, #1a1510 0%, #120f0a 40%, #0e0c08 100%)",
            border: "2px solid #3d3425",
            borderTop: "2px solid #5a4a30",
            borderRadius: "6px",
            boxShadow:
              "0 0 40px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,169,81,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Top ornamental bar */}
          <div
            style={{
              height: "4px",
              background: "linear-gradient(90deg, #3d3425, #8a7035, #c8a951, #c8a951, #8a7035, #3d3425)",
            }}
          />

          {/* ── Month Header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              background: "linear-gradient(180deg, #1e1a12 0%, #161210 100%)",
              borderBottom: "1px solid #2e2518",
            }}
          >
            <button
              onClick={prevMonth}
              style={{
                background: "linear-gradient(180deg, #2a2010 0%, #1a1408 100%)",
                border: "1px solid #4a3a20",
                borderTop: "1px solid #6a5530",
                borderRadius: "3px",
                padding: "0.35rem 0.6rem",
                cursor: "pointer",
                color: "#c8a951",
                display: "flex",
                alignItems: "center",
                transition: "all 0.15s",
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  background: "linear-gradient(180deg, #f0d060 0%, #c8a951 50%, #8a6820 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {MONTH_NAMES[currentMonth]}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#6a5a3a",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                {currentYear}
              </div>
            </div>

            <button
              onClick={nextMonth}
              style={{
                background: "linear-gradient(180deg, #2a2010 0%, #1a1408 100%)",
                border: "1px solid #4a3a20",
                borderTop: "1px solid #6a5530",
                borderRadius: "3px",
                padding: "0.35rem 0.6rem",
                cursor: "pointer",
                color: "#c8a951",
                display: "flex",
                alignItems: "center",
                transition: "all 0.15s",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Today button */}
          <div style={{ padding: "0.5rem 1.25rem 0", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={goToToday}
              style={{
                background: "none",
                border: "1px solid #2e2518",
                borderRadius: "3px",
                padding: "0.2rem 0.75rem",
                color: "#8a7035",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              Today
            </button>
          </div>

          {/* ── Day-of-week Header ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              padding: "0.75rem 1.25rem 0",
            }}
          >
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#6a5a3a",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.4rem 0",
                  borderBottom: "1px solid #1e1a12",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* ── Day Grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              padding: "0 1.25rem 1.25rem",
              gap: "1px",
            }}
          >
            {calendarDays.map((cell, i) => {
              const dayEvents = getEventsForDate(cell.date);
              const isToday = isSameDay(cell.date, today);
              const isSelected = selectedDay ? isSameDay(cell.date, selectedDay) : false;
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDay(cell.date);
                    setSelectedEvent(null);
                  }}
                  style={{
                    aspectRatio: "1",
                    position: "relative",
                    background: isSelected
                      ? "linear-gradient(180deg, #2a2010 0%, #1e1808 100%)"
                      : isToday
                        ? "linear-gradient(180deg, #1a1610 0%, #14110c 100%)"
                        : "linear-gradient(180deg, #100e0a 0%, #0c0a08 100%)",
                    border: isSelected
                      ? "1px solid #c8a951"
                      : isToday
                        ? "1px solid #4a3a20"
                        : "1px solid #1a1610",
                    borderRadius: "2px",
                    cursor: hasEvents || cell.inMonth ? "pointer" : "default",
                    padding: "0.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "all 0.15s",
                    opacity: cell.inMonth ? 1 : 0.3,
                    boxShadow: isSelected
                      ? "0 0 12px rgba(200,169,81,0.2), inset 0 0 12px rgba(200,169,81,0.05)"
                      : isToday
                        ? "inset 0 0 8px rgba(200,169,81,0.03)"
                        : "none",
                    fontFamily: "inherit",
                    minHeight: "58px",
                  }}
                >
                  {/* Day number */}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: isToday ? 700 : 500,
                      color: isSelected
                        ? "#c8a951"
                        : isToday
                          ? "#e8c96a"
                          : cell.inMonth
                            ? "#8a7a5a"
                            : "#3a3428",
                      lineHeight: 1,
                    }}
                  >
                    {cell.date.getDate()}
                  </span>

                  {/* Event pips */}
                  {hasEvents && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        marginTop: "3px",
                        width: "100%",
                        padding: "0 2px",
                      }}
                    >
                      {dayEvents.slice(0, 3).map((ev) => (
                        <div
                          key={ev.id}
                          style={{
                            height: "4px",
                            borderRadius: "2px",
                            background: `linear-gradient(90deg, ${ev.color}, ${ev.color}88)`,
                            boxShadow: `0 0 4px ${ev.color}40`,
                            width: "100%",
                          }}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div style={{ fontSize: "0.55rem", color: "#6a5a3a", textAlign: "center" }}>
                          +{dayEvents.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Today indicator ring */}
                  {isToday && (
                    <div
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#c8a951",
                        boxShadow: "0 0 6px rgba(200,169,81,0.6)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom ornamental bar */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #3d3425, #6a5530, #8a7035, #6a5530, #3d3425)",
            }}
          />
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "1rem 0.5rem",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Raid", color: "#c8a951" },
            { label: "Mythic+", color: "#3fc7eb" },
            { label: "PvP", color: "#c41e3a" },
            { label: "Social", color: "#f0d060" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div
                style={{
                  width: "18px",
                  height: "4px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, ${l.color}, ${l.color}88)`,
                  boxShadow: `0 0 4px ${l.color}40`,
                }}
              />
              <span style={{ fontSize: "0.7rem", color: "#6a5a3a", letterSpacing: "0.05em" }}>
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Event Sidebar ── */}
      <div style={{ width: "100%", maxWidth: "360px", flexShrink: 0 }}>
        {selectedEvent ? (
          /* Full event detail */
          <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        ) : selectedDay ? (
          /* Day event list */
          <div
            style={{
              background: "linear-gradient(180deg, #1a1510 0%, #0e0c08 100%)",
              border: "2px solid #3d3425",
              borderTop: "2px solid #5a4a30",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 0 30px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                height: "3px",
                background: "linear-gradient(90deg, #3d3425, #8a7035, #c8a951, #8a7035, #3d3425)",
              }}
            />
            <div style={{ padding: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#6a5a3a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Events For
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#c8a951",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #2e2518",
                }}
              >
                {selectedDay.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {selectedDayEvents.length === 0 ? (
                <div style={{ color: "#4a4030", fontSize: "0.875rem", textAlign: "center", padding: "2rem 0" }}>
                  No events scheduled.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {selectedDayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      style={{
                        background: "linear-gradient(180deg, #14120e 0%, #100e0a 100%)",
                        border: "1px solid #2e2518",
                        borderLeft: `3px solid ${ev.color}`,
                        borderRadius: "3px",
                        padding: "0.75rem",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.15s",
                        fontFamily: "inherit",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: ev.color, display: "flex" }}>{typeIcon(ev.type)}</span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#e8dfc8" }}>
                          {ev.title}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.7rem", color: "#6a5a3a" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Clock size={10} />
                          {ev.startTime}–{ev.endTime} ST
                        </span>
                        {ev.difficulty && (
                          <span style={{ color: ev.color }}>{ev.difficulty}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No day selected — show upcoming */
          <UpcomingSidebar events={events} onSelect={setSelectedEvent} />
        )}
      </div>
    </div>
  );
}

// ── Event Detail Sub-component ───────────────────────

function EventDetail({ event, onClose }: { event: ScheduleEvent; onClose: () => void }) {
  const leaderColor = CLASS_COLOR[event.leaderClass] || "#c8a951";

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1a1510 0%, #0e0c08 100%)",
        border: "2px solid #3d3425",
        borderTop: `2px solid ${event.color}60`,
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: `0 0 30px rgba(0,0,0,0.6), 0 0 15px ${event.color}10`,
      }}
    >
      {/* Color header bar */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, #3d3425, ${event.color}, ${event.color}, #3d3425)`,
        }}
      />

      <div style={{ padding: "1.25rem" }}>
        {/* Close button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid #2e2518",
              borderRadius: "3px",
              padding: "0.2rem",
              cursor: "pointer",
              color: "#6a5a3a",
              display: "flex",
              transition: "color 0.15s",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Event type badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            background: `${event.color}15`,
            border: `1px solid ${event.color}30`,
            borderRadius: "3px",
            padding: "0.2rem 0.6rem",
            fontSize: "0.65rem",
            color: event.color,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          {typeIcon(event.type)}
          {typeLabel(event.type)}
          {event.difficulty && (
            <>
              <span style={{ color: `${event.color}60` }}>·</span>
              {event.difficulty}
            </>
          )}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e8dfc8", marginBottom: "0.25rem", lineHeight: 1.3 }}>
          {event.title}
        </h3>

        {/* Instance */}
        {event.raidInstance && (
          <div style={{ fontSize: "0.85rem", color: event.color, marginBottom: "1rem" }}>
            {event.raidInstance}
          </div>
        )}

        <div style={{ height: "1px", background: "#2e2518", margin: "0.75rem 0" }} />

        {/* Details grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
          {/* Time */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={14} style={{ color: "#6a5a3a" }} />
            <span style={{ fontSize: "0.85rem", color: "#e8dfc8" }}>
              {event.startTime} – {event.endTime}{" "}
              <span style={{ color: "#6a5a3a" }}>Server Time</span>
            </span>
          </div>

          {/* Recurring */}
          {event.recurring && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6a5a3a" strokeWidth="2">
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span style={{ fontSize: "0.85rem", color: "#c8a951" }}>
                Every{" "}
                {event.recurring.charAt(0).toUpperCase() + event.recurring.slice(1)}
              </span>
            </div>
          )}

          {/* Leader */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Crown size={14} style={{ color: "#6a5a3a" }} />
            <span style={{ fontSize: "0.85rem" }}>
              <span style={{ color: "#8a7a5a" }}>Led by </span>
              <span style={{ color: leaderColor, fontWeight: 600 }}>{event.leader}</span>
              <span style={{ color: "#4a4030", fontSize: "0.75rem" }}> ({event.leaderClass})</span>
            </span>
          </div>

          {/* Roster / Signups */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={14} style={{ color: "#6a5a3a" }} />
            <span style={{ fontSize: "0.85rem", color: "#e8dfc8" }}>
              {event.signups} signed up
              {event.rosterSize && (
                <span style={{ color: "#6a5a3a" }}> / {event.rosterSize} slots</span>
              )}
            </span>
            {event.rosterSize && (
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "#1a1610",
                  borderRadius: "2px",
                  overflow: "hidden",
                  marginLeft: "0.25rem",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, (event.signups / event.rosterSize) * 100)}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${event.color}, ${event.color}88)`,
                    borderRadius: "2px",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ height: "1px", background: "#2e2518", margin: "0.75rem 0" }} />

        {/* Description */}
        <p style={{ fontSize: "0.85rem", color: "#8a7a5a", lineHeight: 1.75 }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}

// ── Upcoming Sidebar ─────────────────────────────────

function UpcomingSidebar({
  events,
  onSelect,
}: {
  events: ScheduleEvent[];
  onSelect: (ev: ScheduleEvent) => void;
}) {
  // Build next 7 days of events
  const upcoming = useMemo(() => {
    const today = new Date();
    const results: { date: Date; events: ScheduleEvent[] }[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split("T")[0];

      const dayEvents = events.filter((ev) => {
        if (ev.recurring && RECURRING_MAP[ev.recurring] === dayOfWeek) return true;
        if (ev.date === dateStr) return true;
        return false;
      });

      if (dayEvents.length > 0) {
        results.push({ date: d, events: dayEvents });
      }
    }

    return results;
  }, [events]);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1a1510 0%, #0e0c08 100%)",
        border: "2px solid #3d3425",
        borderTop: "2px solid #5a4a30",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 0 30px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #3d3425, #8a7035, #c8a951, #8a7035, #3d3425)",
        }}
      />

      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            fontSize: "0.65rem",
            color: "#6a5a3a",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}
        >
          Next 7 Days
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#c8a951",
            marginBottom: "1rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #2e2518",
          }}
        >
          Upcoming Events
        </div>

        {upcoming.length === 0 ? (
          <div style={{ color: "#4a4030", fontSize: "0.875rem", textAlign: "center", padding: "2rem 0" }}>
            No events in the next 7 days.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {upcoming.map(({ date, events: dayEvents }) => (
              <div key={date.toISOString()}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#6a5a3a",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  {isSameDay(date, new Date())
                    ? "Today"
                    : date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                </div>
                {dayEvents.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => onSelect(ev)}
                    style={{
                      background: "linear-gradient(180deg, #14120e 0%, #100e0a 100%)",
                      border: "1px solid #2e2518",
                      borderLeft: `3px solid ${ev.color}`,
                      borderRadius: "3px",
                      padding: "0.65rem 0.75rem",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      marginBottom: "0.35rem",
                      transition: "all 0.15s",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                      <span style={{ color: ev.color, display: "flex" }}>{typeIcon(ev.type)}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#e8dfc8" }}>
                        {ev.title}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "#6a5a3a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        <Clock size={9} />
                        {ev.startTime}–{ev.endTime}
                      </span>
                      {ev.raidInstance && (
                        <span style={{ color: "#4a4030" }}>{ev.raidInstance}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
