"use client";

export function OpenStatus() {
  const now = new Date();
  const viennaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Vienna" })
  );
  const day = viennaTime.getDay(); // 0=So, 1=Mo, 2=Di...6=Sa
  const hour = viennaTime.getHours();
  const min = viennaTime.getMinutes();
  const time = hour + min / 60;

  const hours: Record<number, [number, number] | null> = {
    0: [9, 21],   // Sunday
    1: [14, 21],  // Monday
    2: [9, 22],   // Tuesday
    3: [9, 22],   // Wednesday
    4: [9, 22],   // Thursday
    5: [9, 23],   // Friday
    6: [9, 23],   // Saturday
  };

  const todayHours = hours[day];
  const isOpen =
    todayHours !== null &&
    time >= todayHours[0] &&
    time < todayHours[1];

  const closingSoon =
    isOpen && todayHours !== null && todayHours[1] - time < 1;

  const closingHour = todayHours
    ? `${todayHours[1]}:00`
    : "";

  if (isOpen && !closingSoon) {
    return (
      <span
        style={{
          background: "#1D9E75",
          color: "#fff",
          borderRadius: 99,
          padding: "4px 14px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Vollkorn",
          letterSpacing: "0.01em",
        }}
      >
        ● Open now · closes {closingHour}
      </span>
    );
  } else if (closingSoon) {
    return (
      <span
        style={{
          background: "#BA7517",
          color: "#fff",
          borderRadius: 99,
          padding: "4px 14px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Vollkorn",
          letterSpacing: "0.01em",
        }}
      >
        ● Closing soon · until {closingHour}
      </span>
    );
  } else {
    return (
      <span
        style={{
          background: "#A32D2D",
          color: "#fff",
          borderRadius: 99,
          padding: "4px 14px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Vollkorn",
          letterSpacing: "0.01em",
        }}
      >
        ● Currently closed
      </span>
    );
  }
}
