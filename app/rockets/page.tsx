import Card from "../../components/ui/card";
import SectionFallback from "../../components/SectionFallback";
import SectionSeparator from "../../components/SectionSeparator";
import Link from "next/link";
import { getRocketSummaries, type RocketSummary } from "@/lib/site-data";

type RocketItem = RocketSummary;

export default async function RocketsPage() {
  let rockets: RocketItem[] = [];

  try {
    rockets = await getRocketSummaries();
  } catch (error) {
    console.error("Error fetching rockets:", error);
  }

  return (
    <main className="min-h-screen bg-background pb-16 text-text-main">
      <section className="bg-background pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">
            Our Rockets
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Explore our rocket projects and achievements!
          </p>
        </div>
      </section>

      <SectionSeparator variant={1} />

      <section className="bg-surface py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {rockets.length === 0 ? (
              <SectionFallback align="left" />
            ) : (
              rockets.map((rocket: RocketItem, idx: number) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
