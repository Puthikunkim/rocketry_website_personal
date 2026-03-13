import { getAboutPayload } from "@/lib/site-data";

export async function GET() {
  try {
    const payload = await getAboutPayload();

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch about data" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
