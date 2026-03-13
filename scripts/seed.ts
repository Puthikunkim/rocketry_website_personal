import "dotenv/config";
import supabase from "../lib/supabase";

type Row = Record<string, unknown>;
type MaybeError = { message: string } | null;
type ExistingRow = { id: number } | null;

type DynamicTableClient = {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (
        key: string,
        value: unknown,
      ) => { maybeSingle: () => Promise<{ data: ExistingRow; error: MaybeError }> };
    };
    update: (item: Row) => {
      eq: (key: string, value: unknown) => Promise<{ error: MaybeError }>;
    };
    insert: (item: Row) => Promise<{ error: MaybeError }>;
  };
};

const db = supabase as unknown as DynamicTableClient;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

function daysFromNow(days: number): Date {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + days);
  return now;
}

async function upsertByUnique(table: string, uniqueKey: string, item: Row) {
  const { data: existing, error: selectError } = await db
    .from(table)
    .select("id")
    .eq(uniqueKey, item[uniqueKey])
    .maybeSingle();

  if (selectError) {
    throw new Error(
      `Failed reading ${table} by ${uniqueKey}=${String(item[uniqueKey])}: ${selectError.message}`,
    );
  }

  if (existing?.id) {
    const { error: updateError } = await db
      .from(table)
      .update(item)
      .eq("id", existing.id);
    if (updateError) {
      throw new Error(
        `Failed updating ${table} (${String(existing.id)}): ${updateError.message}`,
      );
    }
    return "updated";
  }

  const { error: insertError } = await db
    .from(table)
    .insert(item);
  if (insertError) {
    throw new Error(
      `Failed inserting into ${table} by ${uniqueKey}=${String(item[uniqueKey])}: ${insertError.message}`,
    );
  }
  return "created";
}

function generateExecData(count: number) {
  const firstNames = [
    "Avery",
    "Jordan",
    "Casey",
    "Taylor",
    "Riley",
    "Morgan",
    "Skyler",
    "Quinn",
    "Harper",
    "Jamie",
    "Rowan",
    "Parker",
  ];
  const lastNames = [
    "Nguyen",
    "Patel",
    "Williams",
    "Chen",
    "Singh",
    "Kim",
    "Thompson",
    "Wilson",
    "Sharma",
    "Lee",
    "Martin",
    "Davis",
  ];
  const roles = [
    "President",
    "Vice President",
    "Chief Engineer",
    "Avionics Lead",
    "Structures Lead",
    "Propulsion Lead",
    "Ground Operations Lead",
    "Recovery Lead",
    "Sponsorship Lead",
  ];
  const focusAreas = [
    "systems integration",
    "high-power rocketry",
    "team coordination",
    "flight readiness",
    "design reviews",
    "launch operations",
    "safety procedures",
    "mentoring new members",
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = `${pick(firstNames, i)} ${pick(lastNames, i * 3 + 1)}`;
    const role = pick(roles, i);
    const focus = pick(focusAreas, i * 2 + 1);

    return {
      name,
      role,
      bio: `${name} leads ${focus} and helps the team execute reliable missions from concept to launch day.`,
      photo: `https://picsum.photos/seed/exec-${slugify(name)}/320/320`,
      order: i + 1,
    };
  });
}

function generateSponsorData(count: number) {
  const prefixes = [
    "Orbital",
    "Vector",
    "Apex",
    "Nimbus",
    "Zenith",
    "Pioneer",
    "Frontier",
    "Strato",
    "Nova",
    "Altitude",
  ];
  const suffixes = [
    "Dynamics",
    "Systems",
    "Labs",
    "Aerospace",
    "Technologies",
    "Manufacturing",
    "Instruments",
    "Composites",
    "Engineering",
    "Works",
  ];
  const tiers = ["GOLD", "SILVER", "BRONZE"];
  const supportFocus = [
    "propulsion testing support",
    "composite fabrication mentorship",
    "instrumentation and telemetry equipment",
    "manufacturing resources for prototypes",
    "ground support infrastructure",
    "student engineering grants",
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = `${pick(prefixes, i)} ${pick(suffixes, i * 2 + 3)}`;
    const safeName = encodeURIComponent(name);

    return {
      name,
      logo: `https://dummyimage.com/320x140/ffffff/111111&text=${safeName}`,
      url: `https://${slugify(name)}.example.com`,
      description: `Supports UARC with ${pick(supportFocus, i)}.`,
      tier: pick(tiers, i),
    };
  });
}

