import type { Metadata } from "next";
import { BreakfastContent } from "./BreakfastContent";

export const metadata: Metadata = {
  title: "Breakfast in Vienna · café phil – Cozy Café & Bookshop",
  description:
    "Breakfast all day in Vienna's most charming café-bookshop. Coffee, eggs, toast and 4,000 books. Walk-ins welcome. Gumpendorfer Str. 10–12, 1060 Wien.",
};

export default function BreakfastPage() {
  return <BreakfastContent />;
}
