import prisma from "../../../lib/prisma";

export async function GET() {
  const executives = await prisma.exec.findMany({ orderBy: { order: 'asc' } });
  const whatWeDo = await prisma.whatWeDo.findMany({ orderBy: { id: 'asc' } }).catch(() => []);
  const journey = await prisma.journeyItem.findMany({ orderBy: { id: 'asc' } }).catch(() => []);
  const teamStructure = await prisma.teamRole.findMany({ orderBy: { id: 'asc' } }).catch(() => []);
  const stats = await prisma.stat.findMany({ orderBy: { id: 'asc' } }).catch(() => []);

  const payload = { executives, whatWeDo, journey, teamStructure, stats };
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}