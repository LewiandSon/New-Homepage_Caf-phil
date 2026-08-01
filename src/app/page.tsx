import { client } from "@/sanity/client";
import { upcomingEventsQuery, type EventPreview } from "@/sanity/queries";
import { HomeClient } from "./HomeClient";

export default async function Home() {
  const now = new Date().toISOString();
  const events = await client.fetch<EventPreview[]>(upcomingEventsQuery, { now });
  const initialNextEvent = events.length > 0 ? events[0] : null;

  return <HomeClient initialNextEvent={initialNextEvent} />;
}
