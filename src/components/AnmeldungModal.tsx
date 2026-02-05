"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "../LanguageContext";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxcPyb4JUoQXjKKQM75j7NQJyAPR41h9hzlrLotZP2Sx4oq0ONCtgiZNe_b4nK3d3HO/exec";

type AnmeldungModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string; // z.B. "30.10.2025, 19:00 Uhr"
};

const labelStyle = {
  color: "#573B30",
  fontFamily: "Vollkorn",
  fontSize: "16px",
  fontWeight: 500,
  marginBottom: "4px",
  display: "block",
} as const;

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontFamily: "Vollkorn",
  fontSize: "16px",
  border: "1px solid #ccc",
  backgroundColor: "#F9F1DA",
  color: "#573B30",
  boxSizing: "border-box" as const,
};

export function AnmeldungModal({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
}: AnmeldungModalProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const { lang } = useLanguage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    fd.set("eventTitle", eventTitle);
    fd.set("eventDate", eventDate);

    setStatus("sending");
    setStatusMessage("");

    try {
      const res = await fetch(SCRIPT_URL, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (data?.status === "success") {
        form.reset();
        setStatus("success");
      } else {
        throw new Error(data?.message || "Unbekannter Fehler");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Fehler: " + (err instanceof Error ? err.message : "Anmeldung fehlgeschlagen."));
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setStatusMessage("");
    onClose();
  };

  if (!isOpen) return null;

  const isSuccess = status === "success";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleClose}
    >
      <div
        className="relative flex flex-col"
        style={{
          width: "min(520px, 90vw)",
          border: "1px solid #6b9ed4",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Roter Header */}
        <div
          className="relative flex items-center justify-center py-4"
          style={{ backgroundColor: "#D72333" }}
        >
          <h2
            style={{
              color: "#F9F1DA",
              fontFamily: "Vollkorn",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            {isSuccess
              ? lang === "de"
                ? "Anmeldung erfolgreich"
                : "Registration successful"
              : lang === "de"
                ? "Anmeldung"
                : "Registration"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F9F1DA] hover:opacity-80 transition-opacity"
            style={{ fontSize: "24px", fontWeight: 900, background: "none", border: "none", cursor: "pointer" }}
            aria-label={lang === "de" ? "Schließen" : "Close"}
          >
            ×
          </button>
        </div>

        {isSuccess ? (
          /* Erfolgs-Pop-up */
          <div
            style={{
              padding: "32px 24px",
              backgroundColor: "#F9F1DA",
              fontFamily: "Vollkorn",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#573B30", fontSize: "20px", lineHeight: "1.5" }}>
              {lang === "de"
                ? "Du erhältst in Kürze eine Bestätigungs-E-Mail."
                : "You’ll receive a confirmation email shortly."}
            </p>
          </div>
        ) : (
        /* Formular-Body */
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "24px",
            backgroundColor: "#F9F1DA",
            fontFamily: "Vollkorn",
          }}
        >
          <p style={{ color: "#573B30", fontSize: "15px", marginBottom: "16px" }}>
            {lang === "de"
              ? "Melde dich hier für die Veranstaltung an:"
              : "Register here for the event:"}
          </p>
          <p style={{ color: "#D72333", fontWeight: 700, fontSize: "17px", marginBottom: "4px" }}>
            {eventTitle}
          </p>
          <p style={{ color: "#573B30", fontSize: "15px", marginBottom: "20px" }}>
            {eventDate}
          </p>

          {/* Vorname & Nachname in einer Zeile */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="anm-vorname" style={labelStyle}>
                {lang === "de" ? "Vorname" : "First name"}
              </label>
              <input
                id="anm-vorname"
                name="vorname"
                type="text"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="anm-nachname" style={labelStyle}>
                {lang === "de" ? "Nachname" : "Last name"}
              </label>
              <input
                id="anm-nachname"
                name="nachname"
                type="text"
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="anm-email" style={labelStyle}>
              {lang === "de" ? "E-Mail Adresse" : "Email address"}
            </label>
            <input
              id="anm-email"
              name="email"
              type="email"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="anm-personen" style={labelStyle}>
              {lang === "de" ? "Personenanzahl" : "Number of people"}
            </label>
            <input
              id="anm-personen"
              name="personenanzahl"
              type="number"
              min={1}
              max={20}
              defaultValue={1}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="anm-kommentar" style={labelStyle}>
              {lang === "de" ? "Kommentar" : "Comment"}
            </label>
            <textarea
              id="anm-kommentar"
              name="kommentar"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Absenden + Newsletter */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              disabled={status === "sending"}
              className="transition-all duration-200"
              style={{
                padding: "12px 28px",
                fontFamily: "Vollkorn",
                fontSize: "18px",
                fontWeight: 600,
                color: "#D72333",
                backgroundColor: "#F9F1DA",
                border: "2px solid #D72333",
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") {
                  e.currentTarget.style.backgroundColor = "#D72333";
                  e.currentTarget.style.color = "#F9F1DA";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F9F1DA";
                e.currentTarget.style.color = "#D72333";
              }}
            >
              {status === "sending" ? "Wird gesendet…" : "Absenden"}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ ...labelStyle, marginBottom: 0, marginRight: "4px" }}>
                Newsletter abonnieren?
              </span>
              <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                <input type="radio" name="newsletter" value="Ja" defaultChecked style={{ accentColor: "#D72333" }} />
                <span style={{ fontSize: "15px", color: "#573B30" }}>Ja</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                <input type="radio" name="newsletter" value="Nein" style={{ accentColor: "#D72333" }} />
                <span style={{ fontSize: "15px", color: "#573B30" }}>Nein</span>
              </label>
            </div>
          </div>

          {statusMessage && (
            <p
              style={{
                marginTop: "16px",
                fontSize: "15px",
                color: "#c00",
              }}
            >
              {statusMessage}
            </p>
          )}
        </form>
        )}
      </div>
    </div>
  );
}
