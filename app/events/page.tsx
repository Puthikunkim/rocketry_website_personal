import Link from "next/link";
import Card from "@/components/ui/card";
import SectionFallback from "@/components/SectionFallback";
import EventsTagFilter from "@/components/EventsTagFilter";
import { getEventsOverview, type EventSummary } from "@/lib/site-data";

type EventLocal = EventSummary;

interface EventsPageProps {
  readonly searchParams: Promise<{ tag?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { tag } = await searchParams;
  const selectedTag = typeof tag === "string" ? tag : "all";

  let events: EventLocal[] = [];

  let upcoming: EventLocal[] = [];
  let past: EventLocal[] = [];

  try {
    const data = await getEventsOverview();
    upcoming = data.upcoming;
    past = data.past;
    events = [...upcoming, ...past];
  } catch (error) {
    console.error("Error fetching events:", error);
    const now = new Date();
    upcoming = events.filter(
      (e: EventLocal) => !e.isPast && new Date(e.date) >= now,
    );
    past = events.filter((e: EventLocal) => e.isPast || new Date(e.date) < now);
  }

  const placeholder =
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80";

  const allTags = Array.from(
    new Set(
      [...upcoming, ...past]
        .map((event) => event.eventTag?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const filterByTag = (event: EventLocal) => {
    if (selectedTag === "all") return true;
    return (event.eventTag ?? "General") === selectedTag;
  };

  const filteredUpcoming = upcoming.filter(filterByTag);
  const filteredPast = past.filter(filterByTag);

  return (
    <main className="min-h-screen bg-background pb-16 text-text-main">
      <section className="bg-background pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">Events</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Discover and join our upcoming and past events! From launches to
            workshops, our events are open to all members and enthusiasts. Stay
            tuned for more updates and relive the highlights from our past
            activities.
          </p>
          <EventsTagFilter selectedTag={selectedTag} allTags={allTags} />
        </div>
      </section>

      <section className="bg-surface py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Upcoming Events
          </h2>
          {filteredUpcoming.length === 0 ? (
            <SectionFallback
              align="left"
              title="No upcoming events right now"
              description={
                selectedTag === "all"
                  ? "There are currently no future events scheduled. Check back soon."
                  : "There are currently no future events for this tag. Try switching to All Tags or check back soon."
              }
            />
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
              {filteredUpcoming.map((event: EventLocal) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block h-full"
                >
                  <Card
                    image={placeholder}
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
        </div>
      </section>

      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-primary">Past Events</h2>
          {filteredPast.length === 0 ? (
            <SectionFallback align="left" />
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
              {filteredPast.map((event: EventLocal) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block h-full"
                >
                  <Card
                    image={placeholder}
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
        </div>
      </section>
    </main>
  );
}
