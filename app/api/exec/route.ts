import { NextResponse } from "next/server";
import { getExecTeam } from "@/lib/site-data";

export async function GET() {
  try {
    const exec = await getExecTeam();

    return NextResponse.json(exec ?? []);
  } catch (error) {
    console.error("Error fetching exec data:", error);
    return NextResponse.json(
      { error: "Failed to fetch exec data" },
      { status: 500 },
    );
  }
}
