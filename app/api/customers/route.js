import db from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET() {
  await db();
  const rows = await Customer.find().sort({ createdAt: -1 });
  return Response.json(rows);
}

export async function POST(req) {
  await db();
  const body = await req.json();
  const doc = await Customer.create(body);
  return Response.json(doc, { status: 201 });
}