function generateRocketData(count: number) {
  const namePrefixes = [
    "Kea",
    "Tui",
    "Korimako",
    "Ruru",
    "Aoraki",
    "Kestrel",
    "Aquila",
    "Falcon",
    "Striker",
    "Zenith",
  ];
  const classes = ["I", "II", "III", "IV", "V", "X"];
  const descriptors = [
    "A student-built high-altitude vehicle focused on stable ascent and reliable recovery.",
    "Designed for rapid iteration with modular avionics and adaptable payload bays.",
    "Optimised for structural efficiency with lightweight composite airframe sections.",
    "A research platform for guidance, telemetry, and thrust profiling experiments.",
    "Built to validate manufacturing workflows and improve launch turnaround time.",
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = `${pick(namePrefixes, i)} ${pick(classes, i * 2 + 1)}`;
    const launchedAt =
      i < Math.ceil(count * 0.7) ? daysFromNow(-(60 + i * 35)) : null;

    return {
      name,
      slug: slugify(name),
      description: pick(descriptors, i),
      image: `https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80&seed=rocket-${i}`,
      launchedAt: launchedAt ? launchedAt.toISOString() : null,
    };
  });
}

function generateEventData(count: number) {
  const eventTypes = [
    "Rocketry Workshop",
    "Launch Day",
    "Engine Test Session",
    "Payload Integration Lab",
    "Industry Networking Night",
    "Simulation Sprint",
    "Recovery Drill",
    "Design Review Forum",
  ];
  const locations = [
    "Engineering Building Lab 2",
    "University Sports Field",
    "Mechatronics Workshop",
    "Innovation Hub Auditorium",
    "Aerospace Collaboration Space",
    "Launch Preparation Hangar",
  ];
  const descriptions = [
    "An open session for members to build practical rocketry skills and collaborate on active projects.",
    "Hands-on activities focused on systems readiness, safety checks, and mission execution.",
    "A team event to test subsystems, review performance, and plan next design iterations.",
    "Join mentors and student leads for technical demonstrations, reviews, and networking.",
  ];

  return Array.from({ length: count }, (_, i) => {
    const isPast = i < Math.floor(count * 0.55);
    const dayOffset = isPast
      ? -(14 + i * 11)
      : 7 + (i - Math.floor(count * 0.55)) * 12;
    const date = daysFromNow(dayOffset);
    const title = `${pick(eventTypes, i)} ${date.getUTCFullYear()} #${(i % 4) + 1}`;

    return {
      title,
      slug: slugify(title),
      description: pick(descriptions, i),
      date: date.toISOString(),
      location: pick(locations, i * 2 + 1),
      isPast,
      signupUrl: isPast
        ? null
        : `https://forms.gle/uarc-event-${slugify(title).slice(0, 24)}`,
    };
  });
}

