import { createFileRoute } from "@tanstack/react-router";
import FortePage from "@/components/FortePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORTÉ — Corporate Events & Experiences" },
      {
        name: "description",
        content:
          "Corporate events and experiences, planned with purpose and delivered without a hitch. Exceptional, by Design.",
      },
    ],
  }),
  component: FortePage,
});
