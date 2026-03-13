import "dotenv/config";
import { Client } from "pg";

const directUrl = process.env.DIRECT_URL;

if (!directUrl) {
  throw new Error("DIRECT_URL is missing in environment");
}

const sql = `
alter table public."Event"
  add column if not exists "eventTag" text;

update public."Event"
set "eventTag" = 'General'
where "eventTag" is null or btrim("eventTag") = '';

alter table public."Event"
  alter column "eventTag" set default 'General';

grant usage on schema public to anon, authenticated, service_role;

grant select on table
  public."Event",
  public."Rocket",
  public."Exec",
  public."Sponsor",
  public."WhatWeDo",
  public."JourneyItem",
  public."TeamRole",
  public."Stat"
to anon, authenticated;

grant all privileges on table
  public."Event",
  public."Rocket",
  public."Exec",
  public."Sponsor",
  public."WhatWeDo",
  public."JourneyItem",
  public."TeamRole",
  public."Stat"
to service_role;

grant usage, select, update on all sequences in schema public to service_role;
`;

async function main() {
  const client = new Client({
    connectionString: directUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(sql);
    console.log("✅ Database grants applied successfully.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("❌ Failed to apply database grants:", error);
  process.exit(1);
});