async function main() {
  console.log("📝 Starting Supabase seed with dynamic mock data...");

  try {
    console.log("📚 Seeding About page content (fixed copy)...");

    const whatWeDo = [
      {
        icon: "🔧",
        title: "Workshops",
        body: "Hands-on workshops covering rocket design, propulsion systems, and manufacturing techniques. Learn practical skills from experienced members.",
        variant: "background",
      },
      {
        icon: "🏭",
        title: "Industry Events",
        body: "Connect with professionals in the aerospace industry through guest lectures, site visits, and networking events with leading companies.",
        variant: "background",
      },
      {
        icon: "🎉",
        title: "Social Events",
        body: "Build friendships and team spirit through social gatherings, team building activities, and celebrations of our achievements.",
        variant: "background",
      },
    ];

    for (const item of whatWeDo) {
      const action = await upsertByUnique("WhatWeDo", "title", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} WhatWeDo: ${item.title}`,
      );
    }

    const journey = [
      {
        icon: "🚀",
        title: "2024 - Foundation",
        body: "UARC was established by Laura with a vision to bring rocketry to the University of Auckland.",
        variant: "surface",
      },
      {
        icon: "🏆",
        title: "2025 - First Launch",
        body: "Successfully launched our first rocket, marking a major milestone in our club's history and proving our engineering capabilities.",
        variant: "surface",
      },
      {
        icon: "🌟",
        title: "2 - Years Active",
        body: "Continuing to push boundaries with advanced rocket designs, expanded team, and growing influence in the aerospace community.",
        variant: "surface",
      },
    ];

    for (const item of journey) {
      const action = await upsertByUnique("JourneyItem", "title", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} JourneyItem: ${item.title}`,
      );
    }

    const teamStructure = [
      {
        title: "Ground Station Team",
        body: "Manage launch operations, tracking systems, and communication with rockets during flight.",
        bullets: [
          "Launch coordination",
          "Telemetry tracking",
          "Communication systems",
        ],
        variant: "surface",
      },
      {
        title: "Recovery Team",
        body: "Develop parachute systems and recovery mechanisms to safely return rockets to the ground.",
        bullets: [
          "Parachute design",
          "Deployment mechanisms",
          "Landing zone analysis",
        ],
        variant: "surface",
      },
      {
        title: "Structural Team",
        body: "Design and manufacture rocket airframes, ensuring structural integrity and aerodynamic efficiency.",
        bullets: [
          "Airframe design",
          "Material selection",
          "Manufacturing processes",
        ],
        variant: "surface",
      },
      {
        title: "Avionics Team",
        body: "Handle all electronic systems including flight computers, sensors, and communication systems.",
        bullets: [
          "Flight computer programming",
          "Sensor integration",
          "Telemetry systems",
        ],
        variant: "surface",
      },
      {
        title: "Control Systems Team",
        body: "Design and implement guidance, navigation, and control systems for rocket stability and trajectory.",
        bullets: [
          "Guidance algorithms",
          "Navigation systems",
          "Flight control",
        ],
        variant: "surface",
      },
    ];

    for (const item of teamStructure) {
      const action = await upsertByUnique("TeamRole", "title", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} TeamRole: ${item.title}`,
      );
    }

    const stats = [
      { value: "4+", label: "Rockets Launched" },
      { value: "50+", label: "Members" },
      { value: "100m+", label: "Maximum Altitude" },
      { value: "0+", label: "Competitions" },
    ];
    for (const item of stats) {
      const action = await upsertByUnique("Stat", "label", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} Stat: ${item.label}`,
      );
    }

    console.log("🧪 Generating dynamic mock data for all other entities...");

    const execItems = generateExecData(9);
    for (const item of execItems) {
      const action = await upsertByUnique("Exec", "name", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} Exec: ${item.name}`,
      );
    }

    const sponsorItems = generateSponsorData(12);
    for (const item of sponsorItems) {
      const action = await upsertByUnique("Sponsor", "name", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} Sponsor: ${item.name}`,
      );
    }

    const rocketItems = generateRocketData(10);
    for (const item of rocketItems) {
      const action = await upsertByUnique("Rocket", "slug", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} Rocket: ${item.name}`,
      );
    }

    const eventItems = generateEventData(16);
    for (const item of eventItems) {
      const action = await upsertByUnique("Event", "slug", item);
      console.log(
        `${action === "created" ? "✅" : "🔁"} ${action} Event: ${item.title}`,
      );
    }

    console.log("🎉 Seeding completed successfully.");
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
    throw error;
  }
}

main().catch((e) => {
  console.error("💥 Seeding failed:", e);
  process.exit(1);
});
