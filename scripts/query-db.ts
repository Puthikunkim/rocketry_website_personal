import "dotenv/config";
import supabase from "../lib/supabase";

async function main() {
  const { data: events, error: evErr } = await supabase
    .from("Event")
    .select("*")
    .order("date", { ascending: false })
    .limit(5);

  if (evErr) throw evErr;

  const { data: rockets, error: rErr } = await supabase
    .from("Rocket")
    .select("*")
    .limit(5);

  if (rErr) throw rErr;

  console.log(
    JSON.stringify({ events: events ?? [], rockets: rockets ?? [] }, null, 2)
  );
}

main().catch((e) => {
  console.error("Error querying DB:", e);
  process.exit(1);
});
