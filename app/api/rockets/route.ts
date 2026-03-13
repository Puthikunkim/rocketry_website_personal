import { getRocketSummaries } from "@/lib/site-data";

export async function GET() {
  try {
    const rockets = await getRocketSummaries();

    return new Response(JSON.stringify(rockets ?? []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Database error in /api/rockets:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch rockets" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
