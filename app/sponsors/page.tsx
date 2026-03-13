import React from "react";
import SponsorCard from "@/components/ui/sponsor-card";
import SectionSeparator from "@/components/SectionSeparator";
import { getSponsors, type Sponsor } from "@/lib/site-data";

export default async function SponsorsPage() {
  let sponsors: Sponsor[] = [];
  try {
    sponsors = await getSponsors();
  } catch (e) {
    console.warn("Could not load sponsors:", (e as Error).message);
  }

  // group by sponsor.tier
  const grouped: Record<string, Sponsor[]> = {
    gold: [],
    silver: [],
    bronze: [],
  };

  if (sponsors && sponsors.length > 0) {
    sponsors.forEach((s) => {
      const raw = (s.tier ?? "BRONZE").toString();
      const tierKey = raw.trim().toLowerCase();
      if (tierKey === "gold" || tierKey === "silver" || tierKey === "bronze") {
        grouped[tierKey].push(s);
      } else if (tierKey === "g" || tierKey === "s" || tierKey === "b") {
        // tolerate single-letter values if present
        const map: Record<string, string> = {
          g: "gold",
          s: "silver",
          b: "bronze",
        };
        grouped[map[tierKey]].push(s);
      } else {
        grouped.bronze.push(s);
      }
    });
  }

  const tierSections = [
    {
      key: "gold",
      title: "Gold Sponsors",
      headingClass: "text-3xl",
      sponsors: grouped.gold,
    },
    {
      key: "silver",
      title: "Silver Sponsors",
      headingClass: "text-2xl",
      sponsors: grouped.silver,
    },
    {
      key: "bronze",
      title: "Bronze Sponsors",
      headingClass: "text-xl",
      sponsors: grouped.bronze,
    },
  ].filter((section) => section.sponsors.length > 0);

  return (
    <main className="min-h-screen bg-background pb-16 text-text-main">
      <section className="bg-background pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">
            Our Sponsors
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mb-4">
            We are grateful for the generous support of our sponsors. Their
            contributions make our rocketry projects and events possible.
            Interested in sponsoring us?
          </p>
          <a
            href="mailto:uoarocketryclub@gmail.com"
            className="button inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>

      {tierSections.map((tier, idx) => (
        <React.Fragment key={tier.key}>
          <SectionSeparator
            variant={((idx % 4) + 1) as 1 | 2 | 3 | 4}
            className={idx === 0 ? "mt-4" : ""}
          />
          <section
            className={`py-16 px-4 ${idx % 2 === 0 ? "bg-surface" : "bg-background"}`}
          >
            <div className="max-w-7xl mx-auto">
              <h2
                className={`${tier.headingClass} font-bold mb-6 text-primary text-left`}
              >
                {tier.title}
              </h2>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {tier.sponsors.map((sponsor: Sponsor) => (
                  <SponsorCard sponsor={sponsor} key={sponsor.id} />
                ))}
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}

      {/* Contact */}
      {tierSections.length > 0 && <SectionSeparator variant={4} />}
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-surface rounded-xl p-12 text-center border border-accent shadow-md"
            style={{ backgroundColor: "#232323" }}
          >
            <h3 className="text-2xl font-bold text-primary mb-2">
              Become a Sponsor
            </h3>
            <p className="text-text-secondary mb-4">
              Support the next generation of rocketeers and get your company
              featured here!
            </p>
            <a href="mailto:uoarocketryclub@gmail.com" className="button">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
