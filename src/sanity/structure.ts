import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("phil – Inhalte")
    .items([
      S.listItem()
        .title("Veranstaltungen")
        .icon(() => "📅")
        .child(
          S.documentTypeList("event")
            .title("Alle Veranstaltungen")
            .defaultOrdering([{ field: "date", direction: "asc" }])
        ),
    ]);
