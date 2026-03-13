import React from "react";
import Link from "next/link";
import Card from "../components/ui/card";
import SectionFallback from "../components/SectionFallback";
import QuickNavCard from "../components/QuickNavCard";
import SectionSeparator from "../components/SectionSeparator";
import { getEventsOverview, getRocketSummaries } from "@/lib/site-data";

type Rocket = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  launchedAt?: string | null;
};

type EventItem = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  date: string;
  eventTag?: string | null;
};

export default async function HomePage() {
  let featuredRockets: Rocket[] = [];
  let latestEvents: EventItem[] = [];

  try {
    const [rockets, events] = await Promise.all([
      getRocketSummaries(),
      getEventsOverview(),
    ]);

    featuredRockets = rockets;
    latestEvents = events.upcoming;
  } catch (err) {
    console.error("Failed to load homepage data", err);
  }

  const eventPlaceholder =
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80";

  return (
    <main className="min-h-screen bg-background text-text-main">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-background relative overflow-hidden">
        <div className="relative z-10">
          <img
            src="/UARC logo.png"
            alt="UARC Logo"
            className="h-24 mb-6 drop-shadow-xl mx-auto"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            University of Auckland Rocketry Club
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
            The University Of Auckland Rocketry Club is a club dedicated to all
            things rockets. We give students the opportunity to design, build
            and fly rockets as we learn about aerospace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfS7PS--UX-fQinUfuYzVLV3-rM92cW7uVFOqoEVczgYLb8Qg/viewform?usp=sf_link"
              className="button bg-primary text-white text-lg px-8 py-3 font-bold shadow-lg hover:bg-[#a94425] transition-all duration-300 hover:scale-103"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join The Club
            </Link>
            <Link
              href="/rockets"
              className="button bg-primary text-white text-lg px-8 py-3 font-bold shadow-lg hover:bg-[#a94425] transition-all duration-300 hover:scale-103"
            >
              View Our Rockets
            </Link>
          </div>
        </div>
      </section>

      <SectionSeparator variant={1} />

      {/* Featured Rockets Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Featured Rockets</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Explore our latest rocket projects and achievements!
            </p>
          </div>
          {featuredRockets.length === 0 ? (
            <SectionFallback />
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {featuredRockets.map((rocket, idx) => (
                <Link
                  key={rocket.id}
                  href={`/rockets/${rocket.slug}`}
                  className="block h-full"
                >
                  <Card
                    image={rocket.image ?? ""}
                    title={rocket.name}
                    date={
                      rocket.launchedAt
                        ? new Date(rocket.launchedAt).toLocaleDateString()
                        : "TBA"
                    }
                    description={rocket.description ?? ""}
                    reverse={idx % 2 === 1}
                  />
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              href="/rockets"
              className="button bg-primary text-white px-6 py-3 font-bold hover:bg-[#a94425] transition-all duration-200"
            >
              View All Rockets
            </Link>
          </div>
        </div>
      </section>

      <SectionSeparator variant={2} />

      {/* Latest Events Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Upcoming Events</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Join our next events and be part of the excitement!
            </p>
          </div>
          {latestEvents.length === 0 ? (
            <SectionFallback
              title="No upcoming events right now"
              description="We do not have any future events scheduled yet. Check back soon for new workshops, talks, and launch activities."
            />
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
              {latestEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block h-full"
                >
                  <Card
                    image={eventPlaceholder}
                    title={event.title}
                    date={new Date(event.date).toLocaleDateString()}
                    tag={event.eventTag ?? "General"}
                    description={event.description ?? ""}
                    vertical
                  />
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="button bg-primary text-white px-6 py-3 font-bold hover:bg-[#a94425] transition-all duration-200"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      <SectionSeparator variant={3} />

      {/* Sponsors Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-extrabold mb-4">Our Sponsors</h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              We are grateful for the generous support of our sponsors who make
              our rocketry projects possible.
            </p>
            <div className="mt-8">
              <Link
                href="/sponsors"
                className="button bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-[#a94425] transition-all duration-200"
              >
                View Our Sponsors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant={4} />

      {/* Quick Navigation Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Explore More</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover everything the University of Auckland Rocketry Club has
              to offer.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-4">
            <QuickNavCard
              href="/about"
              icon="ℹ️"
              title="About"
              description="Learn about the club and our mission"
            />
            <QuickNavCard
              href="/events"
              icon="📅"
              title="Events"
              description="Check out upcoming events and competitions"
            />
            <QuickNavCard
              href="/rockets"
              icon="🚀"
              title="Our Rockets"
              description="View our rocket projects and achievements"
            />
            <QuickNavCard
              href="/sponsors"
              icon="🤝"
              title="Sponsors"
              description="Meet our generous sponsors"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
