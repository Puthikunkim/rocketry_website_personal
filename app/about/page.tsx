import Link from "next/link";
import Image from 'next/image';
import FeatureCard from "../../components/FeatureCard";
import ExecCard from "../../components/ExecCard";
import StatCard from "../../components/StatCard";
import SectionFallback from "../../components/SectionFallback";

export const dynamic = 'force-dynamic';

type Exec = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export default async function AboutPage() {
  // Fetch executive team members via API route with error handling
  const origin = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`);
  let executives: Exec[] = [];
  let execsError = false;

  // Types for the about payload sections
  type Feature = { icon?: string; title: string; body?: string; variant?: 'background' | 'surface' };
  type TeamRole = { title: string; body?: string; bullets?: string[]; variant?: 'background' | 'surface' };
  type Stat = { value: string; label: string };
  type AboutPayload = {
    executives?: Exec[];
    whatWeDo?: Feature[];
    journey?: Feature[];
    teamStructure?: TeamRole[];
    stats?: Stat[];
  };

  // Start empty and show section-level fallbacks if missing
  let whatWeDo: Feature[] = [];
  let journey: Feature[] = [];
  let teamStructure: TeamRole[] = [];
  let stats: Stat[] = [];

  try {
    const res = await fetch(new URL('/api/about', origin).toString(), { cache: 'no-store' });
    if (!res.ok) {
      console.error('/api/about returned non-ok status:', res.status, res.statusText);
      execsError = true;
    } else {
      const payload = (await res.json()) as AboutPayload | Exec[];
      if (Array.isArray(payload)) {
        executives = payload as Exec[];
      } else {
        executives = Array.isArray(payload.executives) ? payload.executives : [];
        whatWeDo = Array.isArray(payload.whatWeDo) ? payload.whatWeDo : [];
        journey = Array.isArray(payload.journey) ? payload.journey : [];
        teamStructure = Array.isArray(payload.teamStructure) ? payload.teamStructure : [];
        stats = Array.isArray(payload.stats) ? payload.stats : [];

        execsError = executives.length === 0;
      }
    }
  } catch (err) {
    console.error('Error fetching /api/about:', err);
    execsError = true;
  }

  const SUPABASE_STORAGE_BASE = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || 'https://vokbajuauijnfzenzlye.supabase.co/storage/v1/object/public';
  const TEAM_IMAGE_PATH = 'images/execs/exec_team.jpg';
  const encodePath = (p: string) => p.split('/').map(encodeURIComponent).join('/');
  const teamImageUrl = `${SUPABASE_STORAGE_BASE.replace(/\/$/, '')}/${encodePath(TEAM_IMAGE_PATH)}`;

  return (
    <main className="min-h-screen bg-background text-text-main pt-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pb-24 px-4 bg-background relative overflow-hidden">
        <div className="relative z-10 w-full mx-auto">
          {teamImageUrl ? (
            <div className="rounded-xl shadow-2xl w-3/4 mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
              <Image
                src={teamImageUrl}
                alt="UARC Team"
                width={2160}
                height={1215}
                sizes="(max-width: 1024px) 75vw, 800px" 
                priority
                className="w-full h-auto object-cover max-w-none rounded-xl"
              />
            </div>
          ) : (
            <div className="rounded-xl shadow-2xl w-3/4 mx-auto bg-gray-800 h-72 px-4 sm:px-6 lg:px-8" />
          )}
        </div>
      </section>

      {/* What Do We Do Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">What Do We Do?</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We offer a variety of activities to help students learn, network, and grow in the field of rocketry
            </p>
          </div>
          {whatWeDo.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whatWeDo.map((w, idx) => (
                <FeatureCard
                  key={idx}
                  icon={w.icon}
                  title={w.title}
                  centered={true}
                  variant={w.variant as "background" | "surface"}
                >
                  {w.body}
                </FeatureCard>
              ))}
            </div>
          ) : (
            <SectionFallback />
          )}
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Our Journey</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From humble beginnings to launching rockets that reach new heights
            </p>
          </div>
          {journey.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {journey.map((j, idx) => (
                <FeatureCard
                  key={idx}
                  icon={j.icon}
                  title={j.title}
                  variant={j.variant as "background" | "surface"}
                >
                  {j.body}
                </FeatureCard>
              ))}
            </div>
          ) : (
            <SectionFallback />
          )}
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Our Executive Team</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Meet the dedicated leaders driving UARC forward with their passion for rocketry and aerospace engineering
            </p>
          </div>
          {execsError ? (
            <SectionFallback
              title="Unable to load executive team"
              description="We are having trouble fetching the executive team. Please try again later or contact us if the issue persists."
            />
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((exec: Exec) => (
              <ExecCard key={exec.id} exec={exec} centered={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Our Achievements</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Milestones that showcase our commitment to excellence in rocketry
            </p>
          </div>
          {stats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, idx) => (
                <StatCard key={idx} value={s.value} label={s.label} centered={true} variant="background" />
              ))}
            </div>
          ) : (
            <SectionFallback />
          )}
        </div>
      </section>

      {/* Team Structure Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Our Team Structure</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Organised teams working together to achieve our rocketry goals
            </p>
          </div>
          {teamStructure.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamStructure.map((t, idx) => (
                <FeatureCard key={idx} title={t.title} variant={t.variant as "surface" | "background"}>
                  <p className="mb-4">{t.body}</p>
                  {t.bullets ? (
                    <ul className="text-text-secondary text-sm space-y-2">
                      {t.bullets.map((b, i) => <li key={i}>• {b}</li>)}
                    </ul>
                  ) : null}
                </FeatureCard>
              ))}
            </div>
          ) : (
            <SectionFallback />
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl p-8 text-center border border-accent shadow-md" style={{ backgroundColor: '#232323' }}>
            <h2 className="text-2xl font-bold text-primary mb-2">Ready to Join?</h2>
            <p className="text-text-secondary mb-4">
              Whether you&apos;re an experienced engineer or just starting your journey in aerospace, there&apos;s a place for you in UARC. Join us in pushing the boundaries of student rocketry!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfS7PS--UX-fQinUfuYzVLV3-rM92cW7uVFOqoEVczgYLb8Qg/viewform?usp=sf_link" className="button bg-primary text-white px-6 py-3 font-bold hover:bg-[#a94425] transition-all duration-200" target="_blank" rel="noopener noreferrer">
                Become a Member
              </Link>
              <Link href="/events" className="button bg-primary text-white px-6 py-3 font-bold hover:bg-[#a94425] transition-all duration-200">
                Attend an Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}