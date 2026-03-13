"use client";
import React from "react";
import SectionFallback from "../../../components/SectionFallback";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function EventSlugError({ error }: ErrorProps) {
  console.error("Error rendering /events/[slug] page:", error);

  return (
    <main className="min-h-screen max-w-7xl mx-auto pb-16">
      <section className="max-w-7xl mx-auto pt-16 pb-8 px-4 text-left">
        <h1 className="text-5xl font-extrabold mb-4 text-primary">Event</h1>
        <SectionFallback align="left" />
      </section>
    </main>
  );
}
