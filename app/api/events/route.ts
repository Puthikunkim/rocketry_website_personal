import { getEventsOverview } from "@/lib/site-data";

export async function GET() {
  try {
    const payload = await getEventsOverview();

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Database error in /api/events:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
