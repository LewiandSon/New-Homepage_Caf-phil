"use client";

import { useEffect, useState, useCallback } from "react";

type AbsageEvent = {
  id: string;
  title: string;
  date: string;
  grund: string;
  empfaenger: number;
  gesendetAm: string | null;
  past?: boolean;
};

const RED = "#D72333";
const CREAM = "#F9F1DA";

export default function AbsagePage() {
  const [key, setKey] = useState<string | null>(null);
  const [events, setEvents] = useState<AbsageEvent[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      setKey(new URLSearchParams(window.location.search).get("key"));
    } catch {
      setKey(null);
    }
  }, []);

  const load = useCallback(async (k: string) => {
    setError("");
    try {
      const res = await fetch(`/api/absage?key=${encodeURIComponent(k)}`);
      if (res.status === 401) {
        setError("Falscher oder fehlender Zugangscode.");
        setEvents([]);
        return;
      }
      const data = await res.json();
      setEvents(data.events ?? []);
    } catch {
      setError("Konnte nicht laden.");
    }
  }, []);

  useEffect(() => {
    if (key) load(key);
  }, [key, load]);

  const send = async (ev: AbsageEvent) => {
    if (!key) return;
    if (!window.confirm(`Absage-Mail an ${ev.empfaenger} Angemeldete für „${ev.title}" senden?`)) return;
    setBusy(ev.id);
    setMsg((m) => ({ ...m, [ev.id]: "" }));
    try {
      const res = await fetch("/api/absage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, eventId: ev.id }),
      });
      const data = await res.json();
      if (data.status === "ok") {
        setMsg((m) => ({ ...m, [ev.id]: `✓ Gesendet an ${data.sent} (Fehler: ${data.failed})` }));
      } else if (data.status === "already_sent") {
        setMsg((m) => ({ ...m, [ev.id]: "Bereits gesendet." }));
      } else {
        setMsg((m) => ({ ...m, [ev.id]: `Fehler: ${data.message ?? data.status}` }));
      }
      await load(key);
    } catch {
      setMsg((m) => ({ ...m, [ev.id]: "Fehler beim Senden." }));
    } finally {
      setBusy(null);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: CREAM, color: RED, fontFamily: "Vollkorn, Georgia, serif", padding: "130px 20px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontStyle: "italic", fontWeight: 900, marginBottom: 8 }}>Absage-Versand</h1>
        <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 28 }}>
          Abgesagte Veranstaltungen – hier verschickst du die Absage-Mail an alle Angemeldeten.
        </p>

        {error && <p style={{ color: "#b00020", fontWeight: 600 }}>{error}</p>}
        {!key && !error && <p>Zugangscode fehlt im Link (…/absage?key=…).</p>}
        {key && !events && !error && <p style={{ opacity: 0.6 }}>Wird geladen …</p>}
        {events && events.length === 0 && !error && (
          <p style={{ opacity: 0.7 }}>Derzeit ist keine Veranstaltung als „abgesagt" markiert.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {events?.map((ev) => (
            <div key={ev.id} style={{ border: `2px solid ${RED}`, padding: "16px 20px", background: "#fff" }}>
              <div style={{ fontSize: 19, fontWeight: 800, fontStyle: "italic" }}>{ev.title}</div>
              <div style={{ fontSize: 14, opacity: 0.75, marginTop: 2 }}>{ev.date}</div>
              {ev.grund && <div style={{ fontSize: 14, opacity: 0.75 }}>Grund: {ev.grund}</div>}
              <div style={{ fontSize: 15, marginTop: 8 }}>
                <strong>{ev.empfaenger}</strong> angemeldete Person(en) mit E-Mail
              </div>

              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                {ev.gesendetAm ? (
                  <span style={{ fontSize: 14, color: "#2e7d32", fontWeight: 700 }}>
                    ✓ Absage bereits gesendet{ev.gesendetAm !== "unbekannt" ? ` (${new Date(ev.gesendetAm).toLocaleString("de-AT")})` : ""}
                  </span>
                ) : ev.past ? (
                  <span style={{ fontSize: 14, opacity: 0.7, fontWeight: 600 }}>
                    Veranstaltung ist bereits vorbei – kein Versand mehr nötig.
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => send(ev)}
                    disabled={busy === ev.id || ev.empfaenger === 0}
                    style={{
                      padding: "10px 22px",
                      fontFamily: "inherit",
                      fontSize: 16,
                      fontWeight: 700,
                      color: CREAM,
                      background: ev.empfaenger === 0 ? "#999" : RED,
                      border: "none",
                      cursor: busy === ev.id || ev.empfaenger === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    {busy === ev.id ? "Wird gesendet …" : "Absage senden"}
                  </button>
                )}
                {msg[ev.id] && <span style={{ fontSize: 14, fontWeight: 600 }}>{msg[ev.id]}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
